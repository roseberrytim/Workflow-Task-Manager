Ext.define('Custom.model.Authorization', {
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
		defaultValue: 'Authorization'
	}, {
		name: 'ASUResult', //ValidatedResult
		mapping: '@ows_ASUResult'
	}, {
		name: 'FY',
		mapping: '@ows_FY'
	}, {
		name: 'PM',
		mapping: '@ows_PM'
	}, {
		name: 'FM',
		mapping: '@ows_FM'
	}, {
		name: 'EN',
		mapping: '@ows_EN'
	}, {
		name: 'PK',
		mapping: '@ows_PK'
	}, {
		name: 'LG',
		mapping: '@ows_LG'
	}, {
		name: 'TE',
		mapping: '@ows_TE'
	}, {
		name: 'Intel',
		mapping: '@ows_Intel'
	}, {
		name: 'COS',
		mapping: '@ows_COS'
	}, {
		name: 'NFE',
		mapping: '@ows_NFE'
	}, {
		name: 'ValidationMethod',
		mapping: '@ows_ValidationMethod'
	}, {
		name: 'CurrentAuths',
		mapping: '@ows_CurrentAuths'
	}, {
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
			listName: 'Authorizations'
		}
	},
	belongsTo: {
		model: 'Custom.model.Request',
		getterName: 'getMyRequest'
	}
});