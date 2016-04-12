Ext.define('Task.store.WorkflowTasks', {
	extend: 'Ext.data.Store',
	model: 'Task.model.WorkflowTask',
	storeId: 'WorkflowTasks',
	groupField: 'fDueDate',
	autoSync: false,
	autoLoad: false	
});