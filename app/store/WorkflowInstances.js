Ext.define('Task.store.WorkflowInstances', {
	extend: 'Ext.data.Store',
	model: 'Task.model.WorkflowInstance',
	storeId: 'WorkflowInstances',
	autoSync: false,
	autoLoad: false	
});