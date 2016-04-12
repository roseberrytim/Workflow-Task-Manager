Ext.define('Task.controller.Main', {
    extend: 'Ext.app.Controller',
	views: ['Viewport'],	
	requires: ['Ext.form.Panel'],
	init: function () {
        var me = this;
		me.listen({			
			controller: {
				'*': {
					'applicationready': 'onApplicationReady'					
				}
			},
			component: {
				'viewport': {
					afterrender: 'onViewportRender'
				}
			}
		});
		me.getUserGroupInfo();
    },
	/**
     * @private
     * Configure applications global user configuration items.  Setup which roles users is in and also configure
     * what type of user the current user is. After configuration of user items is done finally create the application's
     * main viewport
     */
    getUserGroupInfo: function () {
        // Populate AppGlobal Current User Information
       Sharepoint.data.WebServices.getUserCollectionFromSite(this, function (options, success, userResponse) {
            var config = Task.config.Globals,
				users = userResponse.responseXML.getElementsByTagName('User');
            Ext.each(users, function (user) {
                if (user.getAttribute('ID') === config.currentUserID) {
                    config.currentUser = user.getAttribute('LoginName');
                    config.currentUserDisplayName = user.getAttribute('Name');
                    config.currentUserUpdateValue = config.currentUserID + ';#' + config.currentUser;
                    return false;
                }
            });
			// Get current user's Group/Role membership
            Sharepoint.data.WebServices.getGroupCollectionFromUser(config.currentUser, this, function (options, success, roleResponse) {
                var groups = roleResponse.responseXML.getElementsByTagName('Group');
                Ext.each(groups, function (group) {
                    var groupName = group.getAttribute('Name'),
                        description = group.getAttribute('Description');
                    if (description === config.roleDescription) {
                        config.hasActiveRole = true;
						if (groupName === config.adminGroupName) {
                            config.isAdmin = true;
                        }
                        config.currentUserRoles.push(groupName);
                    }
                });				
				Ext.Loader.require('Custom.Manager', function () {
					this.getApplication().fireEvent('applicationready');
				}, this);
            });
        });
    },
	/**
     * Event handler notifies that Application Setup is Complete.
	 * Create the Viewport
     */
	onApplicationReady: function () {
		var config = Task.config.Globals,
			hasRole = config.hasActiveRole;
		
		Ext.create('Task.view.Viewport', {
			hasRole: hasRole
		});
	},
	/**
     * Render event handler for the Viewport of the application.
	 * Removes Application Loading Masks
     */
	onViewportRender: function () {
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({
            remove: true
        });
	}
});
