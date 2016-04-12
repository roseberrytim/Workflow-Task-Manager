Ext.define('Custom.extension.OpenXMLDocument', {
	requires: ['Sharepoint.data.WebServices'],
	
	/**
	 * Instance of OpenXmlPackage as defined in openxml.js
	 */
	document: null,
	
	isTypedArrayAllowed: function () {
		if (typeof Uint8Array == 'function') {
			return true;
		}
		if (typeof getIEByteArray == 'function') {
			return true;
		}
		return false;
	},
	encodeArrayBufferToBase64: function (arrayBuffer) {
		var base64 = '';
		var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

		var bytes = new Uint8Array(arrayBuffer);
		var byteLength = bytes.byteLength;
		var byteRemainder = byteLength % 3;
		var mainLength = byteLength - byteRemainder;

		var a, b, c, d;
		var chunk;

		// Main loop deals with bytes in chunks of 3
		for (var i = 0; i < mainLength; i = i + 3) {
			// Combine the three bytes into a single integer
			chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

			// Use bitmasks to extract 6-bit segments from the triplet
			a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
			b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
			c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
			d = chunk & 63 // 63       = 2^6 - 1

			// Convert the raw binary segments to the appropriate ASCII encoding
			base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
		}

		// Deal with the remaining bytes and padding
		if (byteRemainder == 1) {
			chunk = bytes[mainLength]

			a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

			// Set the 4 least significant bits to zero
			b = (chunk & 3) << 4 // 3   = 2^2 - 1

			base64 += encodings[a] + encodings[b] + '=='
		} else if (byteRemainder == 2) {
			chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

			a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
			b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

			// Set the 2 least significant bits to zero
			c = (chunk & 15) << 2 // 15    = 2^4 - 1

			base64 += encodings[a] + encodings[b] + encodings[c] + '='
		}

		return base64
	},
	enableTypedArray: function (enable) {
		function subarray(start, end) {
			return this.slice(start, end);
		}
		function set_(array, offset) {
		if (arguments.length < 2) offset = 0;
			for (var i = 0, n = array.length; i < n; ++i, ++offset)
			  this[offset] = array[i] & 0xFF;
		}
		function TypedArray(arg1) {
			var result;
			if (typeof arg1 === "number") {
			   result = new Array(arg1);
			   for (var i = 0; i < arg1; ++i)
				 result[i] = 0;
			} else
			   result = arg1.slice(0);
			result.subarray = subarray;
			result.buffer = result;
			result.byteLength = result.length;
			result.set = set_;
			if (typeof arg1 === "object" && arg1.buffer)
			  result.buffer = arg1.buffer;

			return result;
		}

		window.Uint8Array = enable ? TypedArray : undefined;
		window.Uint32Array = enable ? TypedArray : undefined;
		window.Int32Array = enable ? TypedArray : undefined;
	},
	
	getDocument: function () {
		return this.document;
	},
	setDocument: function (document) {
		this.document = document;
	},
	loadDocument: function (path, callback, scope) {
		var me = this;
		Ext.Ajax.request({
			binary: true,
			url: path,
			success: function (response) {
				if (!me.isTypedArrayAllowed()) {
					me.enableTypedArray(true);
				}
				var decodedString = me.encodeArrayBufferToBase64(response.responseBytes),
					document = new openXml.OpenXmlPackage(decodedString);
				
				if (document) {
					me.document = document;
				}
				Ext.callback(callback, scope, [document]);
			}
		});
		
	},
	loadDocumentFromList: function (documentList) {
		var me = this,
			document, fileName, file, f2, partType, newPart, ctf, part, ct, thisPart;
		if (!me.isTypedArrayAllowed()) {
			me.enableTypedArray(true);
		}
		document = new openXml.OpenXmlPackage();
		for (fileName in documentList) {
			file = documentList[fileName];
			if (!openXml.util.endsWith(fileName, "/")) {
				partType = null;
				f2 = fileName;
				if (fileName !== "[Content_Types].xml") {
					f2 = "/" + fileName;
				}
				newPart = new openXml.OpenXmlPart(document, f2, null, null, file.data);
				document.parts[f2] = newPart;

			}
		}
            
		ctf = document.parts["[Content_Types].xml"];
		if (ctf === null) {
			throw "Invalid Open XML document: no [Content_Types].xml";
		}
		document.ctXDoc = XDocument.parse(ctf.data);

		for (var part in document.parts) {
			if (part === "[Content_Types].xml")
				continue;
			var ct = document.getContentType(part);
			var thisPart = document.parts[part];
			thisPart.contentType = ct;
			if (openXml.util.endsWith(ct, "xml")) {
				thisPart.partType = "xml";
			}
			if (!openXml.util.endsWith(ct, "xml")) {
				thisPart.partType = "binary";
			}
		}
				
		if (document) {
			me.document = document;
		}
		return document;
	
	},	
	saveDocument: function (name, path) {
		var document = this.getDocument(),
			stream, url;
		
		if (document) {
			stream = document.saveToBase64();
			url = encodeURI(path + name);			
			this.upload(name, url, '', stream);
		}
	},
	upload: function (sourceUrl, destinationUrl, Fields, Stream) {
		
		var docPath = this.createFolderPath(destinationUrl, sourceUrl);		
		
		Sharepoint.data.WebServices.createFolder(docPath[0], docPath[1], '', this, function () {
			Sharepoint.data.WebServices.copyIntoItems(sourceUrl, destinationUrl, Fields, Stream, this, function (options, success, response) {
				//TODO - Future requirement may need to do some post processing
			});
		});		
	},
	createFolderPath: function (filePath, fileName) {
		var path = filePath.split(fileName),
			result = [];
		path = path[0].split(L_Menu_BaseUrl);
		path = path[1].split('/');
		path = Ext.Array.clean(path);
		result.push(path.shift());
		result.push(path.join('/'));
		return result;		
	}
}, function () {
	window.XAttribute = Ltxml.XAttribute;
	window.XCData = Ltxml.XCData;
	window.XComment = Ltxml.XComment;
	window.XContainer = Ltxml.XContainer;
	window.XDeclaration = Ltxml.XDeclaration;
	window.XDocument = Ltxml.XDocument;
	window.XElement = Ltxml.XElement;
	window.XName = Ltxml.XName;
	window.XNamespace = Ltxml.XNamespace;
	window.XNode = Ltxml.XNode;
	window.XObject = Ltxml.XObject;
	window.XProcessingInstruction = Ltxml.XProcessingInstruction;
	window.XText = Ltxml.XText;
	window.XEntity = Ltxml.XEntity;
	window.cast = Ltxml.cast;
	window.castInt = Ltxml.castInt;
	
});