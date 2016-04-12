Ext.define('Custom.model.Request', {
    extend: 'Ext.data.Model',	
	idProperty: 'ID',
	requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'Custom.model.RiskAnalysis', 'Custom.model.Authorization', 'Custom.model.FacilityRequirement', 'Custom.model.DirectorateEstimate', 'Custom.model.RiskResponse', 'Custom.model.Funding'],
	fields: [{
		name: "ID",
		mapping: '@ows_ID',
		type: 'int'
	}, {
		name: "Title",
		mapping: '@ows_Title'
	}, {
		name: 'State',
		mapping: '@ows_State',
		defaultValue: 'Non-Submit'
	}, {
		name: 'SubmitDate',
		mapping: '@ows_SubmitDate'		
	}, {
		name: 'fSubmitDate',
		mapping: '@ows_SubmitDate',
		type: "date",
		persist: false,
		dateFormat: "Y-m-d H:i:s"
	}, {
		name: 'Description',
		mapping: '@ows_Description'
	}, {
		name: 'NeedBy',
		mapping: '@ows_NeedBy',
		type: "date",
		dateFormat: "Y-m-d H:i:s"
	}, {
		name: 'DirectedAuthority',
		mapping: '@ows_DirectedAuthority'
	}, {
		name: 'Justification',
		mapping: '@ows_Justification'
	}, {
		name: 'ImpactNoFund',
		mapping: '@ows_ImpactNoFund'
	}, {
		name: 'ImpactAnother',
		mapping: '@ows_ImpactAnother'
	}, {
		name: 'Directorate',
		mapping: '@ows_Directorate'
	}, {
		name: 'PrimaryDirectorate_Title',
		persist: false,
		mapping: '@ows_PrimaryDirectorate',
		convert: function (value, record) {
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'SupportDirectorate_Title',
		persist: false,
		mapping: '@ows_SupportDirectorate',
		convert: function (value, record) {
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}, {
		name: 'PrimaryDirectorate',
		mapping: '@ows_PrimaryDirectorate'		
	}, {
		name: 'SupportDirectorate',
		mapping: '@ows_SupportDirectorate'		
	},{
		name: 'ACATLevel',
		mapping: '@ows_ACATLevel'
	}, {
		name: 'Priority',
		mapping: '@ows_Priority'
	}, {
		name: 'WorkCategory',
		mapping: '@ows_WorkCategory'
	}, {
		name: 'FMSCaseTitle',
		mapping: '@ows_FMSCaseTitle'
	}, {
		name: 'FMSType',
		mapping: '@ows_FMSType'
	}, {
		name: 'Program',
		mapping: '@ows_Program'
	}, {
		name: 'IsWMLExist',
		mapping: '@ows_IsWMLExist'
	}, {
		name: 'PrimaryPOC',
		mapping: '@ows_PrimaryPOC'
	}, {
		name: 'PrimaryOffice',
		mapping: '@ows_PrimaryOffice'
	}, {
		name: 'PrimaryPhone',
		mapping: '@ows_PrimaryPhone'
	}, {
		name: 'SecondaryPOC',
		mapping: '@ows_SecondaryPOC'
	}, {
		name: 'SecondaryOffice',
		mapping: '@ows_SecondaryOffice'
	}, {
		name: 'SecondaryPhone',
		mapping: '@ows_SecondaryPhone'
	}, {
		name: 'Approver',
		mapping: '@ows_Approver'
	}, {
		name: 'ApproveDate',
		mapping: '@ows_ApproveDate'		
	},  {
		name: 'fApproveDate',
		mapping: '@ows_ApproveDate',
		type: "date",
		persist: false,
		dateFormat: "Y-m-d H:i:s"
	}, {
		name: 'DivisionApproved',
		mapping: '@ows_DivisionApproved'
	}, {
		name: 'Funded',
		mapping: '@ows_Funded'
	}, {
		name: 'FundingVerification',
		mapping: '@ows_FundingVerification'
	}, {
		name: 'ProgramElement',
		mapping: '@ows_ProgramElement'
	}, {
		name: 'FYLabels',
		mapping: '@ows_FYLabels'
	}, {
		name: 'SubmitNode',
		mapping: '@ows_SubmitNode',
		type: 'int'
	}, {
		name: 'TempRBTScore',
		mapping: '@ows_TempRBTScore',
		type: 'int'
	}, {
		name: 'Reassigned',
		mapping: '@ows_Reassigned'
	}, {
		name: 'Comment',
		mapping: '@ows_Comment'
	}, {
		name: 'Fac_Required',
		mapping: '@ows_Fac_Required'
	}, {
		name: 'Fac_OfficeSymbol',
		mapping: '@ows_Fac_OfficeSymbol'
	}, {
		name: 'Fac_POC',
		mapping: '@ows_Fac_POC'
	}, {
		name: 'Fac_POCPhone',
		mapping: '@ows_Fac_POCPhone'
	}, {
		name: 'Fac_Justification',
		mapping: '@ows_Fac_Justification'
	}, {
		name: 'Fac_NeedBy',
		mapping: '@ows_Fac_NeedBy',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'Fac_Milestone',
		mapping: '@ows_Fac_Milestone'
	}, {
		name: 'Modified',
		mapping: '@ows_Modified',
		persist: false, 
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'Created',
		mapping: '@ows_Created',
		persist: false, 
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'Author',
		mapping: '@ows_Author',
		persist: false
	}, {
		name: 'UpdateValue',
        mapping: '@ows_Title',
        persist: false,
        convert: function (value, record) {
            var updateValue = record.get('ID') + ';#' + value;
            return updateValue;
        }
	}, {
		name: 'WorkflowInstance',
		mapping: '@ows_WorkflowInstance'
	}, {
		name: 'WorkflowInstance_ID',
		mapping: '@ows_WorkflowInstance',
		persist: false,
		convert: function (value, record) {
			var updateValue = value.split(';#');
			return updateValue[0];		
		}
	}, {
		name: 'WorkflowInstance_Title',
		mapping: '@ows_WorkflowInstance',
		persist: false,
		convert: function (value, record) {
			var updateValue = value.split(';#');
			return updateValue[1];		
		}
	}],
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'Requests'
		}
	},
	associations: [{
		type: 'hasMany',
		model: 'Custom.model.RiskAnalysis',
		name: 'getRiskAnalysis',
		primaryKey: 'ID',
		foreignKey: 'Request_ID',
		storeConfig: {
			autoSync: true
		},
		autoLoad: false
	}, {
		type: 'hasMany',
		model: 'Custom.model.FacilityRequirement',
		name: 'getFacilityRequirements',
		primaryKey: 'ID',
		foreignKey: 'Request_ID',
		storeConfig: {
			autoSync: true
		},
		autoLoad: false
	}, {
		type: 'hasMany',
		model: 'Custom.model.Authorization',
		name: 'getAuthorizations',
		primaryKey: 'ID',
		foreignKey: 'Request_ID',
		storeConfig: {
			autoSync: true
		},
		autoLoad: false
	}, {
		type: 'hasMany',
		model: 'Custom.model.RiskResponse',
		name: 'getRiskResponses',
		primaryKey: 'ID',
		foreignKey: 'Request_ID',
		storeConfig: {
			autoSync: true
		},
		autoLoad: false
	}, {
		type: 'hasMany',
		model: 'Custom.model.DirectorateEstimate',
		name: 'getResourceEstimates',
		primaryKey: 'ID',
		foreignKey: 'Request_ID',
		storeConfig: {
			autoSync: true,
			groupField: 'FY'
		},
		autoLoad: false
	}, {
		type: 'hasMany',
		model: 'Custom.model.Funding',
		name: 'getFunding',
		primaryKey: 'ID',
		foreignKey: 'Request_ID',
		storeConfig: {
			autoSync: true,
			groupField: 'FundingType'
		},
		autoLoad: false
	}]
});