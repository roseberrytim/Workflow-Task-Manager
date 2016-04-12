Ext.define('Task.store.Notifications', {
	extend: 'Ext.data.Store',
	model: 'Task.model.Notification',
	storeId: 'Notifications',
	autoSync: false,
	autoLoad: false
});