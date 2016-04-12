Ext.define('Custom.model.Location', {
    extend: 'Ext.data.Model',	
	idProperty: 'ID',
	fields: [{
		name: "ID",
		mapping: '@ows_ID'
	}, {
		name: "Title",
		mapping: '@ows_Title'
	}, {		
        name: 'UpdateValue',
        mapping: '@ows_Title',
        persist: false,
        convert: function (value, record) {
            var updateValue = record.get('ID') + ';#' + value;
            return updateValue;
        }    
	}],
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'Locations'
		}
	}
});