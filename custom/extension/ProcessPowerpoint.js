Ext.define('Custom.extension.ProcessPowerpoint', {
	singleton: true,
	requires: ['Custom.extension.OpenXMLDocument'],
	
	readDocument: function (outputName, templateFile, outputPath, lookupFn) {
		try {
			var openxml = Ext.create('Custom.extension.OpenXMLDocument');
				
			openxml.loadDocument(templateFile, function (document) {
								
				//this.processPmlTemplate(document, lookupFn);
				
				openxml.setDocument(document);
				openxml.saveDocument(outputName, outputPath);
				
			}, this);
		} catch (e) {
			Ext.Error.raise('There was an error parsing the document: ' + e.message);
		}
	},
	saveDocumentFromObject: function (outputName, outputPath, fileObject) {
		try {
			var openxml = Ext.create('Custom.extension.OpenXMLDocument'),
				document = openxml.loadDocumentFromList(fileObject);
			
			openxml.setDocument(document);
			openxml.saveDocument(outputName, outputPath);
		} catch (e) {
			Ext.Error.raise('There was an error saving the document: ' + e.message);
		}
	},
	/**
	 * method to parse out placeholder strings in presentation (<# Name #>) and covert to single runs
	 * which allow for iteration over to replace the placeholder string with lookup value
	 * Not working correctly and seems to corrupt the output file if there are too many lookup values
	 */
	processPmlTemplate: function (document, processFn) {		
		var presentationParts = document.presentationPart(),
			slideParts = presentationParts.slideParts(),
			sl = slideParts.length,
			i = 0,
			slidePart, slideXDoc, root, newRoot;
		
		var CharacterType = {
			"NotInTag": "NotInTag",
			"OnTagOpen1": "OnTagOpen1",
			"OnTagOpen2": "OnTagOpen2",
			"OnTagOpen3": "OnTagOpen3",
			"OnTagClose1": "OnTagClose1",
			"OnTagClose2": "OnTagClose2",
			"OnTagClose3": "onTagClose3",
			"InTag": "InTag"
		}
		
		var SplitIntoSingleCharRuns = function (node) {
			var a = openXml.aNs.toString(),
				element = new XElement(node),
				elementName;
			if (element != null) {
				elementName = element.name;
							
				if (elementName.toString() == a + 'p') { // Paragraphs
					//console.log('Paragraph - ' + elementName)
					return new XElement(elementName, element.attributes(), element.elements().select(function (e) {
                            var eName = e.name,								
								text;
							//console.log(eName);
							if (eName.toString() == a + "r") {	//Runs							
                                text = e.elements(a + "t").select(function (t) { 
									//console.log('Runs - ' + t.getValue());
									return t.getValue();									
								});
								text = Enumerable.from(text.toJoinedString());
								
								return text.select(function (c) {
									return new XElement(a + "r", 
										e.elements().where(function (z) { 
											if (z.name.toString() != a + "t") {
												//console.log(z.name.toString());
											}
											return z.name.toString() != a + "t";
										}),
										new XElement(a + "t", c.toString())
									);
								});                                
                            }
                            return new XElement(elementName, element.attributes(), element.nodes().select(function (n) {
								return SplitIntoSingleCharRuns(n);
							}));
						})
					);				
				} else {
					return new XElement(elementName, element.attributes(), element.nodes().select(function (n) {
						return SplitIntoSingleCharRuns(n);
					}));
				}			
			}
			return node;
		}
		
		var Rollup = function (source, seed, fn) {
			var ln = source.length,
				i = 0,	
				result = [],
				nextSeed = seed,
				projectedValue;
			
			for (i; i < ln; i++) {
				projectedValue = fn(source[i], nextSeed);
				nextSeed = projectedValue;
				result.push(projectedValue);
			}
			return Enumerable.from(result);
		}
				
		var ReplaceTagsTransform = function (node, projectionFunc) {
			var a = openXml.aNs.toString(),
				element = new XElement(node),
				elementName;
			if (element != null) {
				elementName = element.name;
				
				if (elementName == a + "p") {
					var paragraphChildElements = element.elements().select(function (e, i) {
						var character = e.element(a + "t");
						character = character ? character.getValue() : null
						
						return {
							ParagraphChild: e,
							Index: i,
							Character: character
						}
					});
					var paragraphChildElementArray = paragraphChildElements.toArray();
					
					var markedCharacters = Rollup(paragraphChildElementArray, CharacterType.NotInTag, function (r, previousState) {
						switch (previousState) {
							case CharacterType.NotInTag : {
								if (r.Character == "l" && r.Index <= paragraphChildElementArray.length - 2 && paragraphChildElementArray[r.Index + 1].Character == "t" && paragraphChildElementArray[r.Index + 2].Character == "#") {
									return CharacterType.OnTagOpen1;
								}
								return CharacterType.NotInTag;
							}
							case CharacterType.OnTagOpen1 : {
								return CharacterType.OnTagOpen2;
							}
							case CharacterType.OnTagOpen2 : {
								return CharacterType.OnTagOpen3;
							}
							case CharacterType.OnTagOpen3 : {
								return CharacterType.InTag;
							}
							case CharacterType.InTag : {
								if (r.Character == "#" && r.Index <= paragraphChildElementArray.length - 2 && paragraphChildElementArray[r.Index + 1].Character == "g" && paragraphChildElementArray[r.Index + 2].Character == "t") {
									return CharacterType.OnTagClose1;
								}
								return CharacterType.InTag;
							}
							case CharacterType.OnTagClose1 : {								
								return CharacterType.OnTagClose2;
							}
							case CharacterType.OnTagClose2 : {								
								return CharacterType.OnTagClose3;
							}
							case CharacterType.OnTagClose3 : {
								if (r.Character == "l" && r.Index <= paragraphChildElementArray.length - 2 && paragraphChildElementArray[r.Index + 1].Character == "t" && paragraphChildElementArray[r.Index + 2].Character == "#") {
									return CharacterType.OnTagOpen1;
								}
								return CharacterType.NotInTag;
							}
							default: {
								return CharacterType.NotInTag;
							}
						}
					});
					
					var zipped = paragraphChildElements.zip(markedCharacters, function (r, type) {
						return {
							ParagraphChild: r.ParagraphChild,
                            Character: r.Character,
                            Index: r.Index,
                            CharacterType: type
						}
					});
					var counted = Rollup(zipped.toArray(), 0, function (r, previous) {
						return r.CharacterType == CharacterType.OnTagOpen1 ? previous + 1: previous;
					});
					
					var zipped2 = zipped.zip(counted, function (x, y) {
						return {
							ParagraphChild: x.ParagraphChild,
                            Character: x.Character,
                            Index: x.Index,
                            State: x.CharacterType,
                            Count: y
						}
					});
					
					var zipped3 = zipped2.groupAdjacent(function (r) {
						if (r.State == CharacterType.NotInTag) {
							return -1;
						}
						return r.Count;
					});
					
					var newParagraph = new XElement(a + "p",
						zipped3.select(function (g) {
							if (g.key() == -1) {
								var groupedRuns = g.groupAdjacent(function (r) {
									var z = r.ParagraphChild.name.toString();
									var z2 = r.ParagraphChild.element(a + "rPr");
									if (z2 != null) {
										z += z2.toString();
									}
									return z;
								});
								return groupedRuns.select(function (g2) {
									var text = g2.select(function (z) {
										return z.Character;
									}).toJoinedString();
									var name = g2.first().ParagraphChild.name.toString();
									return new XElement(name, 
										g2.first().ParagraphChild.attributes(),
										g2.first().ParagraphChild.element(a + "rPr"),
										(name == a + "r") ? new XElement(a + "t", text) : null);
								});
							}
							var s = g.select(function (z) {
								return z.Character;
							}).toJoinedString();
							var tagContents = s.substring(3, s.length - 3).trim();
							var replacement = projectionFunc(tagContents);
							return new XElement(a + "r",
								g.first().ParagraphChild.element(a + "rPr"),
								new XElement(a + "t", replacement));
						}));
					return newParagraph;
				} else {
					return new XElement(elementName, element.attributes(), element.nodes().select(function (n) {
						return ReplaceTagsTransform(n, projectionFunc);
					}));
				}
			}
			return node;			
		}
		
		for (i; i < sl; i++) {
			slideXDoc = slideParts[i].getXDocument();
			root = slideXDoc.root;
			newRoot = SplitIntoSingleCharRuns(root);
			newRoot = ReplaceTagsTransform(newRoot, processFn);
			
			slideParts[i].putXDocument(new XDocument(newRoot));
		}		
	}
	
	
});