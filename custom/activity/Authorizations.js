Ext.define('Custom.activity.Authorizations', {
	extend: 'Ext.form.Panel',
	alias: 'widget.authorizations',
	
	config: {
		workflowInstance: null,
		detailRecord: null,
		activityParameters: {},
		authorizationStore: null,
		estimateStore: null,
		description: ''		
	},
	
	initComponent: function () {
		var detailRecord = this.getDetailRecord(),
			wfi = this.getWorkflowInstance(),
			wfTitle = wfi.get('Title'),
			id = detailRecord.get('ID'),			
			params = this.getActivityParameters(),
			title = this.title || '',
			description = this.getDescription();
		
		this.authorizationStore = detailRecord.getAuthorizations();
		this.authorizationStore.load();
		this.estimateStore = detailRecord.getResourceEstimates();
		this.estimateStore.load();
		
		Ext.apply(this, {			
			autoScroll: true,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'component',			
				html: '<div class="action-description-header"><h1>' + title + '</h1><p>' + description + '</p></div>'				
			}, {
				xtype: 'toolbar',
				items: [{
					xtype: 'button',					
					text: 'New',				
					scale: 'medium',
					scope: this,
					handler: this.onNewButtonClick
				}, {					
					xtype: 'uploadbutton',
					itemId: 'uploadButton',
					store: 'WorkflowInstancesLibrary',
					scale: 'medium',
					instance: wfTitle
				}]
			}, {
				xtype: 'grid',
				title: 'Validated Manpower Requirements',
				flex: 1,				
				itemId: 'authorizationsGrid',
				autoScroll: true,
				columnLines: true,
				store: this.authorizationStore,				
				columnLines: true,				
				columns: [{
					header: 'Fiscal Year',
					width: 100,
					resizable: false,
					sortable: true,
					dataIndex: 'FY'
				}, {
					header: 'Validated<br>Result',						
					sortable: true,
					resizable: false,
					width: 100,
					dataIndex: 'ASUResult'
				},   {
					text: 'Functional',
					defaults: {
						width: 50,
						resizable: false,
						sortable: true,
						xtype: 'numbercolumn',
						format: '0.00'
					},
					columns: [{
						header: 'PM',
						dataIndex: 'PM'
					}, {
						header: 'FM',
						dataIndex: 'FM'
					}, {
						header: 'EN',
						dataIndex: 'EN'
					}, {
						header: 'PK',
						dataIndex: 'PK'
					}, {
						header: 'LG',
						dataIndex: 'LG'
					}, {
						header: 'TE',
						dataIndex: 'TE'
					}, {
						header: 'COS',
						dataIndex: 'COS'
					}, {
						header: 'Intel',
						dataIndex: 'Intel'
					}, {
						header: 'NFA',
						dataIndex: 'NFE'
					}]
				}, {
					header: 'Current<br>Authorizations',
					width: 125,
					dataIndex: 'CurrentAuths'
				}, {
					header: 'Validation Method',
					width: 125,
					dataIndex: 'ValidationMethod'
				}, {
					header: 'Additional Info',
					flex: 1,
					dataIndex: 'AdditionalInfo'
				}, {
					xtype: 'actioncolumn',
					header: 'Actions',
					width: 100,
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
				}],
				listeners: [{
					scope: this,
					selectionchange: this.onAuthSelectionChange
				}]
			},
			
			/*{
				xtype: 'fieldset',
				title: 'Authorization Details',
				margin: '0 0 0 10',
				columnWidth: 0.50,
				layout: 'anchor',					
				itemId: 'authorizationForm',					
				defaultType: 'textfield',
				items: [{				
					name: 'FY',
					fieldLabel: 'FY'
				}, {               
					fieldLabel: 'Validated Result',
					name: 'ASUResult',						
					emptyText: 'Enter the Validated Result'
				}, {				
					fieldLabel: 'PM',						
					name: 'PM'	
				}, {
					fieldLabel: 'FM',
					name: 'FM'
				}, {				
					fieldLabel: 'EN',
					name: 'EN'
				}, {				
					fieldLabel: 'PK',
					name: 'PK'
				}, {				
					fieldLabel: 'LG',
					name: 'LG'
				}, {				
					fieldLabel: 'TE',
					name: 'TE'
				}, {				
					fieldLabel: 'Intel',
					name: 'Intel'
				}, {				
					fieldLabel: 'Non Functional Align',
					name: 'NFE'
				}, {						
					name: 'Request',
					hidden: true,
					value: updateValue
				}, {
					xtype: 'button',
					text: 'Save'
				}]
			}]
			},*/
			{
				xtype: 'gridpanel',
				autoScroll: true,
				itemId: 'directorateEstimateGrid',
				title: 'Directorate Manpower Requirement Estimate',
				flex: 1,
				store: this.estimateStore,
				columnLines: true,				
				columns: [{
					header: 'PEO/Directorate',						
					sortable: true,					
					width: 200,
					dataIndex: 'Directorate',
					renderer: 'splookup'				
				},  {
					header: 'Location',
					dataIndex: 'Location',
					sortable: true,					
					width: 150
				}, {
					header: 'Fiscal Year',
					width: 100,					
					sortable: true,
					dataIndex: 'FY'
				}, {
					text: 'Government/Military',
					columns: [{
						text: 'Civilian',
						defaults: {
							width: 50,
							xtype: 'numbercolumn',
							format: '0.00'
						},
						columns: [{
							header: 'PM',							
							dataIndex: 'CivPM'
						}, {
							header: 'FM',							
							dataIndex: 'CivFM'							
						},  {
							header: 'EN',
							dataIndex: 'CivEN'
						},  {
							header: 'PK',
							dataIndex: 'CivPK'
						},  {
							header: 'LG',							
							dataIndex: 'CivLG'
						},  {
							header: 'TE',							
							dataIndex: 'CivTE'
						}, {
							header: 'COS',							
							dataIndex: 'CivCOS'
						}, {
							header: 'Intel',							
							dataIndex: 'CivIntel'
						},  {
							header: 'NFA',							
							dataIndex: 'CivNFE'
						}]
					}, {
						text: 'Officer',
						columns: [{
							header: 'PM',
							width: 50,
							dataIndex: 'OffPM',
							xtype: 'numbercolumn', 
							format:'0.00'
						}, {
							header: 'FM',
							width: 50,
							dataIndex: 'OffFM',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'EN',
							width: 50,
							dataIndex: 'OffEN',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'PK',
							width: 50,
							dataIndex: 'OffPK',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'LG',
							width: 50,
							dataIndex: 'OffLG',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'TE',
							width: 50,
							dataIndex: 'OffTE',
							xtype: 'numbercolumn', 
							format:'0.00'
						}, {
							header: 'COS',
							width: 50,
							dataIndex: 'OffCOS',
							xtype: 'numbercolumn', 
							format:'0.00'
						}, {
							header: 'Intel',
							width: 50,
							dataIndex: 'OffIntel',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'NFA',
							width: 50,
							dataIndex: 'OffNFE',
							xtype: 'numbercolumn', 
							format:'0.00'
						}]
					}, {
						text: 'Enlisted',
						columns: [{
							header: 'PM',
							width: 50,
							dataIndex: 'EnlPM',
							xtype: 'numbercolumn', 
							format:'0.00'
						}, {
							header: 'FM',
							width: 50,
							dataIndex: 'EnlFM',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'EN',
							width: 50,
							dataIndex: 'EnlEN',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'PK',
							width: 50,
							dataIndex: 'EnlPK',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'LG',
							width: 50,
							dataIndex: 'EnlLG',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'TE',
							width: 50,
							dataIndex: 'EnlTE',
							xtype: 'numbercolumn', 
							format:'0.00'
						}, {
							header: 'COS',
							width: 50,
							dataIndex: 'EnlCOS',
							xtype: 'numbercolumn', 
							format:'0.00'
						}, {
							header: 'Intel',
							width: 50,
							dataIndex: 'EnlIntel',
							xtype: 'numbercolumn', 
							format:'0.00'
						},  {
							header: 'NFA',
							width: 50,
							dataIndex: 'EnlNFE',
							xtype: 'numbercolumn', 
							format:'0.00'
						}]
					}]
				},{
					text: 'CMEs',
					columns: [{
						header: 'PM',
						width: 50,
						dataIndex: 'CME_PM',
						xtype: 'numbercolumn', 
						format:'0.00'
					}, {
						header: 'FM',
						width: 50,
						dataIndex: 'CME_FM',
						xtype: 'numbercolumn', 
						format:'0.00'
					},  {
						header: 'EN',
						width: 50,
						dataIndex: 'CME_EN',
						xtype: 'numbercolumn', 
						format:'0.00'
					},  {
						header: 'PK',
						width: 50,
						dataIndex: 'CME_PK',
						xtype: 'numbercolumn', 
						format:'0.00'
					},  {
						header: 'LG',
						width: 50,
						dataIndex: 'CME_LG',
						xtype: 'numbercolumn', 
						format:'0.00'
					},  {
						header: 'TE',
						width: 50,
						dataIndex: 'CME_TE',
						xtype: 'numbercolumn', 
						format:'0.00'
					},  {
						header: 'COS',
						width: 50,
						dataIndex: 'CME_COS',
						xtype: 'numbercolumn', 
						format:'0.00'
					}, {
						header: 'Intel',
						width: 50,
						dataIndex: 'CME_Intel',
						xtype: 'numbercolumn', 
						format:'0.00'
					},  {
						header: 'NFA',
						width: 50,
						dataIndex: 'CME_NFE',
						xtype: 'numbercolumn', 
						format:'0.00'
					}]
				}]
			}
			/*
			{
				xtype: 'grid',
				itemId: 'directorateEstimateGrid',
				title: 'Directorate Estimates',
				flex: 1,
				store: this.estimateStore,
				columnLines: true,
				features: [{						
					ftype: 'grouping'						
				}],
				columns: [{
					header: 'Directorate',						
					sortable: true,
					resizable: false,
					width: 300,
					dataIndex: 'Directorate'
				}, {
					header: 'Fiscal Year',
					width: 125,
					resizable: false,
					sortable: true,
					dataIndex: 'FY'
				},  {
					text: 'Government/Military',
					columns: [{
						header: 'PM',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'PM'
					}, {
						header: 'FM',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'FM'
					},  {
						header: 'EN',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'EN'
					},  {
						header: 'PK',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'PK'
					},  {
						header: 'LG',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'LG'
					},  {
						header: 'TE',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'TE'
					},  {
						header: 'Intel',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'Intel'
					},  {
						header: 'NFE',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'NFE'
					}]
				},{
					text: 'CMEs',
					columns: [{
						header: 'PM',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_PM'
					}, {
						header: 'FM',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_FM'
					},  {
						header: 'EN',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_EN'
					},  {
						header: 'PK',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_PK'
					},  {
						header: 'LG',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_LG'
					},  {
						header: 'TE',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_TE'
					},  {
						header: 'Intel',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_Intel'
					},  {
						header: 'NFE',
						width: 50,
						resizable: false,
						sortable: true,
						dataIndex: 'CME_NFE'
					}]
				}]
			}
			*/
			]
		});
		
		this.callParent();
	},
	buildEditForm: function () {
		var updateValue = this.getDetailRecord().get('UpdateValue');
		return Ext.create('Ext.form.Panel', {		
			itemId: 'authorizationForm',
			layout: 'anchor',
			bodyPadding: 10,
			defaultType: 'textfield',
			fieldDefaults: {
				labelAlign: 'top',
				labelWidth: 100
			},
			defaults: {				
				margins: '0 0 10 0'
			},
			items: [{				
				name: 'FY',
				anchor: '25%',
				regex: /^(20)\d{2}$/,
				regexText: 'Must be a valid date between 2000 - 2099',
				fieldLabel: 'Fiscal Year'		
			}, {               
				name: 'ASUResult',
				fieldLabel: 'Validated Result',
				anchor: '25%'
			}, {
				xtype: 'fieldcontainer',																										
				fieldLabel: ' ',
				labelSeparator: '',
				layout: {
					type: 'hbox'						
				},
				defaultType: 'label',
				defaults: {
					width: 50,
					style: 'font-weight:bold',
					margin: '0 5 0 0'						
				},
				items: [{				
					text: 'PM'
				}, {
					text: 'FM'
				}, {				
					text: 'EN'
				}, {				
					text: 'PK'
				}, {				
					text: 'LG'
				}, {				
					text: 'TE'
				}, {
					text: 'COS'
				}, {				
					text: 'Intel'
				}, {				
					text: 'NFA'
				}]
			}, { 
				xtype: 'fieldcontainer',																									
				fieldLabel: ' ',
				labelSeparator: '',
				layout: {
					type: 'hbox'						
				},				
				defaultType: 'textfield',
				defaults: {
					width: 50,
					margin: '0 5 0 0',
					regex: /^\d+(\.(0|00|25|5|50|75))?$/,						
					regexText: 'Value can only contain whole numbers and quarter decimal values (.25, .5, .75)'
				},
				items: [{				
					name: 'PM'
				}, {
					name: 'FM'
				}, {				
					name: 'EN'
				}, {				
					name: 'PK'
				}, {				
					name: 'LG'
				}, {				
					name: 'TE'
				}, {
					name: 'COS'
				}, {				
					name: 'Intel'
				}, {				
					name: 'NFE'
				}]
			}, {
				name: 'CurrentAuths',
				anchor: '25%',
				fieldLabel: 'Current Authorizations'				
			}, {
				xtype: 'combo',
				name: 'ValidationMethod',				
				fieldLabel: 'Validation Method',
				anchor: '50%',
				queryMode: 'local',					
				store: [
					['Capability Based Manpower Standard', 'Capability Based Manpower Standard'],
					['Acquisition and Sustainment Units (ASU)', 'Acquisition and Sustainment Units (ASU)'],
					['Management Advisory Study', 'Management Advisory Study'],
					['Manpower Estimate Report', 'Manpower Estimate Report'],
					['Other', 'Other']					
				]
			}, {
				xtype: 'textarea',
				name: 'AdditionalInfo',
				anchor: '100%',
				fieldLabel: 'Additional Information'				
			}, {
				name: 'Request',
				hidden: true,
				value: updateValue
			}]
		});
	},
	showEditor: function (record) {
		var form = this.buildEditForm(),
			editor = Ext.create('Ext.window.Window', {
				height: 600,
				width: 600,
				title: 'Authorization',
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
					handler: this.onAuthorizationSave
				}]
			});
		if (record) {
			editor.down('form').loadRecord(record);
		}
		editor.show();
	},
	onAuthorizationSave: function (btn) {
		var win = btn.up('window'),
			form = win.down('form'),
			record = form.getRecord(),
			values;
		
		if (form.isValid()) {			
			if (record) {
				form.updateRecord(record);
			} else {
				values = form.getValues();
				this.authorizationStore.add(values);
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
	onAuthSelectionChange: function (model, records) {		
	},
	addNewAuthorization: function (button) {
		var form = this.down('#authorizationsGrid #authorizationForm'),
			values = form.getValues();
					
		this.authorizationStore.add(values);
		form.getForm().reset();	
	},
	processActivity: function (workflow, node, action) {		
		return true;
		/*
			if function cannot complete all activty and return true in a syncronous way then return false and then
			process all needed activity and then use the workflowManager context to reinvoke the transition of the task 
			
			workflowManager.processWorkflowTransition(nodeId, action);
		*/
	}
});