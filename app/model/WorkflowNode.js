Ext.define('Task.model.WorkflowNode', {
    extend: 'Ext.data.Model',
	requires: ['Task.model.WorkflowTransition', 'Task.model.TaskListener', 'Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],	
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'type'
	}, {
		name: 'merge'
	}, {
		name: 'name'
	}, {
		name: 'description'
	}, {
		name: 'assignee'
	}, {
		name: 'duration'
	}, {
		name: 'group'
	}, {
		name: 'activity'
	}, {
		name: 'individualTasks'
	}, {
		name: 'allowDocumentEdit'
	}, {
		name: 'workflow_id'
	}],
	
	hasMany: [{
		model: 'Task.model.WorkflowTransition',
		name: 'getTransitions',
		associationKey: 'transitions',
		foreignKey: 'node_id'
	}, {
		model: 'Task.model.TaskListener',
		name: 'getListeners',
		associationKey: 'listeners',
		foreignKey: 'node_id'
	}],
	belongsTo: {
        model: 'Task.model.Workflow',
        getterName: 'getMyWorkflow'       
    }
});