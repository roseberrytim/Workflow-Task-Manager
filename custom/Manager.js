Ext.define('Custom.Manager', {
	singleton: true,	
	requires: [		
		'Custom.model.Request',
		'Custom.model.RiskAnalysis',
		'Custom.model.Authorization',
		'Custom.model.FacilityRequirement',
		'Custom.model.DirectorateEstimate',
		'Custom.model.Funding',
		'Custom.model.RiskResponse',
		'Custom.model.Directorate',
		'Custom.model.Location',
		'Custom.store.Requests',
		'Custom.store.Directorates',
		'Custom.store.Locations',
		'Custom.activity.Authorizations',
		'Custom.activity.CreateCOA',
		'Custom.activity.Facilities',
		'Custom.activity.FundingVerification',
		'Custom.activity.RiskAnalysis',
		'Custom.activity.DirectorateAnalysis',
		'Custom.extension.StatusAlert',
		'Custom.extension.ProcessPowerpoint',
		'Custom.extension.OpenXMLDocument',
		'Custom.meta.Requests',
		'Custom.delegate.DirectorateReview',
		'Custom.delegate.FunctionalAuthorizationReview'
	]  
 });