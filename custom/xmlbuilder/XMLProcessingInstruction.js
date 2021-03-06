﻿Ext.define('Custom.xmlbuilder.XMLProcessingInstruction', {
	extend: 'Custom.xmlbuilder.Base',
	constructor: function (parent, target, value) {
		this.stringify = parent.stringify;
		if (target == null) {
		  throw new Error("Missing instruction target");
		}
		this.target = this.stringify.insTarget(target);
		if (value) {
		  this.value = this.stringify.insValue(value);
		}
	},
	
	clone: function() {
        return Ext.create('Custom.xmlbuilder.XMLProcessingInstruction', this, this.targe, this.value);
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
		r += '<?';
		r += this.target;
		if (this.value) {
		  r += ' ' + this.value;
		}
		r += '?>';
		if (pretty) {
		  r += newline;
		}
		return r;
	}


});