Ext.define('Task.store.WorkflowHistory', {
	extend: 'Ext.data.Store',
	model: 'Task.model.WorkflowHistory',
	storeId: 'WorkflowHistory',
	autoSync: true,
	autoLoad: false
});