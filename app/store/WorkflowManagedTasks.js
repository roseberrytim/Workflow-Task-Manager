Ext.define('Task.store.WorkflowManagedTasks', {
	extend: 'Ext.data.Store',
	model: 'Task.model.WorkflowTask',
	storeId: 'WorkflowManagedTasks',
	groupField: 'fDueDate',
	autoSync: false,
	autoLoad: false	
});