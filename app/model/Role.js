Ext.define('Task.model.Role', {
    extend: 'Ext.data.Model',	
	idProperty: 'ID',
	fields: [{
		name: "ID",
		mapping: '@ows_ID'
	}, {
		name: "Title",
		mapping: '@ows_Title'
	}, {
		name: 'Group',
		mapping: '@ows_Group'
	}, {
        name: 'UpdateValue',
        mapping: '@ows_Title',
        persist: false,
        convert: function (value, record) {
            var updateValue = record.get('ID') + ';#' + value;
            return updateValue;
        }
    }]
});