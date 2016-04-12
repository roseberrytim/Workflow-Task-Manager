Ext.define('Task.config.Globals', {
	singleton: true,
	
	title: 'Workflow Task Manager',
	version: '1.0',
	baseUrl: window.location.protocol + '//' + window.location.host + L_Menu_BaseUrl,
	detailsLibrary: 'SupportingDocuments',
	appPath: 'app/TaskManager.aspx',
	resourceGroupId: 0,
	viewsCollection: {},
	currentUserID: _spUserId.toString(),
    currentUser: '',
    currentUserDisplayName: '',
	currentUserUpdateValue: '',
    currentUserRoles: [],
	roleDescription: 'SRM Application Role',
	applicationUserGroup: 'SRM Users',
    applicationAdmin: 'Application Administrator',
	adminGroupName: 'Application Administrator',    
    isAdmin: false,
    hasActiveRole: false,
    isUser: true,
	overrides: {
		/**
		 * Override: core.js
		 * Method: StsOpenEnsureEx
		 * Version: SharePoint 2007
		 * Original Line Number: 1613
		 * Purpose: Original function impelemented conditional compilation functions that are no longer supported
		 * 		in IE11 standards mode.  While the original function works fine through compatibility mode the ExtJs
		 *		application is forced rendered to IE11 native standards mode and Microsoft dropped support for conditional 
		 *		compilation with IE11.  Since the application is running inside SP 2007 we can assume that office is installed
		 *		with the correct ActiveX Component used to open documents in native compatible office application. Since ActiveX
		 *		components only work with IE we check if the client browser is IE in order to assign the control. If not then return null
		 */ 
		StsOpenEnsureEx: {
			override: false, // Disabled - Ended up moving doctype to emulate IE10
			fn: function (szProgId) {
				if (v_stsOpenDoc==null || v_strStsOpenDoc !=szProgId) {
					if (Ext.isIE) {
						try {
							v_stsOpenDoc = new ActiveXObject(szProgId);
							v_strStsOpenDoc = szProgId;
						} catch (e){
							v_stsOpenDoc = null;
							v_strStsOpenDoc = null;
						}
					}
				}
				return v_stsOpenDoc;
			}
		}
	}
});