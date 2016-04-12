Ext.define('Custom.model.RiskResponse', {
    extend: 'Ext.data.Model',
	idProperty: 'ID',
	fields: [{
		name: 'ID',
		mapping: '@ows_ID',
		type: 'int'
	}, {
		name: "Title",
		mapping: '@ows_Title',
		defaultValue: 'RiskResponse'
	}, {
		name: 'Request',
		mapping: '@ows_Request'
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
	}, {
		name: 'Core_x0020_Function_x0020_Suppor',
		mapping: '@ows_Core_x0020_Function_x0020_Suppor'
	}, {
		name: 'Impact_x0020_to_x0020_Cost_x0020',
		mapping: '@ows_Impact_x0020_to_x0020_Cost_x0020'
	}, {
		name: 'ACAT_x0020_Level',
		mapping: '@ows_ACAT_x0020_Level'
	}, {
		name: 'Directed_x0020_Authority',
		mapping: '@ows_Directed_x0020_Authority'
	}, {
		name: 'Directed_x0020_Authority_x0020__',
		mapping: '@ows_Directed_x0020_Authority_x0020__'
	}, {
		name: 'Joint_x0020_Requirement',
		mapping: '@ows_Joint_x0020_Requirement'
	}, {
		name: 'Funding_x0020_Realism',
		mapping: '@ows_Funding_x0020_Realism'
	}, {
		name: 'Schedule_x0020_Risk',
		mapping: '@ows_Schedule_x0020_Risk'
	}, {
		name: 'Technology_x0020_Maturity_x0020_',
		mapping: '@ows_Technology_x0020_Maturity_x0020_'
	}, {
		name: 'Aquisition_x0020_Process_x0020_M',
		mapping: '@ows_Aquisition_x0020_Process_x0020_M'
	}, {
		name: 'Work_x0020_Force_x0020_Health',
		mapping: '@ows_Work_x0020_Force_x0020_Health'
	}, {
		name: 'Contractor_x0020_Relationship',
		mapping: '@ows_Contractor_x0020_Relationship'
	}],
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'RiskResponses'
		}
	},
	belongsTo: {
		model: 'Custom.model.Request',
		getterName: 'getMyRequest'
	}
});