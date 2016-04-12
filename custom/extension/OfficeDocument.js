Ext.define('Custom.extension.OfficeDocument', {
    requires: ['Custom.extension.GenOfficeTable', 'Ext.Promise'], 
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
	/*
    globals: {
        settings: {},
        types: {},
        docPrototypes: {},
        resParserTypes: {}
    },
	*/
	
    creator: 'OfficeDocumentGenerator',
	
	resources: null,
	pages: null,
	type: null,
	title: '',
	pageName: '', // 'slides'(powerpoint) || '' (word) || 'sheets'(excel)
	xmlPath: '', // 'ppt' (powerpoint) || 'doc' (word) || 'xls' (excel)
	xmlDocumentNamespace: '', // 'presentation' (powerpoint) || 'document' (word) || 'spreadsheet' (excel)
	docOptions: null,
	
    constructor: function(config) {
        var me = this;
        me.mixins.observable.constructor.call(me, config);        
		
		me.pages = [];
		//me.pages = new Ext.util.MixedCollection();
		me.resources = [];
		me.type = {};
		me.document = Ext.apply({}, {
			"rels_main": [{
                target: 'docProps/app.xml',
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties',
                clear: 'type'
            }, {
                target: 'docProps/core.xml',
                type: 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties',
                clear: 'type'
            }, {
                target: me.xmlPath + '/' + me.xmlDocumentNamespace + '.xml',
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
                clear: 'type'
            }],
			"rels_app": [],
			"files_list": [{
                ext: 'rels',
                type: 'application/vnd.openxmlformats-package.relationships+xml',
                clear: 'type'
            }, {
                ext: 'xml',
                type: 'application/xml',
                clear: 'type'
            }, {
                ext: 'jpeg',
                type: 'image/jpeg',
                clear: 'type'
            }, {
                ext: 'png',
                type: 'image/png',
                clear: 'type'
            }, {
                name: '/docProps/app.xml',
                type: 'application/vnd.openxmlformats-officedocument.extended-properties+xml',
                clear: 'type'
            }, {
                name: '/docProps/core.xml',
                type: 'application/vnd.openxmlformats-package.core-properties+xml',
                clear: 'type'
            }, {
                name: '/' + me.xmlPath + '/theme/theme1.xml',
                type: 'application/vnd.openxmlformats-officedocument.theme+xml',
                clear: 'type'
            }],
			"src_files_list": []
		});
		me.info = {};

		//me.on('afterGen', cbOfficeClearAfterGenerate);
		//me.on('clearDoc', cbOfficeClearDocData);		
		me._addResourceToParse('_rels\\.rels', 'buffer', me.document.rels_main, me.generateRelsXMLMarkup, true);
		me._addResourceToParse('[Content_Types].xml', 'buffer', null, me.generateContentTypeXMLMarkup, true);
		me._addResourceToParse('docProps\\core.xml', 'buffer', null, me.generateCoreDocPropsXMLMarkup, true);
		me._addResourceToParse(me.xmlPath + '\\theme\\theme1.xml', 'buffer', null, me.generateThemeXMLMarkup, true);
		
		me.addEvents('finalize', 'error', 'beforegenerate', 'aftergenerate', 'clear');
		
		/*
        me._private = Ext.apply({}, {
            plugs: {
                intAddAnyResourceToParse: Ext.bind(me.intAddAnyResourceToParse, me),
                type: {}
            },
            features: {
                type: {},
                outputType: 'zip'
            },
            pages: [],
            resources: [],
            type: {}
        });
		*/
        /*
		if ( typeof config == 'string' ) {
			config = { 'type': config };
		} // Endif.

		// See the officegen descriptions for the rules of the options:
		this.options = this.setOptions(config, { 'type': 'unknown' } );

		if (this.options && this.options.onerr) {
			this.on('error', this.options.onerr );
		} // Endif.

		if (this.options && this.options.onend) {
			this.on('finalize', this.options.onend);
		} // Endif.
		
		// Configure this object depending on the user's selected type:
		if (this.options.type) {
			this.setGeneratorType(this.options.type);
		} // Endif.
		
        me.schema = me.globals.types;
        me.registerPrototype('msoffice', me.makeMSDoc, 'Microsoft Office Document Prototype');
		*/

    },
	
	generateXMLHeaderMarkup: function(data) {
		return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
	},
	generateRelsXMLMarkup: function (data) {
		var me = this,
			realRel = 1,
			i = 0,
			totalSize = data.length,
			outString = me.generateXMLHeaderMarkup(data);
		
		outString += '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';

		// Add all the rels records inside the data array:
		for (i; i < totalSize; i++) {
			if (typeof data[i] != 'undefined') {
				outString += '<Relationship Id="rId' + realRel + '" Type="' + data[i].type + '" Target="' + data[i].target + '"';

				if (data[i].targetMode) {
					outString += ' TargetMode="' + data[i].targetMode + '"';
				}

				outString += '/>';
				realRel++;
			}
		}

		outString += '</Relationships>\n';
		return outString;
	},
	generateContentTypeXMLMarkup: function (data) {
		var me = this,
			i = 0,
			fileList = me.document.files_list,
			totalSize = fileList.length || 0,
			outString = me.generateXMLHeaderMarkup(data);
		
		outString += '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">';

		for (i; i < totalSize; i++) {
			if (typeof fileList[i] != 'undefined') {
				if (fileList[i].ext) {
					// Reason: if we write out duplicate extension, office will raise error
					//
					if (outString.indexOf('<Default Extension="' + fileList[i].ext) == -1) { // check to make sure we don't write duplicate extension tag
						outString += '<Default Extension="' +fileList[i].ext + '" ContentType="' + fileList[i].type + '"/>';
					}
				} else {
					outString += '<Override PartName="' + fileList[i].name + '" ContentType="' + fileList[i].type + '"/>';
				}
			}
		}

		outString += '</Types>\n';
		return outString;
	},
	generateCoreDocPropsXMLMarkup: function (data) {
		var me = this,
			now = new Date(),
			curDateTime = Ext.Date.format(now, 'Y-m-d\\TH:i:s\\Z'),
			creator = me.creator,
			info = me.info,
			extraFields = '',
			infoRec;

		// Work on all the properties:
		for (infoRec in info) {
			if (info[infoRec] && info[infoRec].element && info[infoRec].data) {
				extraFields += '<' + info[infoRec].element + '>' + Ext.String.htmlEncode(info[infoRec].data) + '</' + info[infoRec].element + '>';
			}
		}

		return me.generateXMLHeaderMarkup(data) + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' + extraFields + '<dc:creator>' + creator + '</dc:creator><cp:lastModifiedBy>' + creator + '</cp:lastModifiedBy><cp:revision>1</cp:revision><dcterms:created xsi:type="dcterms:W3CDTF">' + curDateTime + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + curDateTime + '</dcterms:modified></cp:coreProperties>';
	},
	generateThemeXMLMarkup: function (data) {
		return this.generateXMLHeaderMarkup(data) + '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Angsana New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>';
	},
	
	//{ Might no longer need
	compactArray: function (arr) {
		var len = arr.length,
			i;

		for (i = 0; i < len; i++)
			arr[i] && arr.push(arr[i]); // Copy non-empty values to the end of the array.

		arr.splice(0, len); // Cut the array and leave only the non-empty values.
	},
	clearSmartArrayFromType: function (arr, type_to_clear) {
		var is_need_compact = false;

		for (var i = 0, total_size = arr.length; i < total_size; i++) {
			if (typeof arr[i] != 'undefined') {
				if (arr[i].clear && (arr[i].clear == type_to_clear)) {
					delete arr[i];
					is_need_compact = true;
				}
			}
		}

		if (is_need_compact) {
			compactArray(arr);
		}
	},
	cbOfficeClearAfterGenerate: function (err, written) {
		this.clearSmartArrayFromType(me.document.rels_main, 'generate');
		this.clearSmartArrayFromType(me.document.rels_app, 'generate');
		this.clearSmartArrayFromType(me.document.files_list, 'generate');

		if (me.generate_data) {
			me.generate_data = null;
			delete me.generate_data;
		}
	},
	cbOfficeClearDocData: function () {
		this.clearSmartArrayFromType(me.document.rels_main, 'data');
		this.clearSmartArrayFromType(me.document.rels_app, 'data');
		this.clearSmartArrayFromType(me.document.files_list, 'data');

		for (infoItem in me.info) {
			me.info[infoItem].data = me.info[infoItem].def_data;
		} // Endif.

		me.document.src_files_list = [];
	},
	//}							
	
	addInfoType: function (element_name, def_data, prop_name, user_access_func_name) {
		var me = this;
		me.info[element_name] = {};
		me.info[element_name].element = element_name;
		me.info[element_name].data = def_data;
		me.info[element_name].def_data = def_data;
		
		if (me[prop_name]) {
			me.info[element_name].data = me[prop_name];
		}

		me[user_access_func_name] = function(new_data) {
			me.info[element_name].data = new_data;
		};
	},
	
	
	/**
     * Add a resource to the list of resources to place inside the output zip file.
     *    
     * resource_name The name of the resource (path).
     * type_of_res The type of this resource: either 'file' or 'buffer'.
     * res_data Optional data to use when creating this resource.
     * res_cb Callback to generate this resource (for 'buffer' mode only).
     * is_always Is true if this resource is perment for all the zip of this document type.
     * removed_after_used Is true if we need to delete this file after used.
     */
    _addResourceToParse: function(resource_name, type_of_res, res_data, res_cb, is_always, removed_after_used) {
        var newRes = {};

        newRes.name = resource_name;
        newRes.type = type_of_res;
        newRes.data = res_data;
        newRes.callback = res_cb;
        newRes.is_perment = is_always;
		newRes.removed_after_used = removed_after_used;
       
        this.resources.push(newRes);
    },
	/**
     * Register a new resource to add into the generated ZIP stream.
     * 
     * Using this method the user can add extra custom resources into the generated ZIP stream.
     * 
     * resource_name The name of the resource (path).
     * type_of_res The type of this resource: either 'file' or 'buffer'.
     * res_data Optional data to use when creating this resource.
     * res_cb Callback to generate this resource (for 'buffer' mode only).
     */
	addResourceToParse: function(resource_name, type_of_res, res_data, res_cb) {
        // We don't want the user to add perment resources to the list of resources:
        this._addResourceToParse(resource_name, type_of_res, res_data, res_cb, false);
    },

	generateUniqueID: function (baseGroup) {
		var charTable = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		function makeRandomChar() {
			return charTable[Math.floor(Math.random() * charTable.length)];
		}

		var outStr = baseGroup || makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();

		outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
		outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
		outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
		outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
		outStr += makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
		outStr += makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
		return outStr;
	},
	/**
     * Reuse this object for a new document of the same type.
     * 
     * Call this method if you want to start generating a new document of the same type using this object.
     */
    startNewDoc: function() {
        var kill = [];

        for (var i = 0; i < this.resources.length; i++) {
            if (!this.resources[i].is_perment) kill.push(i);
        } // End of for loop.

        for (var i = 0; i < kill.length; i++) this.resources.splice(kill[i] - i, 1);

        this.pages.length = 0; 
		//this.pages.clear();

        this.clearDocumentData();
		//this.fireEvent('clearDoc', this._private);
    },
    
    /**
     * Generating the output document stream.
     * 
     *  The user of officegen must call this method after filling all the information about what to put inside 
     *  the generated document. This method is creating the output document directly into the given stream object.
     * 
     *  The options parameters properties:
     * 
     *  'finalize' - callback to be called after finishing to generate the document.
     *  'error' - callback to be called on error.
     * 
     *  output_stream The stream to receive the generated document.
     *  options Way to pass callbacks.
     */
    generate: function() {
        var me = this,
			promise = new Ext.Promise();
			streams = {};
		
		if (me.pageName) {
            if (me.pages.length == 0) {
			//if (me.pages.getCount() == 0) {
                me.fireEvent('error', 'ERROR: No ' + me.pageName + ' can been found inside your document.');
            }
        }
       
        me.fireEvent('beforegenerate', me);		
		
        /**
         * Add the next resource into the zip stream.
         * 
         *  This function adding the next resource into the zip stream.
         */
        function generateNextResource(cur_index) {
            var resStream;

            if (cur_index < me.resources.length) {
                if (typeof me.resources[cur_index] != 'undefined') {
                    switch (me.resources[cur_index].type) {
                        // Generate the resource text data by calling to provided function:
                        case 'buffer':
                            var cb = me.resources[cur_index].callback;
								//delegate;
							if (cb) {
								//delegate = Ext.bind(cb, me)
								resStream = cb.call(me, me.resources[cur_index].data);
							}
                            break;

                            // Just copy the file as is:
                        case 'file':
                            resStream = fs.createReadStream(me.resources[cur_index].data || me.resources[cur_index].name);
                            break;

                            // Just use this stream:
                        case 'stream':
                            resStream = me.resources[cur_index].data;
                            break;

                        default:							
							promise.reject('ERROR: The resource type ' + (me.resources[cur_index].type + ' does not have a parser.'));
							break;
                    }

                    if (typeof resStream != 'undefined') {
                        streams[me.resources[cur_index].name] = {
							name: me.resources[cur_index].name,
							data: resStream
						}						
                    }
                }
				generateNextResource(cur_index + 1);
            } else {
                me.fireEvent('aftergenerate', me);                
				me.fireEvent('finalize');
				promise.fulfill(streams);
            }
        };

        // Start the process of generating the output zip stream:
        generateNextResource(0);
		
		return promise;
    },
	
	generateOpenXMLDocument: function () {
		var me = this,
			document = new openXml.OpenXmlPackage(),
			resources = me.resources,
			resource;
		
		for (resource in resources) {
			
		}
	},
	generateContentTypesXML: function () {
		var me = this,
			i = 0,
			files = me.document.files_list,
			fl = files.length || 0,
			typeElement, file, element;
		
		typeElement = new XElement(openXml.CT.Types, 
			new XAttribute("xmlns", openXml.ctNs.namespaceName)
		);
		
		for (i; i < fl; i++) {
			if (typeof files[i] != 'undefined') {
				file = files[i];
				if (file.ext) {
					element = new XElement(openXml.CT.Default,
						new XAttribute("ContentType", file.type),
						new XAttribute("Extension", file.ext)
					);
				} else {
					element = new XElement(openXml.CT.Override, 
						new XAttribute("ContentType", file.type),
						new XAttribute("PartName", file.name)						
					);
				}
				typeElement.add(element);
			}		
		}
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"), 
			typeElement
		);
	},
	generateRelationshipsXML: function (data) {
		data = data || this.document.rels_main;
		
		var me = this,
			i = 0,			
			relationships = data,
			rl = relationships.length || 0,
			tm = null,
			typeElement, relationship, element;
			
		typeElement = new XElement(openXml.PKGREL.Relationships, 
			new XAttribute("xmlns", openXml.pkgRelNs.namespaceName)
		);
		
		for (i; i < rl; i++) {
			if (typeof relationships[i] != 'undefined') {
				relationship = relationships[i];
				if (relationship.targetMode && relationship.targetMode == 'External') {
					tm = new XAttribute("TargetMode", "External");
				}
				element = new XElement(openXml.PKGREL.Relationship,
                    new XAttribute("Id", ("rId" + (i + 1))),
                    new XAttribute("Type", relationship.type),
                    new XAttribute("Target", relationship.target),
					tm
                );
				
				typeElement.add(element);
			}		
		}
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"), 
			typeElement
		);
	},
	generateCorePropertiesXML: function () {
		var me = this,
			props = me.info,
			now = new Date(),
			curDateTime = Ext.Date.format(now, 'Y-m-d\\TH:i:s\\Z'),
			creator = me.creator,
			dcmiTypeNs = new XNamespace("http://purl.org/dc/dcmitype/"),
			typeElement, prop, property, element;
		
		typeElement = new XElement(openXml.CP.coreProperties, 
			new XAttribute(XNamespace.xmlns + "cp", openXml.cpNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "dc", openXml.dcNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "dcterms", openXml.dctermsNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "dcmitype", dcmiTypeNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "xsi", openXml.xsiNs.namespaceName)
		);
		
		for (prop in props) {
			property = props[prop];
			if (property && property.element && property.data) {
				element = new XElement(property.element, Ext.String.htmlEncode(property.data));
				typeElement.add(element);
			}
		}
		typeElement.add(
			new XElement(openXml.DC.creator, creator),
			new XElement(openXml.CP.lastModifiedBy, creator),
			new XElement(openXml.CP.revision, 1),
			new XElement(
				openXml.DCTERMS.created,
				new XAttribute(openXml.XSI.type, "dcterms:W3CDTF"),
				curDateTime
			),
			new XElement(
				openXml.DCTERMS.modified,
				new XAttribute(openXml.XSI.type, "dcterms:W3CDTF"),
				curDateTime
			)
		);
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"), 
			typeElement
		);
	
	},
	generateThemeXML: function () {
		var me = this,
			data = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Angsana New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>',
			themeElement;
		
		themeElement = XElement.parse(data);
		
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"), 
			themeElement			
		);
	}
	
	
	
	/**
     * Extend object with MS-Office support.
     *
     * This method extending the given object with the common MS-Office code.
     *    
     *
    makeMSDoc: function() {
        var me = this;
        **
         * @brief Generate string of the current date and time.
         * 
         *    This method generating a string with the current date and time in Office XML format.
         * 
         *  @return String of the current date and time in Office XML format.
         *
        function getCurDateTimeForOffice() {
                var date = new Date();

                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var sec = date.getSeconds();

                month = (month < 10 ? "0" : "") + month;
                day = (day < 10 ? "0" : "") + day;
                hour = (hour < 10 ? "0" : "") + hour;
                min = (min < 10 ? "0" : "") + min;
                sec = (sec < 10 ? "0" : "") + sec;

                return year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec + 'Z';
            }
            **
             *  @brief Compact the given array.
             * 
             *  This function compacting the given array.
             * 
             *  @param[in] arr The array to compact.
             *
        function compactArray(arr) {
                var len = arr.length,
                    i;

                for (i = 0; i < len; i++)
                    arr[i] && arr.push(arr[i]); // Copy non-empty values to the end of the array.

                arr.splice(0, len); // Cut the array and leave only the non-empty values.
            }
            **
             *  @brief Create the main files list resource.
             * 
             *  ???.
             * 
             *  @param[in] data Ignored by this callback function.
             *  @return Text string.
             *
        function cbMakeMainFilesList(data) {
                var outString = me.generateXMLHeaderMarkup(data);
                outString += '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">';

                for (var i = 0, total_size = me._private.type.msoffice.files_list.length; i < total_size; i++) {
                    if (typeof me._private.type.msoffice.files_list[i] != 'undefined') {
                        if (me._private.type.msoffice.files_list[i].ext) {
                            // Reason: if we write out duplicate extension, office will raise error
                            //
                            if (outString.indexOf('<Default Extension="' + me._private.type.msoffice.files_list[i].ext) == -1) { // check to make sure we don't write duplicate extension tag
                                outString += '<Default Extension="' + me._private.type.msoffice.files_list[i].ext + '" ContentType="' + me._private.type.msoffice.files_list[i].type + '"/>';
                            }
                        } else {
                            outString += '<Override PartName="' + me._private.type.msoffice.files_list[i].name + '" ContentType="' + me._private.type.msoffice.files_list[i].type + '"/>';
                        } // Endif.
                    } // Endif.
                } // End of for loop.

                outString += '</Types>\n';
                return outString;
            }
            **
             *  @brief ???.
             * 
             *  ???.
             * 
             *  @param[in] data Ignored by this callback function.
             *  @return Text string.
             *
        function cbMakeTheme(data) {
                return me.generateXMLHeaderMarkup(data) + '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Angsana New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>';
            }
            **
             *  @brief ???.
             * 
             *  ???.
             * 
             *  @param[in] data Ignored by this callback function.
             *  @return Text string.
             *
        function cbMakeCore(data) {
                var curDateTime = getCurDateTimeForOffice();
                var userName = me.options.creator ? me.options.creator : 'officegen';
                var extraFields = '';

                // Work on all the properties:
                for (infoRec in me.info) {
                    if (me.info[infoRec] && me.info[infoRec].element && me.info[infoRec].data) {
                        extraFields += '<' + me.info[infoRec].element + '>' + Ext.String.htmlEncode(me.info[infoRec].data) + '</' + me.info[infoRec].element + '>';
                    } // Endif.
                } // End of for loop.

                return me.generateXMLHeaderMarkup(data) + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' + extraFields + '<dc:creator>' + userName + '</dc:creator><cp:lastModifiedBy>' + userName + '</cp:lastModifiedBy><cp:revision>1</cp:revision><dcterms:created xsi:type="dcterms:W3CDTF">' + curDateTime + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + curDateTime + '</dcterms:modified></cp:coreProperties>';
            }
           **
             *  @brief Remove selected records from the given array.
             * 
             *  This method destroys records inside the given array of the given type.
             * 
             *  @param[in] arr The array to work on it.
             *  @param[in] type_to_clear The type of records to clear.
             *
        function clearSmartArrayFromType(arr, type_to_clear) {
                var is_need_compact = false;

                for (var i = 0, total_size = arr.length; i < total_size; i++) {
                    if (typeof arr[i] != 'undefined') {
                        if (arr[i].clear && (arr[i].clear == type_to_clear)) {
                            delete arr[i];
                            is_need_compact = true;
                        }
                    }
                }

                if (is_need_compact) {
                    compactArray(arr);
                }
            }
            **
             *  @brief Clean after finishing to generate the document.
             * 
             *  This method destroying any additional resources added by the 'beforeGen' effect to the generator.
             * 
             *  @param[in] err Generation error message (if there were any).
             *  @param[in] written Number of bytes been created.
             *
        function cbOfficeClearAfterGenerate(err, written) {
            clearSmartArrayFromType(me._private.type.msoffice.rels_main, 'generate');
            clearSmartArrayFromType(me._private.type.msoffice.rels_app, 'generate');
            clearSmartArrayFromType(me._private.type.msoffice.files_list, 'generate');

            if (me.generate_data) {
                me.generate_data = null;
                delete me.generate_data;
            } // Endif.
        };
        **
         *  @brief Clear all the information of the current document.
         * 
         *  ???.
         *
        function cbOfficeClearDocData() {
            clearSmartArrayFromType(me._private.type.msoffice.rels_main, 'data');
            clearSmartArrayFromType(me._private.type.msoffice.rels_app, 'data');
            clearSmartArrayFromType(me._private.type.msoffice.files_list, 'data');

            for (infoItem in me.info) {
                me.info[infoItem].data = me.info[infoItem].def_data;
            } // Endif.

            me._private.type.msoffice.src_files_list = [];
        };

        // Basic API for plugins:
        me._private.plugs.type.msoffice = {};
        **
         *  @brief Configure a new Office property type.
         * 
         *  This method register a new type of property that the user can configure. This property must be 
         *  a valid MS-Office property as you can configure on the "files/properties" menu option on MS-Office.
         * 
         *  @param[in] element_name The name of the XML element of this type.
         *  @param[in] def_data Default value of this type.
         *  @param[in] prop_name The name of the options property to configure this type.
         *  @param[in] user_access_func_name The name of the function to create to configure this type.
         *
        me._private.plugs.type.msoffice.addInfoType = function(element_name, def_data, prop_name, user_access_func_name) {
            me.info[element_name] = {};
            me.info[element_name].element = element_name;
            me.info[element_name].data = def_data;
            me.info[element_name].def_data = def_data;

            // The user of officegen can configure this property using the options object:
            if (me.options.prop_name) {
                me.info[element_name].data = me.options.prop_name;
            } // Endif.

            me[user_access_func_name] = function(new_data) {
                me.info[element_name].data = new_data;
            };
        };
        **
         *  @brief Get the string that opening every Office XML type.
         * 
         *  Every Microsoft Office XML resource will have this header at the begining of the file.
         * 
         *  @param[in] data Ignored by this callback function.
         *  @return Text string.
         *
        me._private.plugs.type.msoffice.cbMakeMsOfficeBasicXml = function(data) {
                return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
            }
            **
             *  @brief Generate rel based XML file.
             * 
             *  ???.
             * 
             *  @param[in] data Array filled with all the rels links.
             *  @return Text string.
             *
        me._private.plugs.type.msoffice.cbMakeRels = function(data) {
                var outString = me._private.plugs.type.msoffice.cbMakeMsOfficeBasicXml(data);
                outString += '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';

                // Add all the rels records inside the data array:
                var realRel = 1;
                for (var i = 0, total_size = data.length; i < total_size; i++) {
                    if (typeof data[i] != 'undefined') {
                        outString += '<Relationship Id="rId' + realRel + '" Type="' + data[i].type + '" Target="' + data[i].target + '"';

                        if (data[i].targetMode) {
                            outString += ' TargetMode="' + data[i].targetMode + '"';
                        } // Endif.

                        outString += '/>';
                        realRel++;
                    } // Endif.
                } // End of for loop.

                outString += '</Relationships>\n';
                return outString;
            }
            **
             *  @brief Prepare the officegen object to MS-Office documents.
             * 
             *  Every plugin that implementing gemenrating MS-Office document must call this method to initialize 
             *  the common stuff.
             * 
             *  @param[in] main_path The name of the main folder holding the common resources of this type.
             *  @param[in] main_file The main resource file name of this type.
             *  @param[in] ext_opt Optional settings (unused right now).
             *
        me._private.plugs.type.msoffice.makeOfficeGenerator = function(main_path, main_file, ext_opt) {
            me._private.features.type.msoffice = {};
            me._private.features.type.msoffice.main_path = main_path;
            me._private.features.type.msoffice.main_path_file = main_file;
            me._private.type.msoffice = {};
            me._private.type.msoffice.rels_main = [];
            me._private.type.msoffice.rels_app = [];
            me._private.type.msoffice.files_list = [];
            me._private.type.msoffice.src_files_list = [];

            // Holding all the Office properties:
            me.info = {};

            me.on('afterGen', cbOfficeClearAfterGenerate);
            me.on('clearDoc', cbOfficeClearDocData);

            me._private.type.msoffice.rels_main.push({
                target: 'docProps/app.xml',
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties',
                clear: 'type'
            }, {
                target: 'docProps/core.xml',
                type: 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties',
                clear: 'type'
            }, {
                target: me._private.features.type.msoffice.main_path + '/' + me._private.features.type.msoffice.main_path_file + '.xml',
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
                clear: 'type'
            });

            me._private.type.msoffice.files_list.push({
                ext: 'rels',
                type: 'application/vnd.openxmlformats-package.relationships+xml',
                clear: 'type'
            }, {
                ext: 'xml',
                type: 'application/xml',
                clear: 'type'
            }, {
                ext: 'jpeg',
                type: 'image/jpeg',
                clear: 'type'
            }, {
                ext: 'png',
                type: 'image/png',
                clear: 'type'
            }, {
                name: '/docProps/app.xml',
                type: 'application/vnd.openxmlformats-officedocument.extended-properties+xml',
                clear: 'type'
            }, {
                name: '/' + me._private.features.type.msoffice.main_path + '/theme/theme1.xml',
                type: 'application/vnd.openxmlformats-officedocument.theme+xml',
                clear: 'type'
            }, {
                name: '/docProps/core.xml',
                type: 'application/vnd.openxmlformats-package.core-properties+xml',
                clear: 'type'
            });

            me._private.plugs.intAddAnyResourceToParse('_rels\\.rels', 'buffer', me._private.type.msoffice.rels_main, me._private.plugs.type.msoffice.cbMakeRels, true);
            me._private.plugs.intAddAnyResourceToParse('[Content_Types].xml', 'buffer', null, cbMakeMainFilesList, true);
            me._private.plugs.intAddAnyResourceToParse('docProps\\core.xml', 'buffer', null, cbMakeCore, true);
            me._private.plugs.intAddAnyResourceToParse(me._private.features.type.msoffice.main_path + '\\theme\\theme1.xml', 'buffer', null, cbMakeTheme, true);
        };
        **
         *  @brief Generate random unique ID.
         * 
         *  This method generates a random unique ID.
         * 
         *  @param[in] baseGroup Optional first part of the ID.
         *  @return Unique ID string.
         *
        me._private.plugs.type.msoffice.makeUniqueID = function(baseGroup) {
            var charTable = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

            function makeRandomChar() {
                return charTable[Math.floor(Math.random() * charTable.length)];
            }

            var outStr = baseGroup || makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();

            outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
            outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
            outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
            outStr += '-' + makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
            outStr += makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
            outStr += makeRandomChar() + makeRandomChar() + makeRandomChar() + makeRandomChar();
            return outStr;
        };
    }
	*/
    /**
     * Combine the given options and the default values.
     *
     *  This function creating the real options object.	
     *
     * options The options to configure	
     *
    setOptions: function(object, source) {
        object = object || {};

        var objectTypes = {
            'boolean': false,
            'function': true,
            'object': true,
            'number': false,
            'string': false,
            'undefined': false
        };

        function isObject(value) {
            return !!(value && objectTypes[typeof value]);
        };

        function keys(object) {
            if (!isObject(object)) {
                return [];
            }

            return Object.keys(object);
        };

        var index;
        var iterable = object;
        var result = iterable;

        var args = arguments;
        var argsIndex = 0;
        var argsLength = args.length;

        while (++argsIndex < argsLength) {
            iterable = args[argsIndex];

            if (iterable && objectTypes[typeof iterable]) {
                var ownIndex = -1;
                var ownProps = objectTypes[typeof iterable] && keys(iterable);
                var length = ownProps ? ownProps.length : 0;

                while (++ownIndex < length) {
                    index = ownProps[ownIndex];

                    if (typeof result[index] === 'undefined' || result[index] == null) {
                        result[index] = iterable[index];

                    } else if (isObject(result[index]) && isObject(iterable[index])) {
                        result[index] = this.setOptions(result[index], iterable[index]);
                    } // Endif.
                } // End of while loop.
            } // Endif.
        } // End of while loop.

        return result;
    },
	*/
    /**
     * Configure this object to generate the given type of document.
     *
     * This function configuring the generator to create the given type of document.
     *
     * new_type The type of document to create.
     *
    setGeneratorType: function(new_type) {
        this._private.length = 0;
        var is_ok = false;

        if (new_type) {
            for (var cur_type in this.globals.types) {
                if ((cur_type == new_type) && this.globals.types[cur_type] && this.globals.types[cur_type].createFunc) {
                    this.globals.types[cur_type].createFunc(this, new_type, this.options, this._private, this.globals.types[cur_type]);
                    is_ok = true;
                    break;
                } // Endif.
            } // End of for loop.

            if (!is_ok) {
                // console.error ( '\nFATAL ERROR: Either unknown or unsupported file type - %s\n', options.type );
                this.fireEvent('error', 'FATAL ERROR: Invalid file type.');
            } // Endif.
        } // Endif.
    },
	*/
    /**
     * Register a new type of document that we can generate.
     *
     * This method registering a new type of document that we can generate. You can extend officegen to support any 
     * type of document that based on resources files inside ZIP stream.
     *
     * typeName  The type of the document file.
     * createFunc  The function to use to create this type of file.
     * schema_data  Information needed by Schema-API to generate this kind of document.
     * docType  Document type.
     * displayName  The display name of this type.
     *
    registerDocType: function(typeName, createFunc, schema_data, docType, displayName) {
        var me = this,
            details = Ext.apply({}, {
                'createFunc': createFunc,
                'schema_data': schema_data,
                'type': docType,
                'display': displayName
            });
        me.globals.types[typeName] = details;
    },
    /**
     * Register a document prototype object.
     *
     * This method registering a prototype document object. You can place all the common code needed by a group of document 
     * types in a single prototype object.
     *
     * typeName The name of the prototype object.
     * baseObj The prototype object.
     * displayName The display name of this type.	
     *
    registerPrototype: function(typeName, baseObj, displayName) {
        var me = this,
            details = Ext.apply({}, {
                'baseObj': baseObj,
                'display': displayName
            });
        me.globals.docPrototypes[typeName] = details;
    },
    /**
     * Get a document prototype object by name.
     *
     * This method get a prototype object.	
     *
     * typeName  The name of the prototype object.
     * Returns The name of the prototype object
     *
    getPrototypeByName: function(typeName) {
        return this.globals.docPrototypes[typeName];
    },
    /**
     * Register a new resource parser.
     *
     * This method registering a new resource parser. One use of this feature is in case that you are developing a new 
     * type of document and you want to extand officegen to use some kind of template engine as jade, ejs, haml* or CoffeeKup. 
     * In this case you can use a template engine to generate one or more of the resources inside the output archive. 
     * Another use of this method is to replace an existing plugin with different implementation.
     *
     * typeName The type of the parser plugin
     * parserFunc The resource generating function.
     * extra_data Optional additional data that may be required by the parser function.
     * displayName The display name of this type.	
     *
    registerParserType: function(typeName, parserFunc, extra_data, displayName) {
        var me = this,
            details = Ext.apply({}, {
                'parserFunc': parserFunc,
                'extra_data': extra_data,
                'display': displayName
            });
        me.globals.resParserTypes[typeName] = details;
    }
	*/
});