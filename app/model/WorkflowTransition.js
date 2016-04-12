Ext.define('Task.model.WorkflowTransition', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],

    fields: [
        'node_id',
		'type',
        'action',
        'nodes',        
		'condition',
        'afterTransition',
		'beforeTransition',
		'parameters'
    ],
    belongsTo: {
        model: 'Task.model.WorkflowNode',
        getterName: 'getMyNode'     
    }
});