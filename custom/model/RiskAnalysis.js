Ext.define('Custom.model.RiskAnalysis', {
    extend: 'Ext.data.Model',	
	idProperty: 'ID',
	fields: [{
		name: "ID",
		mapping: '@ows_ID',
		type: 'int'
	}, {
		name: 'Request',
		mapping: '@ows_Request'
	}, {
		name: 'Directorate',
		mapping: '@ows_Directorate'
	}, {
		name: "Title",
		mapping: '@ows_Title'		
	}, {
		name: 'Description',
		mapping: '@ows_Description'
	}, {
		name: 'RiskType',
		mapping: '@ows_RiskType'
	}, {
		name: 'Mitigation',
		mapping: '@ows_Mitigation'
	}, {
		name: 'WorstCaseImpact',
		mapping: '@ows_WorstCaseImpact'
	}, {
		name: 'Likelihood',
		mapping: '@ows_Likelihood'
	}, {
		name: 'Consequence',
		mapping: '@ows_Consequence'
	}, {
		name: 'Request_ID',
		mapping: '@ows_Request',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[0];		
		}
	}],
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'RiskAnalysis'
		}
	},
	belongsTo: {
		model: 'Custom.model.Request',
		getterName: 'getMyRequest'
	}
});