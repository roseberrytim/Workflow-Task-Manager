Ext.define('Custom.store.Requests', {
	extend: 'Ext.data.Store',
	model: 'Custom.model.Request',
	storeId: 'Requests',
	groupField: 'State',
	autoSync: true,
	autoLoad: false	
});