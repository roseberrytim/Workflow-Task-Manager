Ext.define('Custom.activity.DirectorateAnalysis', {
	extend: 'Ext.form.Panel',
	alias: 'widget.directorateanalysis',
	
	config: {
		workflowInstance: null,
		detailRecord: null,
		activityParameters: {},		
		estimateStore: null,
		description: ''		
	},
	
	
	initComponent: function () {
		var me = this,
			detailRecord = me.getDetailRecord(),
			wfi = me.getWorkflowInstance(),
			wfTitle = wfi.get('Title'),
			id = detailRecord.get('ID'),			
			params = me.getActivityParameters(),
			title = me.title || '',
			description = me.getDescription(),
			functionalName = '';
				
		me.estimateStore = detailRecord.getResourceEstimates();
		me.facilitiesStore = detailRecord.getFacilityRequirements();
		
		me.facilities = me.buildFacilitiesPanel();
		me.facilities.loadRecord(detailRecord);
		
		me.facilitiesStore.load();
		me.estimateStore.load();
		
		Ext.apply(me, {			
			autoScroll: true,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'component',			
				html: '<div class="action-description-header"><h1>' + title + '</h1><p>' + description + '</p></div>'				
			}, {
				xtype: 'container',
				margin: '0 0 10 0',
				layout: 'hbox',
				items: [{
					xtype: 'uploadbutton',
					itemId: 'uploadButton',
					store: 'WorkflowInstancesLibrary',
					instance: wfTitle
				}, {
					xtype: 'displayfield',
					margin: '5 0 0 5',
					value: '<b>Upload documentation used to perform analysis</b>'
				}]
			}, {
				xtype: 'tabpanel',				
				plain: true,								
				flex: 1,
				activeTab: 0,				
				defaults:{
					bodyPadding: 5,
					autoScroll: true
				},
				items: [{					
					xtype: 'panel',
					title: 'Details',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [{
						xtype: 'toolbar',
						items: [{
							xtype: 'button',					
							text: 'Add Resource Adjustment',				
							scale: 'medium',
							scope: this,
							handler: this.onAddAdjustmentButtonClick
						}]
					},  {
						xtype: 'gridpanel',						
						autoScroll: true,
						flex: 1,
						itemId: 'divisionEstimateGrid',
						title: 'Division Manpower Resources Estimate',						
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
					}, {
						xtype: 'gridpanel',						
						autoScroll: true,
						flex: 1,
						itemId: 'directorateEstimateGrid',
						title: 'Internal Resources Source Estimate',						
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
									dataIndex: 'DirCivPM'
								}, {
									header: 'FM',							
									dataIndex: 'DirCivFM'							
								},  {
									header: 'EN',
									dataIndex: 'DirCivEN'
								},  {
									header: 'PK',
									dataIndex: 'DirCivPK'
								},  {
									header: 'LG',							
									dataIndex: 'DirCivLG'
								},  {
									header: 'TE',							
									dataIndex: 'DirCivTE'
								}, {
									header: 'COS',							
									dataIndex: 'DirCivCOS'
								}, {
									header: 'Intel',							
									dataIndex: 'DirCivIntel'
								},  {
									header: 'NFA',							
									dataIndex: 'DirCivNFE'
								}]
							}, {
								text: 'Officer',
								columns: [{
									header: 'PM',
									width: 50,
									dataIndex: 'DirOffPM',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'FM',
									width: 50,
									dataIndex: 'DirOffFM',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'EN',
									width: 50,
									dataIndex: 'DirOffEN',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'PK',
									width: 50,
									dataIndex: 'DirOffPK',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'LG',
									width: 50,
									dataIndex: 'DirOffLG',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'TE',
									width: 50,
									dataIndex: 'DirOffTE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'COS',
									width: 50,
									dataIndex: 'DirOffCOS',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'Intel',
									width: 50,
									dataIndex: 'DirOffIntel',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'NFA',
									width: 50,
									dataIndex: 'DirOffNFE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}]
							}, {
								text: 'Enlisted',
								columns: [{
									header: 'PM',
									width: 50,
									dataIndex: 'DirEnlPM',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'FM',
									width: 50,
									dataIndex: 'DirEnlFM',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'EN',
									width: 50,
									dataIndex: 'DirEnlEN',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'PK',
									width: 50,
									dataIndex: 'DirEnlPK',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'LG',
									width: 50,
									dataIndex: 'DirEnlLG',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'TE',
									width: 50,
									dataIndex: 'DirEnlTE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'COS',
									width: 50,
									dataIndex: 'DirEnlCOS',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'Intel',
									width: 50,
									dataIndex: 'DirEnlIntel',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'NFA',
									width: 50,
									dataIndex: 'DirEnlNFE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}]
							}]
						},{
							text: 'CMEs',
							columns: [{
								header: 'PM',
								width: 50,
								dataIndex: 'DirCME_PM',
								xtype: 'numbercolumn', 
								format:'0.00'
							}, {
								header: 'FM',
								width: 50,
								dataIndex: 'DirCME_FM',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'EN',
								width: 50,
								dataIndex: 'DirCME_EN',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'PK',
								width: 50,
								dataIndex: 'DirCME_PK',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'LG',
								width: 50,
								dataIndex: 'DirCME_LG',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'TE',
								width: 50,
								dataIndex: 'DirCME_TE',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'COS',
								width: 50,
								dataIndex: 'DirCME_COS',
								xtype: 'numbercolumn', 
								format:'0.00'
							}, {
								header: 'Intel',
								width: 50,
								dataIndex: 'DirCME_Intel',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'NFA',
								width: 50,
								dataIndex: 'DirCME_NFE',
								xtype: 'numbercolumn', 
								format:'0.00'
							}]
						}]
					}, {
						xtype: 'gridpanel',						
						autoScroll: true,
						flex: 1,
						itemId: 'extneralEstimateGrid',
						title: 'External Resources Source Estimate',						
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
									dataIndex: 'ExtCivPM'
								}, {
									header: 'FM',							
									dataIndex: 'ExtCivFM'							
								},  {
									header: 'EN',
									dataIndex: 'ExtCivEN'
								},  {
									header: 'PK',
									dataIndex: 'ExtCivPK'
								},  {
									header: 'LG',							
									dataIndex: 'ExtCivLG'
								},  {
									header: 'TE',							
									dataIndex: 'ExtCivTE'
								}, {
									header: 'COS',							
									dataIndex: 'ExtCivCOS'
								}, {
									header: 'Intel',							
									dataIndex: 'ExtCivIntel'
								},  {
									header: 'NFA',							
									dataIndex: 'ExtCivNFE'
								}]
							}, {
								text: 'Officer',
								columns: [{
									header: 'PM',
									width: 50,
									dataIndex: 'ExtOffPM',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'FM',
									width: 50,
									dataIndex: 'ExtOffFM',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'EN',
									width: 50,
									dataIndex: 'ExtOffEN',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'PK',
									width: 50,
									dataIndex: 'ExtOffPK',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'LG',
									width: 50,
									dataIndex: 'ExtOffLG',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'TE',
									width: 50,
									dataIndex: 'ExtOffTE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'COS',
									width: 50,
									dataIndex: 'ExtOffCOS',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'Intel',
									width: 50,
									dataIndex: 'ExtOffIntel',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'NFA',
									width: 50,
									dataIndex: 'ExtOffNFE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}]
							}, {
								text: 'Enlisted',
								columns: [{
									header: 'PM',
									width: 50,
									dataIndex: 'ExtEnlPM',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'FM',
									width: 50,
									dataIndex: 'ExtEnlFM',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'EN',
									width: 50,
									dataIndex: 'ExtEnlEN',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'PK',
									width: 50,
									dataIndex: 'ExtEnlPK',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'LG',
									width: 50,
									dataIndex: 'ExtEnlLG',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'TE',
									width: 50,
									dataIndex: 'ExtEnlTE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'COS',
									width: 50,
									dataIndex: 'ExtEnlCOS',
									xtype: 'numbercolumn', 
									format:'0.00'
								}, {
									header: 'Intel',
									width: 50,
									dataIndex: 'ExtEnlIntel',
									xtype: 'numbercolumn', 
									format:'0.00'
								},  {
									header: 'NFA',
									width: 50,
									dataIndex: 'ExtEnlNFE',
									xtype: 'numbercolumn', 
									format:'0.00'
								}]
							}]
						},{
							text: 'CMEs',
							columns: [{
								header: 'PM',
								width: 50,
								dataIndex: 'ExtCME_PM',
								xtype: 'numbercolumn', 
								format:'0.00'
							}, {
								header: 'FM',
								width: 50,
								dataIndex: 'ExtCME_FM',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'EN',
								width: 50,
								dataIndex: 'ExtCME_EN',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'PK',
								width: 50,
								dataIndex: 'ExtCME_PK',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'LG',
								width: 50,
								dataIndex: 'ExtCME_LG',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'TE',
								width: 50,
								dataIndex: 'ExtCME_TE',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'COS',
								width: 50,
								dataIndex: 'ExtCME_COS',
								xtype: 'numbercolumn', 
								format:'0.00'
							}, {
								header: 'Intel',
								width: 50,
								dataIndex: 'ExtCME_Intel',
								xtype: 'numbercolumn', 
								format:'0.00'
							},  {
								header: 'NFA',
								width: 50,
								dataIndex: 'ExtCME_NFE',
								xtype: 'numbercolumn', 
								format:'0.00'
							}]
						}]
					}]
				}, me.facilities]
			}]		
		});
		
		me.callParent();
	},
	buildFacilitiesPanel: function () {
		return Ext.create('Ext.form.Panel', {				
			title: 'Facility Estimates',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			autoScroll: true,
			bodyStyle: 'border-width: 0px !important;',			
			items: [{
				xtype: 'fieldcontainer',						
				layout: 'anchor',
				flex: 1,
				defaults: {
					anchor: '100%',
					xtype: 'displayfield',		
					labelWidth: 200
				},
				items: [{
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
							header: 'Adjusted Seats Required',
							dataIndex: 'AdjustedSeats',
							flex: 1
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
				}]
			}]
		});
	},
	
	onAddAdjustmentButtonClick: function () {
		
	},
	
	
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
			}, {
				name: 'AdjustedSeats',
				fieldLabel: 'Adjusted Seats Required <br> (Based upon identified manpower estimate requirement)',				
				labelWidth: '100%',
				allowBlank: false,
				regex: /^\d+(\.(0|00|25|5|50|75))?$/,						
				regexText: 'Value can only contain whole numbers and quarter decimal values (.25, .5, .75)'
			}, {
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
		return true;
		/*
			if function cannot complete all activty and return true in a syncronous way then return false and then
			process all needed activity and then use the workflowManager context to reinvoke the transition of the task 
			
			workflowManager.processWorkflowTransition(nodeId, action);
		*/
	}

});