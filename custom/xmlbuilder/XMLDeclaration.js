Ext.define('Custom.xmlbuilder.XMLDeclaration', {
	extend: 'Custom.xmlbuilder.XMLNode',

	constructor: function (parent, version, encoding, standalone) {
		var ref;
		this.callParent([parent]);
		if (this.isObjectOrArray(version)) {
			ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
		}
		if (!version) {
		  version = '1.0';
		}
		if (version != null) {
		  this.version = this.stringify.xmlVersion(version);
		}
		if (encoding != null) {
		  this.encoding = this.stringify.xmlEncoding(encoding);
		}
		if (standalone != null) {
		  this.standalone = this.stringify.xmlStandalone(standalone);
		}
	},
	clone: function () {
		return Ext.create('Custom.xmlbuilder.XMLDeclaration', this, this.version, this.encoding, this.standalone);
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
		r += '<?xml';
		if (this.version != null) {
		  r += ' version="' + this.version + '"';
		}
		if (this.encoding != null) {
		  r += ' encoding="' + this.encoding + '"';
		}
		if (this.standalone != null) {
		  r += ' standalone="' + this.standalone + '"';
		}
		r += '?>';
		if (pretty) {
		  r += newline;
		}
		return r;
	}
	
});