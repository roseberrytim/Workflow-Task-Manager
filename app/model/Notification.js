Ext.define('Task.model.Notification', {
	extend: 'Ext.data.Model',
	idProperty: 'ID',
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'Notifications'			
		}
	},
	fields: [{
		name: 'ID', 
		mapping: '@ows_ID'
	}, {
		name: 'Title',
		mapping: '@ows_Title'
	}, {
		name: 'To',
		mapping: '@ows_To'
	}, {
		name: 'CC',
		mapping: '@ows_CC'
	}, {
		name: 'Subject',
		mapping: '@ows_Subject'
	}, {
		name: 'Body',
		mapping: '@ows_Body'
	}]
});