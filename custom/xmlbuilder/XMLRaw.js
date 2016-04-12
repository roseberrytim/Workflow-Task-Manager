Ext.define('Custom.xmlbuilder.XMLRaw', {
	extend: 'Custom.xmlbuilder.XMLNode',

	constructor: function (parent, text) {
		this.callParent([parent]);
		if (text == null) {
		  throw new Error("Missing raw text");
		}
		this.value = this.stringify.raw(text);
	},
	clone: function () {
		return Ext.create('Custom.xmlbuilder.XMLRaw', this, this.text);
	},
	toString: function (options, level) {
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
		r += this.value;
		if (pretty) {
		  r += newline;
		}
		return r;
	}
	
});