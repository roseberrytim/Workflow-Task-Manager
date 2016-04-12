Ext.define('Task.model.Workflow', {
    extend: 'Ext.data.Model',
	requires: ['Task.model.WorkflowNode', 'Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],	
	fields: [{
		name: 'id'
	}, {
		name: 'title'
	}, {
		name: 'description'
	}, {
		name: 'metadata'
	}, {
		name: 'stores'
	}, {
		name: 'participants'
	}],
	
	hasMany: {
		model: 'Task.model.WorkflowNode',
		name: 'getNodes',
		associationKey: 'nodes',
		foreignKey: 'workflow_id'
	}	
});