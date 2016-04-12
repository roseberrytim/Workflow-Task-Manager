﻿Ext.define('Custom.xmlbuilder.XMLDTDAttList', {
	extend: 'Custom.xmlbuilder.Base',
	constructor: function (parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
		 this.stringify = parent.stringify;
		if (elementName == null) {
		  throw new Error("Missing DTD element name");
		}
		if (attributeName == null) {
		  throw new Error("Missing DTD attribute name");
		}
		if (!attributeType) {
		  throw new Error("Missing DTD attribute type");
		}
		if (!defaultValueType) {
		  throw new Error("Missing DTD attribute default");
		}
		if (defaultValueType.indexOf('#') !== 0) {
		  defaultValueType = '#' + defaultValueType;
		}
		if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
		  throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
		}
		if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
		  throw new Error("Default value only applies to #FIXED or #DEFAULT");
		}
		this.elementName = this.stringify.eleName(elementName);
		this.attributeName = this.stringify.attName(attributeName);
		this.attributeType = this.stringify.dtdAttType(attributeType);
		this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
		this.defaultValueType = defaultValueType;
	},
	
	clone: function() {
        return Ext.create('Custom.xmlbuilder.XMLDTDAttList', this, this.elementName, this.attributeName, this.attributeType, this.defaultValueType, this.defaultValue);
    },
	toString: function (options) {
		var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
		pretty = (options != null ? options.pretty : void 0) || false;
		indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
		offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
		newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
		level || (level = 0);
		space = new Array(level + offset + 1).join(indent);
		r = '';
		if (pretty) {
		  r += space;
		}
		r += '<!ATTLIST ' + this.elementName + ' ' + this.attributeName + ' ' + this.attributeType;
		if (this.defaultValueType !== '#DEFAULT') {
		  r += ' ' + this.defaultValueType;
		}
		if (this.defaultValue) {
		  r += ' "' + this.defaultValue + '"';
		}
		r += '>';
		if (pretty) {
		  r += newline;
		}
		return r;
	}


});