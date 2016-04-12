Ext.define('Task.model.WorkflowHistory', {
	extend: 'Ext.data.Model',
	idProperty: 'ID',
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'WorkflowInstances_History',
			rowLimit: '0'
		}
	},
	fields: [{
		name: 'ID', 
		mapping: '@ows_ID'
	}, {
		name: 'Title',
		mapping: '@ows_Title'
	}, {
		name: 'User',
		mapping: '@ows_User'
	}, {
		name: 'Author',
		mapping: '@ows_Author',
		persist: false,
		convert: function(v, data) {
			var a = v.split(';#'),
				fixedValue = ''
			if (a.length === 2) {
				fixedValue = a[1];
			}
			return fixedValue;
		}
	}, {
		name: 'WorkflowInstance',
		mapping: '@ows_WorkflowInstance'
	}, {
		name: 'TimeDate',
        mapping: '@ows_Created',
		persist: false,
        type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	},{
		name: 'WorkflowInstance_ID',
		mapping: '@ows_WorkflowInstance',
		persist: false,
		convert: function (value, record) {
			var updateValue = value.split(';#');
			return updateValue[0];
		}
	}],
	belongsTo: {
		model: 'Task.model.WorkflowInstance',
		getterName: 'getMyWorkflowInstance'
	}
});