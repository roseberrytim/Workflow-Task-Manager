Ext.define('Custom.xmlbuilder.XMLAttribute', {
	extend: 'Custom.xmlbuilder.Base',
	constructor: function (parent, name, value) {
		this.stringify = parent.stringify;
		if (name == null) {
		  throw new Error("Missing attribute name of element " + parent.name);
		}
		if (value == null) {
		  throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
		}
		this.name = this.stringify.attName(name);
		this.value = this.stringify.attValue(value);
	},
	clone: function () {
		return Ext.create('Custom.xmlbuilder.XMLAttribute', this, this.name, this.value);
	},
	toString: function (options, level) {
		return ' ' + this.name + '="' + this.value + '"'; 
	}

})