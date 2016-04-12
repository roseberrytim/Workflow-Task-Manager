Ext.define('Custom.meta.Requests', {
	extend: 'Ext.tab.Panel',
	requires: ['Custom.model.Request', 'Custom.store.Requests'],
	
	title: 'Details',
	flex: 2,
	plain: true,
	bodyPadding: 5,
	border: true,
	layout: 'fit',	
	config: {
		name: 'Requests',
		record: null,
		requirements: null,
		risks: null,
		estimates: null,
		funding: null
	},
	
	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	initComponent: function () {
		var me = this,
			request = this.getRecord(),
			id = request.get('ID'),
			facMilestone = request.get('Fac_Milestone'),
			risksStore, estimatesStore, facilitiesStore, items;
		
		estimatesStore = request.getResourceEstimates();
		fundingStore = request.getFunding();
		risksStore = request.getRiskResponses();
		
		me.requirements = me.buildRequirementsPanel();
		me.risks = me.buildRisksPanel();
		me.estimates = me.buildEstimatesPanel(estimatesStore);
		me.funding = me.buildFundingEstimatesPanel(fundingStore);
		
		me.requirements.loadRecord(request);
		estimatesStore.load({
			params: {
				query: '<Query><Where><Eq><FieldRef Name="Request" LookupId="TRUE" /><Value Type="Lookup">' + id + '</Value></Eq></Where></Query>'
			}
		});
		fundingStore.load({
			params: {
				query: '<Query><Where><Eq><FieldRef Name="Request" LookupId="TRUE" /><Value Type="Lookup">' + id + '</Value></Eq></Where></Query>'
			}
		});
		risksStore.load({
			scope: me,
			params: {
				query: '<Query><Where><Eq><FieldRef Name="Request" LookupId="TRUE" /><Value Type="Lookup">' + id + '</Value></Eq></Where></Query>'
			},
			callback: function (records) {
				if (records.length) {
					me.risks.loadRecord(records[0]);					
				}
			}
		});
		
		items = [me.requirements, me.risks, me.estimates, me.funding];
		
		
		if (facMilestone === '1') {
			facilitiesStore = request.getFacilityRequirements();
			me.facilities = me.buildFacilitiesPanel(facilitiesStore);
			facilitiesStore.load({
				params: {
					query: '<Query><Where><Eq><FieldRef Name="Request" LookupId="TRUE" /><Value Type="Lookup">' + id + '</Value></Eq></Where></Query>'
				}
			});
			me.facilities.loadRecord(request);
			items.push(me.facilities)
		}
		
		// Need to Do : add the authorizations information milestone flag check.
		
		
		Ext.apply(this, {
			itemId: 'taskDetails',
			items: items
		});
		
		this.callParent();
	},
	buildRequirementsPanel: function () {
		return Ext.create('Ext.form.Panel', {				
			flex: 1,
			title: 'Requirements',
			bodyStyle: 'border-width: 0px !important;',	
			layout: 'fit',			
			items: [{
				xtype: 'tabpanel',
				plain: true,				
				layout: 'fit',
				activeTab: 0,				
				defaults:{
					bodyPadding: 5,
					autoScroll: true
				},
				items: [{
					title: 'Details',
					layout: 'anchor',
					defaults: {
						xtype: 'displayfield',
						anchor: '100%',
						labelWidth: 200
					},			
					items: [{						
						fieldLabel: 'Title',
						name: 'Title'
					}, {						
						name: 'Description',						
						fieldLabel: 'Description of Requirement'
					}, {						
						name: 'NeedBy',
						fieldLabel: 'Date Resources Needed'						
					}]
				}, {					
					title: 'Justification',				
					layout: 'anchor',
					defaults: {
						xtype: 'displayfield',
						anchor: '100%',
						labelWidth: 200
						
					},
					items: [{
						name: 'DirectedAuthority',						
						fieldLabel: 'Directed Authority'						
					}, {						
						name: 'Justification',
						fieldLabel: 'Justification of Requirement'						
					}, {						
						name: 'ImpactNoFund',
						fieldLabel: 'Impact if not resourced'						
					}, {						
						name: 'Directorate',						
						fieldLabel: 'Recommended PEO/Directorate',
						renderer: Ext.util.Format.splookup
					}, {
						name: 'ImpactAnother',
						fieldLabel: 'Describe if new work impacts another PEO/Directorate'						
					}]				
				}, {					
					title: 'Program Info',				
					layout: 'anchor',
					defaults: {
						xtype: 'displayfield',
						anchor: '100%',
						labelWidth: 200						
					},
					items: [{						
						name: 'ACATLevel',						
						fieldLabel: 'ACAT Level'						
					}, {						
						name: 'Priority',
						fieldLabel: 'Urgency'
					}, {						
						name: 'WorkCategory',						
						fieldLabel: 'Work Category',
						renderer: Ext.util.Format.splookup
					}, {						
						name: 'IsWMLExist',
						fieldLabel: 'New request part of an existing WML Program?',
						renderer: Ext.util.Format.spyesno
					}, {
						name: 'Program',
						fieldLabel: 'WML Program Name'
					}]
				}, {				
					title: 'Contact Information',				
					layout: 'anchor',
					defaults: {
						xtype: 'displayfield',
						anchor: '100%',
						labelWidth: 200						
					},
					items: [{
						name: 'PrimaryPOC',
						fieldLabel: 'Primary POC Name'
					}, {
						name: 'PrimaryOffice',								
						fieldLabel: 'Primary POC Office'
					}, {
						name: 'PrimaryPhone',
						fieldLabel: 'Primary POC Phone'
					}, {
						name: 'SecondaryPOC',
						fieldLabel: 'Secondary POC Name'
					}, {
						name: 'SecondaryOffice',
						fieldLabel: 'Secondary POC Office'
					}, {
						name: 'SecondaryPhone',
						fieldLabel: 'Secondary POC Phone'
					}]
				}]
			}]
		});
	},
	_buildRequirementsPanel: function () {
		return Ext.create('Ext.form.Panel', {
			autoScroll: true,
			title: 'Requirements',
			bodyStyle: 'border-width: 0px !important;',				
			items: [{
				xtype:'fieldset',							
				title: 'Details',
				collapsible: true,
				defaultType: 'displayfield',
				defaults: {anchor: '100%', labelWidth: 200},
				layout: 'anchor',
				items :[{							
					fieldLabel: 'Title',
					name: 'Title'
				}, {
					fieldLabel: 'Description',
					name: 'Description'
				}, {
					name: 'NeedBy',
					fieldLabel: 'Request needed'
				}] 
			}, {						
				xtype:'fieldset',							
				title: 'Justification',
				collapsible: true,
				collapsed: true,
				defaultType: 'displayfield',
				defaults: {anchor: '100%', labelWidth: 200},
				layout: 'anchor',
				items :[{
					name: 'DirectedAuthority',
					fieldLabel: 'Directored Authority'
				}, {
					name: 'Source',
					fieldLabel: 'Source of Requirement'
				}, {
					name: 'Justification',
					fieldLabel: 'Justification of Requirement'
				}, {
					name: 'ImpactNoFund',
					fieldLabel: 'Impact if not funded'	
				}, {
					name: 'Directorate',
					fieldLabel: 'Recommended Directorate'
				}]
			}, {
				xtype:'fieldset',							
				title: 'Program Info',
				collapsible: true,
				collapsed: true,
				defaultType: 'displayfield',
				defaults: {anchor: '100%', labelWidth: 200},
				layout: 'anchor',
				items :[{
					name: 'ACATLevel',
					fieldLabel: 'ACAT Level'
				}, {
					name: 'Priority',
					fieldLabel: 'Priority'
				}, {
					name: 'WorkCategory',
					fieldLabel: 'Work Category'
				}, {
					name: 'Program',
					fieldLabel: 'Program of Record'
				}, {
					name: 'FMS',
					fieldLabel: 'FMS'
				}, {
					name: 'FMSPOLMIL',
					fieldLabel: 'FMS POL-MIL'
				}, {
					name: 'CrossCutter',
					fieldLabel: 'Cross Cutter Program'
				}]						
			}, {							
				xtype:'fieldset',							
				title: 'Contact Information',
				collapsible: true,
				collapsed: true,
				defaultType: 'displayfield',
				defaults: {anchor: '100%', labelWidth: 200},
				layout: 'anchor',
				items :[{
					name: 'PrimaryPOC',
					fieldLabel: 'Primary POC Name'
				}, {
					name: 'SecondaryPOC',								
					fieldLabel: 'Secondary POC Name'
				}, {
					name: 'Approver',
					fieldLabel: 'Approving Official (O-6 or Equivalent)'
				}, {
					name: 'ApproverOffice',
					fieldLabel: 'Approver Office Symbol'
				}, {
					name: 'ApproverSignature',
					fieldLabel: 'Approver Signature'
				}, {
					name: 'ApproverDate',
					fieldLabel: 'Approved Date'
				}]
			}]
		});
	},
	buildRisksPanel: function () {
		return Ext.create('Ext.form.Panel', {
			title: 'Risk Attributes',
			autoScroll: true,
			defaultType: 'displayfield',
			layout: 'anchor',
			bodyStyle: 'border-width: 0px !important;',	
			defaults: {
				anchor: '100%',
				labelWidth: 200
			},
			items: [{							
				fieldLabel: 'Core Function Support Plan (CFSP) Alignment',
				name: 'Core_x0020_Function_x0020_Suppor'
			}, {
				fieldLabel: 'Impact to Cost Effectiveness',
				name: 'Impact_x0020_to_x0020_Cost_x0020'
			}, {
				fieldLabel: 'ACAT Level',
				name: 'ACAT_x0020_Level'
			}, {
				fieldLabel: 'Directed Authority',
				name: 'Directed_x0020_Authority'
			}, {
				fieldLabel: 'Directed Authority (FMS)',
				name: 'Directed_x0020_Authority_x0020__'
			}, {
				fieldLabel: 'Joint Requirement',
				name: 'Joint_x0020_Requirement'
			}, {
				fieldLabel: 'Funding Realism',
				name: 'Funding_x0020_Realism'
			}, {
				fieldLabel: 'Schedule Risk',
				name: 'Schedule_x0020_Risk'
			}, {
				fieldLabel: 'Technology Maturity Level',
				name: 'Technology_x0020_Maturity_x0020_'
			}, {
				fieldLabel: 'Aquisition Process Maturity',
				name: 'Aquisition_x0020_Process_x0020_M'
			}, {
				fieldLabel: 'Work Force Health',
				name: 'Work_x0020_Force_x0020_Health'
			}, {
				fieldLabel: 'Contractor Relationship',
				name: 'Contractor_x0020_Relationship'
			}]
		});
	},
	buildFacilitiesPanel: function (store) {
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
				flex: 1,
				layout: 'anchor',				
				anchor: '100%',
				defaults: {
					anchor: '100%',
					xtype: 'displayfield',		
					labelWidth: 200
				},
				items: [{				
					name: 'Fac_Required',
					fieldLabel: 'Facilities Required',
					renderer: Ext.util.Format.spyesno
				}, {
					name: 'Fac_OfficeSymbol',					
					fieldLabel: 'OfficeSymbol'
				}, {
					name: 'Fac_POC',					
					fieldLabel: 'POC'
				}, {
					name: 'Fac_POCPhone',					
					fieldLabel: 'POC Phone'
				}, {				
					name: 'Fac_NeedBy',
					fieldLabel: 'Need By'		
				}, {				
					name: 'Fac_Justification',					
					fieldLabel: 'Justification'
				}]
			}, {
				xtype: 'grid',
				flex: 1,
				title: 'Location Facility Requirements',					
				store: store,
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
				}]			
			}]
		});
	},
	buildEstimatesPanel: function (store) {
		return Ext.create('Ext.grid.Panel', {
			title: 'Resource Estimates',
			store: store,
			autoScroll: true,
			features: [{
				id: 'group',
				ftype: 'groupingsummary',
				groupHeaderTpl: 'Fiscal Year: {name}',
				hideGroupedHeader: true,
				enableGroupingMenu: false
			}],			
			columns: [{
				header: 'PEO/Directorate',						
				sortable: true,					
				tdCls: 'summary',
				width: 200,
				dataIndex: 'Directorate',
				renderer: 'splookup',
				summaryType: 'count',
				summaryRenderer: function (value, summaryData, dataIndex) {
					return ((value === 0 || value > 1) ? 'Totals (' + value + ' Estimates)' : 'Totals (1 Estimate)');
				}					
			},  {
				header: 'Location',
				dataIndex: 'Location',
				sortable: true,					
				width: 150,
				renderer: 'splookup'
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
						width: 65,
						xtype: 'numbercolumn',
						tdCls: 'summary',
						format: '0.00',
						summaryType: 'sum',							
						summaryRenderer: Ext.util.Format.numberRenderer('0.00')
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
					defaults: {
						width: 65,
						xtype: 'numbercolumn',
						format: '0.00',
						tdCls: 'summary',
						summaryType: 'sum',							
						summaryRenderer: Ext.util.Format.numberRenderer('0.00')		
					},
					columns: [{
						header: 'PM',
						dataIndex: 'OffPM'							
					}, {
						header: 'FM',
						dataIndex: 'OffFM'							
					},  {
						header: 'EN',
						dataIndex: 'OffEN'							
					},  {
						header: 'PK',
						dataIndex: 'OffPK'							
					},  {
						header: 'LG',							
						dataIndex: 'OffLG'							
					},  {
						header: 'TE',							
						dataIndex: 'OffTE'						
					}, {
						header: 'COS',							
						dataIndex: 'OffCOS'					
					}, {
						header: 'Intel',							
						dataIndex: 'OffIntel'						
					},  {
						header: 'NFA',							
						dataIndex: 'OffNFE'					
					}]
				}, {
					text: 'Enlisted',
					defaults: {
						width: 65,
						xtype: 'numbercolumn',
						format: '0.00',
						tdCls: 'summary',
						summaryType: 'sum',							
						summaryRenderer: Ext.util.Format.numberRenderer('0.00')
					},
					columns: [{
						header: 'PM',							
						dataIndex: 'EnlPM'							
					}, {
						header: 'FM',							
						dataIndex: 'EnlFM'							
					},  {
						header: 'EN',							
						dataIndex: 'EnlEN'							
					},  {
						header: 'PK',							
						dataIndex: 'EnlPK'							
					},  {
						header: 'LG',							
						dataIndex: 'EnlLG'							
					},  {
						header: 'TE',							
						dataIndex: 'EnlTE'							
					}, {
						header: 'COS',							
						dataIndex: 'EnlCOS'							
					}, {
						header: 'Intel',							
						dataIndex: 'EnlIntel'							
					},  {
						header: 'NFA',							
						dataIndex: 'EnlNFE'							
					}]
				}]
			},{
				text: 'CMEs',
				defaults: {
					width: 65,
					xtype: 'numbercolumn',
					format: '0.00',
					tdCls: 'summary',
					summaryType: 'sum',							
					summaryRenderer: Ext.util.Format.numberRenderer('0.00')
				},
				columns: [{
					header: 'PM',						
					dataIndex: 'CME_PM'
				}, {
					header: 'FM',						
					dataIndex: 'CME_FM'						
				},  {
					header: 'EN',						
					dataIndex: 'CME_EN'						
				},  {
					header: 'PK',						
					dataIndex: 'CME_PK'						
				},  {
					header: 'LG',						
					dataIndex: 'CME_LG'						
				},  {
					header: 'TE',						
					dataIndex: 'CME_TE'						
				},  {
					header: 'COS',						
					dataIndex: 'CME_COS'						
				}, {
					header: 'Intel',						
					dataIndex: 'CME_Intel'
				},  {
					header: 'NFA',						
					dataIndex: 'CME_NFE'
				}]
			}]
		});
	},
	buildFundingEstimatesPanel: function (store) {
		return Ext.create('Ext.grid.Panel', {
			title: 'Funding Estimates',
			store: store,
			autoScroll: true,			
			columns: [{
				header: 'Funding Type',						
				sortable: true,					
				width: 200,
				dataIndex: 'FundingType'
			},  {
				header: 'Fiscal Year',
				width: 100,					
				sortable: true,
				dataIndex: 'FY'
			}, {
				header: 'Funding Amount',
				width: 200,
				sortable: true,
				dataIndex: 'FundingAmount',
				renderer: Ext.util.Format.usMoney
			}, {
				xtype: 'booleancolumn',
				header: 'Funded',
				dataIndex: 'Funded',
				width: 100,
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
				header: 'Verification',
				sortable: true,
				width: 200,
				dataIndex: 'FundingVerification'
			}, {
				header: 'Program Element',
				sortable: true,
				flex: 1,
				dataIndex: 'ProgramElement'					
			},{
				header: 'Additional Info',
				flex: 1,
				dataIndex: 'AdditionalInfo'
			}]
		});
	},
	onDestroy: function () {
		var me = this;
		me.requirements.destroy();
		me.requirements = null;
		me.risks.destroy();
		me.risks = null;
		me.estimates.destroy();
		me.estimates = null;
		me.funding.destroy();
		me.funding = null;
		this.callParent();
	}
	
});