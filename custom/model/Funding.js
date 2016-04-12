Ext.define('Custom.model.Funding', {
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
		name: "Title",
		mapping: '@ows_Title',
		defaultValue: 'FundingDetail'
	}, {
		name: 'FundingType',
		mapping: '@ows_FundingType'
	}, {
		name: 'FundingAmount',
		mapping: '@ows_FundingAmount'
	}, {
		name: 'FY',
		mapping: '@ows_FY'
	}, {
		name: 'FundingVerification',
		mapping: "@ows_FundingVerification"
	}, {
		name: 'Funded',
		mapping: '@ows_Funded',
		defaultValue: '0'
	}, {
		name: 'ProgramElement',
		mapping: '@ows_ProgramElement'
	},  {
		name: 'AdditionalInfo',
		mapping: '@ows_AdditionalInfo'
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
			listName: 'Funding'
		}
	},
	belongsTo: {
		model: 'Custom.model.Request',
		getterName: 'getMyRequest'
	}
});