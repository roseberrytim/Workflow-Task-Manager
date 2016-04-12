Ext.define('Task.store.AllWorkflowInstances', {
	extend: 'Ext.data.Store',
	model: 'Task.model.WorkflowInstance',
	storeId: 'AllWorkflowInstances',
	autoSync: false,
	autoLoad: false	
});