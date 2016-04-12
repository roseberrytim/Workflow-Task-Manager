Ext.define('Task.model.Group', {
	extend: 'Ext.data.Model',
	idProperty: 'ID',
	fields: [
		{name: 'ID', mapping: '@ID'},
		{name: 'Name', mapping: '@Name'},
		{name: 'Description', mapping: '@Description'}
	]
});