Ext.define('Task.model.AvailableRole', {
    extend: 'Ext.data.Model',
	idProperty: 'ID',
	fields: [{
		name: "ID",
		mapping: '@ows_ID'
	}, {
		name: "Name",
		mapping: '@ows_Title'
	}]
});