Ext.define('Task.store.Roles', {
	extend: 'Ext.data.Store',
	model: 'Task.model.Role',		
	storeId: 'Roles',
	autoLoad: true,
	autoSync: true,
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'Roles',
			rowLimit: '0'
		}
	}
});