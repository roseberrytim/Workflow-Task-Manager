Ext.define('Task.controller.Users', {
    extend: 'Ext.app.Controller',
    models: ['User', 'AvailableRole', 'Group'],
    stores: ['Users', 'AvailableRoles', 'Groups'],
    views: ['configure.Users'],
    refs: [
		{ref: 'usersPanel', selector: 'userspanel'}, 
		{ref: 'userGrid', selector: 'userspanel #userGrid'}, 
		{ref: 'availableGrid', selector: 'userspanel #availableGrid'}, 
		{ref: 'selectedGrid', selector: 'userspanel #selectedGrid'}
	],
    init: function () {
        var me = this;
		me.listen({
			store: {
				'#Groups': {
					load: 'onSelectStoreLoad',
					add: 'modifyUserRole',
					remove: 'modifyUserRole'
				},
				'#AvailableRoles': {
					load: 'onAvailableStoreLoad'
				}
			},
			component: {
				'userspanel': {
					render: 'onUsersPanelRender',
					beforedestroy: 'onUsersPanelBeforeDestory'
				},
				'userspanel #refresh': {
					click: 'onRefreshToolClick'
				},
				'userspanel #userGrid': {
					selectionchange: 'onUserSelectionChange'
				}
			}
        });
    },
    /**
     * Called automatically when the Users Panel has completely rendered. This will initiate the load of the Users Grid Store
     */
    onUsersPanelRender: function () {
        var config = Task.config.Globals;
		// Load Users store on Panel render
        this.getUsersStore().load();
		/*
		this.getUsersStore().load({
			params: {
				groupName: config.applicationUserGroup
			}
		});
		*/
    },
    /**
     * Called automatically when the Users Panel is about to be destroyed. This will reset the roles stores
     */
    onUsersPanelBeforeDestory: function () {
        // Reset both role stores
        this.resetRolesStores(false);
    },
    /**
     * Event handler that is called whenever a new User is selected from the Users Grid
     * Based off the user selected the Selected Roles Grid's store will reconfigure its proxy to pass the selected user's LoginName as the
     * parameter to the SP WebService method GetGroupCollectionFromUser and load the store
     *
     * @param {Ext.selection.Model} selModel The selection model of the Users Grid
     * @param {Ext.data.Model []} records The record of the selected User
     */
    onUserSelectionChange: function (selModel, records) {
        // If user has selected a record then perform action else do nothing
        if (records.length > 0) {
            // Get selected user's loginName
            var userLoginName = records[0].get('LoginName'),
                selectStore = this.getGroupsStore();
			/*	
                selectStoreProxy = selectStore.getProxy();
            // Set the SelectedRoleGrid's store's proxy with the updated xml packet query's for the selected user
            selectStoreProxy.xmlData = Ext.ux.sharepoint.WebServices.buildSOAPPacket({
                'userLoginName': userLoginName
            }, 'GetGroupCollectionFromUser', 'http://schemas.microsoft.com/sharepoint/soap/directory/');
            */
			selectStore.load({
				params: {
					'userLoginName': userLoginName
				}
			});
        } else {
			this.resetRolesStores(true);
		}
    },
    /**
     * Event handler that is called whenever the Selected Role's store(Groups) is loaded
     * Because the SP WebService will return all SP Groups including those not part of the related Application Roles we will filter out the
     * the return result based off Description of the group
     *
     * @param {Ext.data.Store} store The Selected Role's store(Groups)
     * @param {Ext.data.Model []} records The retrieve records from the load request
     * @param {boolean} successful If load request was successful
     */
    onSelectStoreLoad: function (store, records, successful) {
        var config = Task.config.Globals;
		// Remove any SP Groups from the store that are not part of the application's role config
        store.filter('Description', config.roleDescription);
        this.getAvailableRolesStore().load();
    },
    /**
     * Event handler that is called whenever the Available Role's store(AvailableRoles) is loaded
     * Call will intially return all the Roles that are configured as part of the application.
     * Based on those roles we need to check if user is already a member of that Role and if so remove that record
     * from the Available Role's store's list of records
     *
     * @param {Ext.data.Store} store The Available Role's store(AvailableRoles)
     * @param {Ext.data.Model []} records The retrieve records from the load request
     * @param {boolean} successful If load request was successful
     */
    onAvailableStoreLoad: function (store, records, successful) {
        // Check every record that was returned for a matching Selected Role for the User
        Ext.each(records, function (record) {
            var role = record.get('Name'),
                selectedRolesStore = this.getGroupsStore(),
                match = selectedRolesStore.find('Name', role);
            // If role is already in the selected list then remove it from the available list else do nothing
            if (match !== -1) {
                // Remove the current record form the available store because it is already selected
                store.remove(record);
            }
        }, this);
    },
    /**
     * Event handler called by the Selected Role's Store on the 'add' and 'remove' events.
     * Based on the event the user will either be removed or added to the SP Group that represents the Application Role.
     *
     * @param {Ext.data.Store} store The Selected Role Grid's store(Groups)
     * @param {Ext.data.Model/Ext.data.Model []} records The record or an Array of records that were removed/added from the store
     */
    modifyUserRole: function (store, records) {
        // Get reference to the selected user from the Users Grid
        var user = this.getUserGrid().getSelectionModel().getSelection()[0],
            // Get selected user's LoginName
            loginName = user.get('LoginName');
        // If the passed 'records' argument is not an Array then the event triggered is the 'remove' event from the Selected Roles Store else it is the 'add' event
        if (!Ext.isArray(records)) {
            // Call SharePoint RemoveUserFromGroup method to remove user from selected role's Sharepoint Group
            Sharepoint.data.WebServices.removeUserFromGroup(records.get('Name'), loginName, this, Ext.emptyFn);
        } else {
            // Because the passed 'records' argument is an Array then call the SP WebService for each role to add the selected User to the Role
            Ext.each(records, function (record) {
                // Call SharePoint AddUserToGroup method to add user to the selected role's SharePoint Group
                Sharepoint.data.WebServices.addUserToGroup(record.get('Name'), '', loginName, '', '', this, Ext.emptyFn);
            });
        }
    },
    /**
     * Event handler that will be called when the user clicks on the refresh tool button on the panel
     * This will remove all records from the Seleected/Available roles grids and reload the Users store
     */
    onRefreshToolClick: function () {
        // Reset both role stores and call re-load on user store
        this.resetRolesStores(true);
    },
    /**
     * Helper function to reset the Roles stores
     *
     * @param {Boolean} reloadUserStore True to call load method on Main Users store upon reset
     */
    resetRolesStores: function (reloadUserStore) {
        var selectedStore = this.getGroupsStore(),
            availableStore = this.getAvailableRolesStore();
        // Reset the Selected Roles store's proxy xmlData back to an empty string
        //selectedStore.getProxy().xmlData = '';
        // Remove all existing records from the Selected Roles and Available Roles stores
        selectedStore.removeAll();
        availableStore.removeAll();
        // If reloadUserStore parameter is true then reload User store else do nothing
        if (reloadUserStore) {
            this.getUsersStore().load();
        }
    }
});