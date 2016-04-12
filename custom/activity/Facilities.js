Ext.define('Custom.activity.Facilities', {
	extend: 'Ext.form.Panel',
	alias: 'widget.facilities',
	
	config: {
		description: ''	,
		workflowInstance: null,
		detailRecord: null,
		activityParameters: {},
		facilitiesStore: null		
	},
	
	initComponent: function () {
		var detailRecord = this.getDetailRecord(),
			id = detailRecord.get('ID'),
			updateValue = detailRecord.get('UpdateValue'),
			params = this.getActivityParameters(),
			title = this.title || '',
			description = this.getDescription();
		
		this.facilitiesStore = detailRecord.getFacilityRequirements();
		
		Ext.apply(this, {			
			autoScroll: true,
			bodyPadding: 5,
			defaultType: 'textfield',		
			items: [{
				xtype: 'component',			
				html: '<div class="action-description-header"><h1>' + title + '</h1><p>' + description + '</p></div>'				
			}, {
				xtype: 'checkbox',
				name: 'Fac_Required',
				inputValue: '1',
				uncheckedValue: '0',
				boxLabel: 'Additional Facilities Required?',
				hideLabel: true,
				checked: false,				
				margin: '0 0 10 0',
				scope: this,
				handler: this.onFacilityRequiredChecked
			},  {				
                xtype: 'fieldset',
				itemId: 'facilityFields',
                layout: 'anchor',
				border: false,
				defaultType: 'textfield',
				hidden: true,
				defaults: {
					anchor: '50%'
				},
				items: [{
					name: 'Fac_OfficeSymbol',					
					fieldLabel: 'OfficeSymbol'
				}, {
					name: 'Fac_POC',					
					fieldLabel: 'POC'
				}, {
					name: 'Fac_POCPhone',					
					fieldLabel: 'POC Phone'
				}, {
					xtype: 'datefield',					
					name: 'Fac_NeedBy',
					fieldLabel: 'Need By',
					submitFormat: 'Y-m-d H:i:s'
				}, {
					xtype: 'htmleditor',					
					name: 'Fac_Justification',					
					fieldLabel: 'Justification'
				}, {
					xtype: 'grid',
					title: 'Location Facility Requirements',					
					store: this.facilitiesStore,
					tbar: [{
						text: 'Add',
						scope: this,
						handler: function () {
							this.addNewFacilityLocation(updateValue)
						}
					}],
					columnLines: true,
					columns: [{
						header: 'Location',
						flex: 1,
						dataIndex: 'Location',
						renderer: 'splookup'
					}, {
						header: 'Seats Required',
						flex: 1,
						dataIndex: 'Seats'
					}, {
						xtype: 'booleancolumn',
						header: 'Additional Space Requirement',
						dataIndex: 'AddSpaceReq',
						flex: 1,
						trueText: 'Yes',
						falseText: 'No',
						defaultRenderer: function (value){
							if (value === undefined) {
								return '&#160;';
							}
							
							if (!value || value === 'false' || value === '0') {
								return this.falseText;
							}
							return this.trueText;
						}
					}, {
						xtype: 'actioncolumn',
						header: '',
						width: 50,
						items: [{
							icon: 'resources/images/edit.png',
							tooltip: 'Edit Record',
							scope: this,
							handler: function (grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								this.onEditRecordClick(rec, grid);
							}
						}, {
							icon: 'resources/images/close.png',
							tooltip: 'Remove Record',
							scope: this,
							handler: function (grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								this.onRemoveRecordClick(rec, grid);
							}
						}]
					}]
				}]
			}],
			listeners: {
				scope: this,
				afterrender: function () {
					var record = this.getDetailRecord();
					this.loadRecord(record)
				}
			}
		});
		
		this.callParent();
	},
	/**
     * Enables or disables the billing address fields according to whether the checkbox is checked.
     * In addition to disabling the fields, they are animated to a low opacity so they don't take
     * up visual attention.
     */
	onFacilityRequiredChecked: function (box, checked) {
	    var form = box.ownerCt,
			fieldSet = form.query('#facilityFields');
		fieldSet[0].setVisible(checked);
		if (checked) {
			this.facilitiesStore.load()
		}
	},
	addNewFacilityLocation: function (request) {
		this.showEditor(false);
	},	
	buildEditForm: function () {
		var updateValue = this.getDetailRecord().get('UpdateValue');
		return Ext.create('Ext.form.Panel', {		
			itemId: 'facilityForm',
			layout: 'anchor',
			bodyPadding: 10,
			defaultType: 'textfield',
			fieldDefaults: {
				labelAlign: 'top',
				anchor: '100%'
			},
			defaults: {				
				margins: '0 0 10 0'
			},
			items: [{
				xtype: 'combo',
				fieldLabel: 'Location',
				name: 'Location',									
				store: 'Locations',
				valueField: 'ID',
				displayField: 'Title',
				allowBlank: false
			}, {
				name: 'Seats',
				fieldLabel: 'Seats Required <br> (Based upon identified manpower estimate requirement)',				
				labelWidth: '100%',
				allowBlank: false,
				regex: /^\d+(\.(0|00|25|5|50|75))?$/,						
				regexText: 'Value can only contain whole numbers and quarter decimal values (.25, .5, .75)'
			},{
				xtype: 'combobox',
				name: 'AddSpaceReq',	
				labelWidth: '100%',				
				fieldLabel: "Additional Space Requirement<br>(e.g. conference room, training, lab, storage, etc.)",				
				queryMode: 'local',
				store: [['1', 'Yes'],['0', 'No']]
			}, {
				name: 'Request',
				hidden: true,
				value: updateValue
			}]
		});
	},
	showEditor: function (record) {
		var form = this.buildEditForm()
			editor = Ext.create('Ext.window.Window', {
				height: 400,
				width: 400,
				title: 'Facility Requirement',
				modal: true,			
				layout: 'fit',
				items: form,
				buttons: [{
					text: 'Cancel',				
					handler: function (btn) {
						btn.up('window').close();
					}
				}, {
					text: 'Save',
					scope: this,
					handler: this.onFacilitySave
				}]
			});
		if (record) {
			editor.down('form').loadRecord(record);
		}
		editor.show();
	},
	onFacilitySave: function (btn) {
		var win = btn.up('window'),
			form = win.down('form'),
			record = form.getRecord(),
			values;
		
		if (form.isValid()) {			
			if (record) {
				form.updateRecord(record);
			} else {
				values = form.getValues();
				this.facilitiesStore.add(values);
			}
			win.close();
		}
	},
	onNewButtonClick: function () {
		this.showEditor(false);
	},
	onEditRecordClick: function (record, grid) {
		this.showEditor(record);
	},
	onRemoveRecordClick: function (record, grid) {
		console.log('Remove Record');
	},
	processActivity: function (workflow, node, action) {		
		if (!this.isValid()) {
			return false;
		}
		
		var detailRecord = this.getDetailRecord(),
			values = this.getValues();
		
		Ext.apply(values, {
			'Fac_Milestone': '1'
		});
		
		detailRecord.set(values);
		// Add input values to workflow inputVarible scope in case workflow task has been delegated
		workflow.setInputVariable(values)				
		return true;
		/*
			if function cannot complete all activty and return true in a syncronous way then return false and then
			process all needed activity and then use the workflowManager context to reinvoke the transition of the task 
			
			workflowManager.processWorkflowTransition(nodeId, action);
		*/
	}
});