Ext.define('Task.model.TaskListener', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],

    fields: [
        'node_id',
		'type',
        'event',
        'class',
		'parameters'
    ],
    belongsTo: {
        model: 'Task.model.WorkflowNode',
        getterName: 'getMyNode'     
    }
});