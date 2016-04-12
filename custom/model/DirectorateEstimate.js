Ext.define('Custom.model.DirectorateEstimate', {
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
		defaultValue: 'ResourceEstimate'
	}, {
		name: 'Directorate',
		mapping: '@ows_Directorate'
	}, {
		name: 'ContractSvcsLimit',
		mapping: '@ows_ContractSvcsLimit'
	}, {
		name: 'Reimbursable',
		mapping: '@ows_Reimbursable'
	}, {
		name: 'FY',
		mapping: '@ows_FY'
	}, {
		name: 'OffPM',
		mapping: '@ows_OffPM',
		type: 'number'
	}, {
		name: 'OffFM',
		mapping: '@ows_OffFM',
		type: 'number'
	}, {
		name: 'OffEN',
		mapping: '@ows_OffEN',
		type: 'number'
	}, {
		name: 'OffPK',
		mapping: '@ows_OffPK',
		type: 'number'
	}, {
		name: 'OffLG',
		mapping: '@ows_OffLG',
		type: 'number'
	}, {
		name: 'OffTE',
		mapping: '@ows_OffTE',
		type: 'number'
	}, {
		name: 'OffCOS',
		mapping: '@ows_OffCOS',
		type: 'number'
	}, {
		name: 'OffIntel',
		mapping: '@ows_OffIntel',
		type: 'number'
	}, {
		name: 'OffNFE',
		mapping: '@ows_OffNFE',
		type: 'number'
	}, {
		name: 'EnlPM',
		mapping: '@ows_EnlPM',
		type: 'number'
	}, {
		name: 'EnlFM',
		mapping: '@ows_EnlFM',
		type: 'number'
	}, {
		name: 'EnlEN',
		mapping: '@ows_EnlEN',
		type: 'number'
	}, {
		name: 'EnlPK',
		mapping: '@ows_EnlPK',
		type: 'number'
	}, {
		name: 'EnlLG',
		mapping: '@ows_EnlLG',
		type: 'number'
	}, {
		name: 'EnlTE',
		mapping: '@ows_EnlTE',
		type: 'number'
	}, {
		name: 'EnlCOS',
		mapping: '@ows_EnlCOS',
		type: 'number'
	}, {
		name: 'EnlIntel',
		mapping: '@ows_EnlIntel',
		type: 'number'
	}, {
		name: 'EnlNFE',
		mapping: '@ows_EnlNFE',
		type: 'number'
	}, {
		name: 'CivPM',
		mapping: '@ows_CivPM',
		type: 'number'
	}, {
		name: 'CivFM',
		mapping: '@ows_CivFM',
		type: 'number'
	}, {
		name: 'CivEN',
		mapping: '@ows_CivEN',
		type: 'number'
	}, {
		name: 'CivPK',
		mapping: '@ows_CivPK',
		type: 'number'
	}, {
		name: 'CivLG',
		mapping: '@ows_CivLG',
		type: 'number'
	}, {
		name: 'CivTE',
		mapping: '@ows_CivTE',
		type: 'number'
	}, {
		name: 'CivCOS',
		mapping: '@ows_CivCOS',
		type: 'number'
	}, {
		name: 'CivIntel',
		mapping: '@ows_CivIntel',
		type: 'number'
	}, {
		name: 'CivNFE',
		mapping: '@ows_CivNFE',
		type: 'number'
	}, {
		name: 'CME_PM',
		mapping: '@ows_CME_PM',
		type: 'number'
	}, {
		name: 'CME_FM',
		mapping: '@ows_CME_FM',
		type: 'number'
	}, {
		name: 'CME_EN',
		mapping: '@ows_CME_EN',
		type: 'number'
	}, {
		name: 'CME_PK',
		mapping: '@ows_CME_PK',
		type: 'number'
	}, {
		name: 'CME_LG',
		mapping: '@ows_CME_LG',
		type: 'number'
	}, {
		name: 'CME_TE',
		mapping: '@ows_CME_TE',
		type: 'number'
	}, {
		name: 'CME_Intel',
		mapping: '@ows_CME_Intel',
		type: 'number'
	}, {
		name: 'CME_COS',
		mapping: '@ows_CME_COS',
		type: 'number'
	}, {
		name: 'CME_NFE',
		mapping: '@ows_CME_NFE',
		type: 'number'
	}, {
		name: 'DirOffPM',
		mapping: '@ows_DirOffPM',
		type: 'number'
	}, {
		name: 'DirOffFM',
		mapping: '@ows_DirOffFM',
		type: 'number'
	}, {
		name: 'DirOffEN',
		mapping: '@ows_DirOffEN',
		type: 'number'
	}, {
		name: 'DirOffPK',
		mapping: '@ows_DirOffPK',
		type: 'number'
	}, {
		name: 'DirOffLG',
		mapping: '@ows_DirOffLG',
		type: 'number'
	}, {
		name: 'DirOffTE',
		mapping: '@ows_DirOffTE',
		type: 'number'
	}, {
		name: 'DirOffCOS',
		mapping: '@ows_DirOffCOS',
		type: 'number'
	}, {
		name: 'DirOffIntel',
		mapping: '@ows_DirOffIntel',
		type: 'number'
	}, {
		name: 'DirOffNFE',
		mapping: '@ows_DirOffNFE',
		type: 'number'
	}, {
		name: 'DirEnlPM',
		mapping: '@ows_DirEnlPM',
		type: 'number'
	}, {
		name: 'DirEnlFM',
		mapping: '@ows_DirEnlFM',
		type: 'number'
	}, {
		name: 'DirEnlEN',
		mapping: '@ows_DirEnlEN',
		type: 'number'
	}, {
		name: 'DirEnlPK',
		mapping: '@ows_DirEnlPK',
		type: 'number'
	}, {
		name: 'DirEnlLG',
		mapping: '@ows_DirEnlLG',
		type: 'number'
	}, {
		name: 'DirEnlTE',
		mapping: '@ows_DirEnlTE',
		type: 'number'
	}, {
		name: 'DirEnlCOS',
		mapping: '@ows_DirEnlCOS',
		type: 'number'
	}, {
		name: 'DirEnlIntel',
		mapping: '@ows_DirEnlIntel',
		type: 'number'
	}, {
		name: 'DirEnlNFE',
		mapping: '@ows_DirEnlNFE',
		type: 'number'
	}, {
		name: 'DirCivPM',
		mapping: '@ows_DirCivPM',
		type: 'number'
	}, {
		name: 'DirCivFM',
		mapping: '@ows_DirCivFM',
		type: 'number'
	}, {
		name: 'DirCivEN',
		mapping: '@ows_DirCivEN',
		type: 'number'
	}, {
		name: 'DirCivPK',
		mapping: '@ows_DirCivPK',
		type: 'number'
	}, {
		name: 'DirCivLG',
		mapping: '@ows_DirCivLG',
		type: 'number'
	}, {
		name: 'DirCivTE',
		mapping: '@ows_DirCivTE',
		type: 'number'
	}, {
		name: 'DirCivCOS',
		mapping: '@ows_DirCivCOS',
		type: 'number'
	}, {
		name: 'DirCivIntel',
		mapping: '@ows_DirCivIntel',
		type: 'number'
	}, {
		name: 'DirCivNFE',
		mapping: '@ows_DirCivNFE',
		type: 'number'
	}, {
		name: 'DirCME_PM',
		mapping: '@ows_DirCME_PM',
		type: 'number'
	}, {
		name: 'DirCME_FM',
		mapping: '@ows_DirCME_FM',
		type: 'number'
	}, {
		name: 'DirCME_EN',
		mapping: '@ows_DirCME_EN',
		type: 'number'
	}, {
		name: 'DirCME_PK',
		mapping: '@ows_DirCME_PK',
		type: 'number'
	}, {
		name: 'DirCME_LG',
		mapping: '@ows_DirCME_LG',
		type: 'number'
	}, {
		name: 'DirCME_TE',
		mapping: '@ows_DirCME_TE',
		type: 'number'
	}, {
		name: 'DirCME_Intel',
		mapping: '@ows_DirCME_Intel',
		type: 'number'
	}, {
		name: 'DirCME_COS',
		mapping: '@ows_DirCME_COS',
		type: 'number'
	}, {
		name: 'DirCME_NFE',
		mapping: '@ows_DirCME_NFE',
		type: 'number'
	}, {
		name: 'ExtOffPM',
		mapping: '@ows_ExtOffPM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffFM',
		mapping: '@ows_ExtOffFM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffEN',
		mapping: '@ows_ExtOffEN',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffPK',
		mapping: '@ows_ExtOffPK',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffLG',
		mapping: '@ows_ExtOffLG',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffTE',
		mapping: '@ows_ExtOffTE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffCOS',
		mapping: '@ows_ExtOffCOS',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffIntel',
		mapping: '@ows_ExtOffIntel',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtOffNFE',
		mapping: '@ows_ExtOffNFE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlPM',
		mapping: '@ows_ExtEnlPM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlFM',
		mapping: '@ows_ExtEnlFM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlEN',
		mapping: '@ows_ExtEnlEN',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlPK',
		mapping: '@ows_ExtEnlPK',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlLG',
		mapping: '@ows_ExtEnlLG',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlTE',
		mapping: '@ows_ExtEnlTE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlCOS',
		mapping: '@ows_ExtEnlCOS',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlIntel',
		mapping: '@ows_ExtEnlIntel',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtEnlNFE',
		mapping: '@ows_ExtEnlNFE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivPM',
		mapping: '@ows_ExtCivPM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivFM',
		mapping: '@ows_ExtCivFM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivEN',
		mapping: '@ows_ExtCivEN',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivPK',
		mapping: '@ows_ExtCivPK',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivLG',
		mapping: '@ows_ExtCivLG',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivTE',
		mapping: '@ows_ExtCivTE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivCOS',
		mapping: '@ows_ExtCivCOS',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivIntel',
		mapping: '@ows_ExtCivIntel',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCivNFE',
		mapping: '@ows_ExtCivNFE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_PM',
		mapping: '@ows_ExtCME_PM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_FM',
		mapping: '@ows_ExtCME_FM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_EN',
		mapping: '@ows_ExtCME_EN',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_PK',
		mapping: '@ows_ExtCME_PK',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_LG',
		mapping: '@ows_ExtCME_LG',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_TE',
		mapping: '@ows_ExtCME_TE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_Intel',
		mapping: '@ows_ExtCME_Intel',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_COS',
		mapping: '@ows_ExtCME_COS',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'ExtCME_NFE',
		mapping: '@ows_ExtCME_NFE',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'EstDeltaFM',
		mapping: '@ows_EstDeltaFM',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'EstDeltaEN',
		mapping: '@ows_EstDeltaEN',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'Location',
		mapping: '@ows_Location'
	}, {
		name: 'SourceType',
		mapping: '@ows_SourceType'
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
			listName: 'DirectorateEstimates'
		}
	},
	belongsTo: {
		model: 'Custom.model.Request',
		getterName: 'getMyRequest'
	}
});