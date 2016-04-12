Ext.define('Custom.xmlbuilder.XMLDTDElement', {
	extend: 'Custom.xmlbuilder.Base',
	constructor: function (parent, name, value) {
		 this.stringify = parent.stringify;
		if (name == null) {
		  throw new Error("Missing DTD element name");
		}
		if (!value) {
		  value = '(#PCDATA)';
		}
		if (Ext.isArray(value)) {
		  value = '(' + value.join(',') + ')';
		}
		this.name = this.stringify.eleName(name);
		this.value = this.stringify.dtdElementValue(value);
	},
	
	clone: function() {
        return Ext.create('Custom.xmlbuilder.XMLDTDElement', this, this.name, this.value);
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
		r += '<!ELEMENT ' + this.name + ' ' + this.value + '>';
		if (pretty) {
		  r += newline;
		}
		return r;
	}


});