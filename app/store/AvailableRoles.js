Ext.define('Task.store.AvailableRoles', {
	extend: 'Ext.data.Store',
	model: 'Task.model.AvailableRole',
	storeId: 'AvailableRoles',
	autoLoad: false,
	autoSync: false,
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'Roles',
			rowLimit: '0'
		}
	}
});