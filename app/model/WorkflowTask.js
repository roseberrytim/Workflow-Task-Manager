Ext.define('Task.model.WorkflowTask', {
    extend: 'Ext.data.Model',
	idProperty: 'ID',
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'Tasks',
			rowLimit: '0'
		}
	},
	fields: [
		{name: 'ID', mapping: '@ows_ID'}, 
		{name: 'Title', mapping: '@ows_Title'},
		{name: 'Description', mapping: '@ows_Description'},
		{name: 'AssignedTo', mapping: '@ows_AssignedTo'},
		{name: 'fAssignedTo', mapping: '@ows_AssignedTo', persist: false,
			convert: function (value, record) {
				var updateValue = value.split(';#');
				return updateValue[1];
			}
		},
		{name: 'Status', mapping: '@ows_Status'},
		{name: 'DelegationState', mapping: '@ows_DelegationState'},
		{name: 'CurrentNode', mapping: '@ows_CurrentNode', type: 'int'},
		{name: 'CurrentNodeName', mapping: '@ows_CurrentNodeName'},		
		{name: 'StartDate', mapping: '@ows_StartDate'},
		{name: 'DueDate', mapping: '@ows_DueDate'},
		{name: 'CompleteDate', mapping: '@ows_CompleteDate'},
		{name: 'WorkflowInstance', mapping: '@ows_WorkflowInstance'}, 
		{name: 'WorkflowInstance_ID', mapping: '@ows_WorkflowInstance', persist: false,	
			convert: function (value, record) {
				var updateValue = value.split(';#');
				return updateValue[0];
			}
		},
		{name: 'fExpireDate', mapping: '@ows_DueDate', persist: false, type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'fDueDate', mapping: '@ows_DueDate', persist: false, 
			convert: function (value, record) {
				if (!value) {
					return '(No Due Date)';
				}
				var parseDate = Ext.Date.parse(value, 'Y-m-d H:i:s'),
					today = Ext.Date.clearTime(new Date()),
					todayTime = today.getTime(),
					dueDateTime = Ext.Date.clearTime(parseDate).getTime();
				if (dueDateTime === todayTime) {
					return 'Today';
				}
				if (dueDateTime > todayTime) {
					if (dueDateTime === Ext.Date.add(today, Ext.Date.DAY, 1).getTime()) {
						return 'Tomorrow';
					}
					if (dueDateTime < Ext.Date.add(today, Ext.Date.DAY, 7).getTime()) {
						return Ext.Date.format(parseDate, 'l');
					}
				} else {
					if (dueDateTime === Ext.Date.add(today, Ext.Date.DAY, -1).getTime()) {
						return 'Yesterday';
					}
					if (dueDateTime > Ext.Date.add(today, Ext.Date.DAY, -7).getTime()) {
						return 'Last ' + Ext.Date.format(parseDate, 'l');
					}
				}
				return parseDate.getFullYear() === today.getFullYear() ? Ext.Date.format(parseDate, 'l m/d') : Ext.Date.format(parseDate, 'l m/d/Y');
			}
		}, 
		{name: 'ParentTask', mapping: '@ows_ParentTask'},
		{name: 'ParentTaskId', mapping: '@ows_ParentTask', 
			persist: false,
			convert: function (v, rec) {
				if (v) {
					var updateValue = v.split(';#');
					return updateValue[0];
				}
			}
		},
		{name: 'SubTaskParent', mapping: '@ows_SubTaskParent'},
		{name: 'SubTaskParentId', mapping: '@ows_SubTaskParent', 
			persist: false,
			convert: function (v, rec) {
				if (v) {
					var updateValue = v.split(';#');
					return updateValue[0];
				}
			}
		},
		{name: 'Owner', mapping: '@ows_Owner'},
		{name: 'fOwner', mapping: '@ows_Owner', persist: false,
			convert: function (value, record) {
				var updateValue = value.split(';#');
				return updateValue[1];
			}
		},	
		{name: 'Scope', mapping: '@ows_Scope'},
		{
			name: 'UpdateValue',
			mapping: '@ows_Title',
			persist: false,
			convert: function (value, record) {
				var updateValue = record.get('ID') + ';#' + value;
				return updateValue;
			}
		}
	],
	belongsTo: {
		model: 'Task.model.WorkflowInstance',
		foreignKey: 'WorkflowInstance_ID',
		primaryKey: 'ID',
		getterName: 'getMyWorkflowInstance'
	}
});