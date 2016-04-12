Ext.define('Task.store.WorkflowInstancesLibrary', {
	extend: 'Ext.data.Store',
	model: 'Task.model.Document',
	storeId: 'WorkflowInstancesLibrary',
	autoSync: true,
	autoLoad: false	
});