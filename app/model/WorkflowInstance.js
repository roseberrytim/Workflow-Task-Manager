Ext.define('Task.model.WorkflowInstance', {
    extend: 'Ext.data.Model',	
	idProperty: 'ID',
	requires: ['Ext.data.association.HasMany', 'Ext.data.association.HasOne', 'Ext.data.association.BelongsTo', 'Task.model.WorkflowTask', 'Task.model.WorkflowComment', 'Task.model.WorkflowHistory', 'Task.model.WorkflowDocument'],
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'WorkflowInstances'
		}
	},
	fields: [{
		name: "ID",
		mapping: '@ows_ID',
		type: 'int'
	}, {
		name: "Title",
		mapping: '@ows_Title'
	}, {
        name: 'WorkflowTitle',
        mapping: '@ows_WorkflowTitle'
    }, {
        name: 'ContinueEscalation',
        mapping: '@ows_ContinueEscalation'
    }, {
        name: 'Model',
        mapping: '@ows_Model'
    }, {
        name: 'MetaType',
        mapping: '@ows_MetaType'
    },{
		name: 'Status',
		mapping: '@ows_Status'
	}, {
        name: 'UpdateValue',
        mapping: '@ows_Title',
        persist: false,
        convert: function (value, record) {
            var updateValue = record.get('ID') + ';#' + value;
            return updateValue;
        }
    }, {
        name: 'UpdateTitle',
        mapping: '@ows_WorkflowTitle',
        persist: false,
        convert: function (value, record) {
            var updateValue = record.get('ID') + ';#' + value;
            return updateValue;
        }
    }, {
		name: "StartTime",
		mapping: '@ows_StartTime',
		type: "date",
		dateFormat: "Y-m-d H:i:s"
	}, {
		name: "EndTime",
		mapping: '@ows_EndTime',
		type: "date",
		dateFormat: "Y-m-d H:i:s"
	}],
    associations: [{		
		type: 'hasMany',
		model: 'Task.model.WorkflowTask',
        foreignKey: 'WorkflowInstance_ID',
        primaryKey: 'ID',
        name: 'getWorkflowInstanceTasks',
		storeConfig: {
			autoSync: true
		},
        autoLoad: false
    }, {
        type: 'hasMany',
		model: 'Task.model.WorkflowComment',
        foreignKey: 'WorkflowInstance_ID',
        primaryKey: 'ID',
        name: 'getWorkflowInstanceComments',
		storeConfig: {
			autoSync: true
		},
        autoLoad: false
    }, {
        type: 'hasMany',
		model: 'Task.model.WorkflowHistory',
        foreignKey: 'WorkflowInstance_ID',
        primaryKey: 'ID',
        name: 'getWorkflowInstanceHistory',
		storeConfig: {
			autoSync: true
		},
        autoLoad: false
    }, {
        type: 'hasMany',
		model: 'Task.model.WorkflowDocument',
        foreignKey: 'WorkflowInstance_Title',
        primaryKey: 'Title',
        name: 'getWorkflowDocuments',
		storeConfig: {
			autoSync: true			
		},
        autoLoad: false
    }]
});