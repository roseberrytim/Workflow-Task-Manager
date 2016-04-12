Ext.define('Task.model.WorkflowComment', {
	extend: 'Ext.data.Model',
	idProperty: 'ID',
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'WorkflowInstances_Comments',
			rowLimit: '0'
		}
	},
	fields: [{
		name: 'ID', 
		mapping: '@ows_ID',
		type: 'int'
	}, {
		name: 'Title',
		mapping: '@ows_Title'
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
		name: 'CreatedBy',
		mapping: '@ows_Author',
		persist: false,
		convert: function(v, data) {
			var a = v.split(';#'),
				fixedValue = ''
			if (a.length === 2) {
				fixedValue = a[0];
			}
			return fixedValue;
		}
	}, {
		name: 'Comment',
		mapping: '@ows_Comment'
	}, {
		name: 'WorkflowInstance',
		mapping: '@ows_WorkflowInstance'
	}, {
		name: 'CreatedTimeDate',
        mapping: '@ows_Created',
        type: 'date',
		persist: false,
        dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'TimeDate',
        mapping: '@ows_Modified',
        type: 'date',
		persist: false,
        dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'Version',
		mapping: '@ows__UIVersionString',
		persist: false
	}, {
		name: 'WorkflowInstance_ID',
		mapping: '@ows_WorkflowInstance',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[0];		
		}
	}],
	belongsTo: {
		model: 'Task.model.WorkflowInstance',
		getterName: 'getMyWorkflowInstance'
	}
});