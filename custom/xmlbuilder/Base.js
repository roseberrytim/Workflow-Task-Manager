Ext.define('Custom.xmlbuilder.Base', {

	isObjectOrArray: function (value) {		
		var type = typeof value;
		return type == 'function' || (!!value && type == 'object');
	}

});