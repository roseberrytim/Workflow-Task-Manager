﻿Ext.define('Custom.xmlbuilder.XMLDTDEntity', {
	extend: 'Custom.xmlbuilder.Base',
	constructor: function (parent, pe, name, value) {
		this.stringify = parent.stringify;
		if (name == null) {
		  throw new Error("Missing entity name");
		}
		if (value == null) {
		  throw new Error("Missing entity value");
		}
		this.pe = !!pe;
		this.name = this.stringify.eleName(name);
		if (!this.isObjectOrArray(value)) {
		  this.value = this.stringify.dtdEntityValue(value);
		} else {
		  if (!value.pubID && !value.sysID) {
			throw new Error("Public and/or system identifiers are required for an external entity");
		  }
		  if (value.pubID && !value.sysID) {
			throw new Error("System identifier is required for a public external entity");
		  }
		  if (value.pubID != null) {
			this.pubID = this.stringify.dtdPubID(value.pubID);
		  }
		  if (value.sysID != null) {
			this.sysID = this.stringify.dtdSysID(value.sysID);
		  }
		  if (value.nData != null) {
			this.nData = this.stringify.dtdNData(value.nData);
		  }
		  if (this.pe && this.nData) {
			throw new Error("Notation declaration is not allowed in a parameter entity");
		  }
		}
	},
	
	clone: function() {
        return Ext.create('Custom.xmlbuilder.XMLDTDEntity', this, this.pe, this.name, this.value);
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
		r += '<!ENTITY';
		if (this.pe) {
		  r += ' %';
		}
		r += ' ' + this.name;
		if (this.value) {
		  r += ' "' + this.value + '"';
		} else {
		  if (this.pubID && this.sysID) {
			r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
		  } else if (this.sysID) {
			r += ' SYSTEM "' + this.sysID + '"';
		  }
		  if (this.nData) {
			r += ' NDATA ' + this.nData;
		  }
		}
		r += '>';
		if (pretty) {
		  r += newline;
		}
		return r;
	}


});