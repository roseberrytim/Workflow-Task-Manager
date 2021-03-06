﻿Ext.define('Custom.xmlbuilder.XMLDTDNotation', {
	extend: 'Custom.xmlbuilder.Base',
	constructor: function (parent, name, value) {
		this.stringify = parent.stringify;
		if (name == null) {
		  throw new Error("Missing notation name");
		}
		if (!value.pubID && !value.sysID) {
		  throw new Error("Public or system identifiers are required for an external entity");
		}
		this.name = this.stringify.eleName(name);
		if (value.pubID != null) {
		  this.pubID = this.stringify.dtdPubID(value.pubID);
		}
		if (value.sysID != null) {
		  this.sysID = this.stringify.dtdSysID(value.sysID);
		}
	},
	
	clone: function() {
        return Ext.create('Custom.xmlbuilder.XMLDTDNotation', this, this.name, this.value);
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
		r += '<!NOTATION ' + this.name;
		if (this.pubID && this.sysID) {
		  r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
		} else if (this.pubID) {
		  r += ' PUBLIC "' + this.pubID + '"';
		} else if (this.sysID) {
		  r += ' SYSTEM "' + this.sysID + '"';
		}
		r += '>';
		if (pretty) {
		  r += newline;
		}
		return r;
	}


});