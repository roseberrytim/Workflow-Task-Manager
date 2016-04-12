Ext.define('Custom.activity.FundingVerification', {
	extend: 'Ext.form.Panel',
	alias: 'widget.fundingverify',
	
	config: {
		workflowInstance: null,
		detailRecord: null,
		activityParameters: {},
		fundingStore: null,
		description: ''		
	},
	
	initComponent: function () {
		var detailRecord = this.getDetailRecord(),
			id = detailRecord.get('ID'),
			updateValue = detailRecord.get('UpdateValue'),
			params = this.getActivityParameters(),
			approved = params['Approved'] || false,
			directorate = params['Directorate'] || '',
			title = this.title || '',
			description = this.getDescription();
			
		this.fundingStore = detailRecord.getFunding();
		this.fundingStore.load();
		
		Ext.apply(this, {			
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'component',			
				html: '<div class="action-description-header"><h1>' + title + '</h1><p>' + description + '</p></div>'				
			}, {
				xtype: "fieldcontainer",
				itemId: 'approvedVerification',
				labelAlign: "top",
				layout: "hbox",
				fieldLabel: "Approved Funding Verification",
				items: [{
					xtype: "checkbox",
					name: "Funded",
					margin: "0 10 0 0",
					fieldLabel: "Funded"
				}, {
					xtype: "combo",
					name: "FundingVerification",
					fieldLabel: "Funds Verification",
					flex: 1,
					margin: "0 10 0 0",
					queryMode: 'local',
					store: ["ABIDES", "CCaR", "RAPIDS", "N/A"]
				}, {
					xtype: "textfield",
					name: "ProgramElement",
					flex: 1,
					fieldLabel: "Program Element"
				}]
			}, {
				xtype: "fieldcontainer",
				labelAlign: "top",
				itemId: 'fiscalYearLabels',
				layout: "hbox",				
				defaultType: 'textfield',
				fieldDefaults: {
					fieldLabel: 'FY',
					width: 75,
					labelAlign: 'top'
				},
				items: [{
					xtype: 'label',										
					width: 150,
					text: 'Year(s)'
				}, {
					name: 'FY1'
				}, {
					name: 'FY2'
				}, {
					name: 'FY3'
				}, {
					name: 'FY4'
				}, {
					name: 'FY5'
				}]
			}, {
				xtype: 'grid',
				itemId: 'fiscalYearGrid',
				store: this.fundingStore,				
				dockedItems: [{
					xtype: 'form',
					dock: 'top',
					itemId: 'fiscalYearForm',
					layout: 'hbox',
					weight: 101,
					bodyStyle: {
						'background-color': '#F5F5F5'
					},
					defaultType: 'textfield',					
					items: [{
						xtype: 'combo',
						name: 'FundingType',
						width: 150,
						emptyText: 'Enter funding type',
						queryMode: 'local',
						store: ['3010',	'3020', '3400', '3600', '3080', '3740', '3840', 'FMS', 'WCF']
					}, {				
						name: '_x0046_Y1',
						width: 75
					}, {				
						name: '_x0046_Y2',
						width: 75
					}, {				
						name: '_x0046_Y3',
						width: 75
					}, {				
						name: '_x0046_Y4',
						width: 75
					}, {				
						name: '_x0046_Y5',
						width: 75
					}, {
						name: 'Approved',
						hidden: true,
						value: approved ? '1' : '0'
					}, {
						name: 'Directorate',
						hidden: true,
						value: directorate
					}, {
						name: 'Request',
						hidden: true,
						value: updateValue
					}, {
						xtype: 'button',
						margin: '0 0 0 10',
						text: 'Add',
						scope: this,
						handler: function () {
							this.addNewFiscalYearFunding()
						}
					}]
				}],
				columnLines: true,
				columns: [{
					header: 'Type',						
					sortable: true,
					resizable: false,
					width: 150,
					dataIndex: 'FundingType'
				}, {
					header: '',
					sortable: false,
					resizable: false,
					width: 75,
					dataIndex: '_x0046_Y1'
				}, {
					header: '',
					sortable: false,
					resizable: false,
					width: 75,
					dataIndex: '_x0046_Y2'
				}, {
					header: '',
					sortable: false,
					resizable: false,
					width: 75,
					dataIndex: '_x0046_Y3'
				}, {
					header: '',
					sortable: false,
					resizable: false,
					width: 75,
					dataIndex: '_x0046_Y4'
				}, {
					header: '',
					sortable: false,
					resizable: false,
					width: 75,
					dataIndex: '_x0046_Y5'
				}]
			}]
		});
		
		this.callParent();
	},
	addNewFiscalYearFunding: function () {
		var form = this.down('#fiscalYearGrid #fiscalYearForm'),
			values = form.getValues();
					
		this.fundingStore.add(values);
		form.getForm().reset();	
	},
	processActivity: function (workflow, node, action) {		
		var detailRecord = this.getDetailRecord(),
			formValues = this.getValues(),
			FYLabels = [],
			values;
		
		for (i = 1; i < 6; i++) {
			FYLabels.push(formValues['FY' + i]);
		}
		
		values = Ext.apply({}, {
			FundingVerification: formValues.FundingVerification,
			Funded: formValues.Funded ? '1' : '0',
			ProgramElement: formValues.ProgramElement,
			FYLabels: FYLabels.join(';')
		});
		
		detailRecord.beginEdit();
		for (key in values) {
			detailRecord.set(key, values[key]);
		}
		detailRecord.endEdit();
		
		
		return true;
		/*
			if function cannot complete all activty and return true in a syncronous way then return false and then
			process all needed activity and then use the workflowManager context to reinvoke the transition of the task 
			
			workflowManager.processWorkflowTransition(nodeId, action);
		*/
	}
});


