Ext.define('Task.controller.Roles', {
    extend: 'Ext.app.Controller',
    models: ['Role'],
    stores: ['Roles'],
    views: ['configure.Roles'],
    refs: [
		{ref: 'rolesPanel', selector: 'roles'}, 
		{ref: 'rolesWindow', selector: '#roleEditWindow'},
		{ref: 'rolesForm', selector: '#roleEditWindow form'},
		{ref: 'saveButton', selector: '#roleEditWindow button[action=Save]'}
	],
    init: function () {      	
		var me = this;
		me.listen({				
			store: {
				'#Roles': {
					add: 'onRoleAdd',
					update: 'onRoleUpdate',
					remove: 'onRoleRemove'
				}
			},
			component: {
				'roles': {
					render: 'onRolesPanelRender'
				},
				'roles button[action=New]': {
					click: 'onRoleNewEditClick'
				},
				'roles button[action=Edit]': {
					click: 'onRoleNewEditClick'
				},
				'roles button[action=Delete]': {
					click: 'onRoleDeleteClick'
				},
				'roles #refresh': {
					click: 'onRefreshToolClick'
				},
				'#roleEditWindow form': {
					validitychange: 'onFormValidityChange'
				},
				'#roleEditWindow button[action=Save]': {
					click: 'onSaveClick'
				},
				'#roleEditWindow button[action=Cancel]': {
					click: 'onCancelClick'
				}
			}
        });
    },
	onFormValidityChange: function (basicForm, valid) {
        if (valid) {
            this.getSaveButton().enable();
        } else {
            this.getSaveButton().disable();
        }
    },
    /**
     * Called automatically when the Users Panel has completely rendered. This will initiate the load of the Users Grid Store
     */
    onRolesPanelRender: function () {
        this.getRolesStore().load();
    },
    /**
     * The click event handler for New and Edit toolbar buttons
     *
     * @param {Ext.button.Button} event The button clicked
     */
	onRoleNewEditClick: function (button) {
		try {
		   // Get reference to current selected record
			var selectedRecord = this.getRolesPanel().getSelectionModel().getSelection()[0],
				win;
			
			if (!selectedRecord) {
				if (button.action === 'Edit') {
					throw "NoRecordToEdit";
				}
			}
				
			win = Ext.create('Ext.window.Window', {
				itemId: 'roleEditWindow',
				layout: 'fit',
				x: 400,
				y: 200,
				width: 600,
				autoHeight: true,
				resizable: false,
				constrain: true,
				modal: true,
				bodyStyle: {
					padding: '2 2 2 2'
				},
				items: [{				
					xtype: 'form',
					border: false,
					bodyPadding: '10 10 0 10',
					fieldDefaults: {
						labelWidth: 100,
						anchor: '100%'
					},
					items: [{
						xtype: 'textfield',
						name: 'Title',
						fieldLabel: 'Role Name',
						allowBlank: false
					}]
				}],
				buttons: [{
					text: 'Save',
					action: 'Save'					
				}, {
					text: 'Cancel',
					action: 'Cancel'
				}]
			});
			if (selectedRecord && button.action === 'Edit') {
				win.child('form').getForm().loadRecord(selectedRecord);
			}
			win.show();
		} catch (e) {
			Ext.MessageBox.alert('Error', 'Please select a record first and try your action again');
		}
    },
	/**
     * Event handler called when the Delete Button is clicked
     * This handles the Removing of Roles from the system
     *
     */
    onRoleDeleteClick: function () {
        try {
            var selectedRecord = this.getRolesPanel().getSelectionModel().getSelection();
            // If the user has selected a record to perform the action on then remove that record else display error
            if (!Ext.isEmpty(selectedRecord)) {
                // Remove the selected record
                this.getRolesStore().remove(selectedRecord);
            } else {
                // No record was selected so display error
                Ext.MessageBox.alert('Error', 'There is no record selected to perfrom operation on.');
            }
        } catch (e) {
            Ext.MessageBox.alert('Error', 'There was a problem removing the role from the system. <br><br>' + e.message);
        }
    },
	/**
     * Event handler called when the Save Button is clicked
     * This handles the saving of the New/Updated record
     *
     */
    onSaveClick: function (button) {
		try {
			var window = button.up('window'),
                form = window.child('form').getForm(),
                record = form.getRecord(),
                values;
            if (form.isValid()) {
				// If user is editing an active role then update that record else create a new role record
				if (record) {
					// Call update method on current loaded record in the form
					form.updateRecord(record);
				} else {
					// Get form's field values
					values = form.getValues();
					// Add the values as a new record to the role store
					this.getRolesStore().add(values);
				}
				window.close();
			}
        } catch (e) {
            Ext.MessageBox.alert('Error', 'There was a problem performing the selected operation. <br><br>' + e.message);
        }
    },
    /**
     * Event handler called when the Cancel Button is clicked
     *
     */
    onCancelClick: function (button) {
		// Close the currently opened new/edit action window
        button.up('window').close();
    },
    /**
     * Event handler that will be called when the user clicks on the refresh tool button on the panel
     * This will reload the Roles store
     */
    onRefreshToolClick: function () {
        // Reset the role panel
        this.getRolesStore().load();
    },
	/**
     * Event handler called by the store on the 'add' record event.
     * This will call the SP WebServices method 'AddGroup' to create a new SharePoint UserGroup that corresponds to the new role
     * added to the Roles List
     *
     * @param {Ext.data.Store} store The Roles store
     * @param {Ext.data.Model []} records The Array of records that were added to the store
     */
    onRoleAdd: function (store, records) {
		var me = this,
			config = Task.config.Globals,
			groupName = records[0].data.Title;
	   // Add new group to SharePoint using the added role's name
		Sharepoint.data.WebServices.addGroup(groupName, config.applicationAdmin, 'group', config.currentUser, config.roleDescription, this, function () {
			Sharepoint.data.WebServices.getGroupInfo(groupName, this, function (options, success, response) {
				var groups = response.responseXML.getElementsByTagName('Group'),
					name, id;
				if (groups[0]) {
					id = groups[0].getAttribute('ID');
					name = groups[0].getAttribute('Name');
					records[0].set('Group', id + ';#' + name);
				}
			});
		});
    },
    /**
     * Event handler called by the store on the 'update' record event.
     * This will call the SP WebServices method 'UpdateGroupInfo' to modify the existing UserGroup name to correspond with the 
     * new name of the Role modified
     *
     * @param {Ext.data.Store} store The Roles store
     * @param {Ext.data.Model []} record The record that was updated
     * @param {String} operation Then operation that occured on the record (edit, reject, commit)
     */
    onRoleUpdate: function (store, record, operation) {
        /**
         *	Because we are using the sync() method of the store it will fire a 'commit' operation and this will be detected as an 
         *	update which is not a true update in the way we need it so we will only rename the group role name if the update operation 
         *	was an 'edit' operation
         */
        if (operation === 'edit') {
            var config = Task.config.Globals;
			// Update an existing SharePoint group with a updated role's new name
            if (record.modified.Title) {
				Sharepoint.data.WebServices.updateGroupInfo(record.modified.Title, record.data.Title, config.applicationAdmin, 'group', config.roleDescription, this, Ext.emptyFn);
			}
        }
    },
    /**
     * Event handler called by the store on the 'remove' record event.
     * This will call the SP WebServices method 'RemoveGroup' to remove the existing UserGroup name that corresponds to the name
     * of the Role that was removed from the Roles List
     *
     * @param {Ext.data.Store} store The Roles store
     * @param {Ext.data.Model []} record The record that was removed
     */
    onRoleRemove: function (store, record) {
        // Remove an existing SharePoint group based off the removed role's name
        Sharepoint.data.WebServices.removeGroup(record.data.Title, this, Ext.emptyFn);
    }	
});