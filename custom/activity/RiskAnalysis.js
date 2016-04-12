Ext.define('Custom.activity.RiskAnalysis', {
	extend: 'Ext.form.Panel',	
	alias: 'widget.riskanalysis',
	config: {
		description: ''	,
		workflowInstance: null,
		detailRecord: null,
		activityParameters: {},
		riskAnalysisStore: null			
	},
	
	initComponent: function () {
		var detailRecord = this.getDetailRecord(),
			id = detailRecord.get('ID'),
			updateValue = detailRecord.get('UpdateValue'),
			params = this.getActivityParameters(),
			directorate = params['Directorate'] || '',
			title = this.title || '',
			description = this.getDescription();
		
		this.riskAnalysisStore = detailRecord.getRiskAnalysis();
		
		Ext.apply(this, {
			autoScroll: true,
			items: [{
				xtype: 'component',			
				html: '<div class="action-description-header"><h1>' + title + '</h1><p>' + description + '</p></div>'				
			}, {
				xtype: 'button',
				text: 'Add New',
				scope: this,
				handler: function () {
					this.addNewRiskClick(updateValue, directorate)
				}
				
			}, {
				xtype: 'grid',				
				store: this.riskAnalysisStore,				
				columnLines: true,
				columns: [{
					header: 'Type',						
					sortable: true,
					resizable: false,					
					dataIndex: 'RiskType'
				}, {
					header: 'Title',
					sortable: false,
					resizable: false,					
					dataIndex: 'Title'
				}, {
					header: 'Likelihood',
					sortable: false,
					resizable: false,					
					dataIndex: 'Likelihood'
				}, {
					header: 'Consequence',
					sortable: false,
					resizable: false,				
					dataIndex: 'Consequence'
				}]
			}]
		});
		
		this.callParent();
	},
	addNewRiskClick: function (request, directorate) {
		var me = this,
			win = Ext.create('Ext.window.Window', {
			layout: 'fit',
			title: 'New Risk Analysis',
			bodyPadding: 5,
			width: 800,
			height: 600,
			items: [{
				xtype: 'form',
				autoScroll: true,
				defaultType: 'textfield',
				defaults: {
					anchor: '90%'
				},
				items: [ {
					xtype: 'combo',
					name: 'RiskType',
					fieldLabel: 'Type',				
					queryMode: 'local',					
					store: [
						['Funding', 'Funding'],
						['Authorization', 'Authorization'],
						['Schedule', 'Schedule'],
						['Scope', 'Scope']
					]
				}, {
					name: 'Title',
					fieldLabel: 'Title'
				}, {
					xtype: 'htmleditor',
					name: 'Description',
					fieldLabel: 'Description'
				}, {
					xtype: 'htmleditor',
					name: 'Mitigation',
					fieldLabel: 'Mitigation'
				}, {
					xtype: 'htmleditor',
					name: 'WorstCaseImpact',
					fieldLabel: 'Worst Case Impact'
				}, {
					xtype: 'radiogroup',
					fieldLabel: 'Likelihood',
					columns: 1,
					vertical: true,
					items: [
						{ boxLabel: 'Near Certainty (~90%)', name: 'Likelihood', inputValue: '5'},
						{ boxLabel: 'Highly Likely (~70%)', name: 'Likelihood', inputValue: '4' },
						{ boxLabel: 'Likely (~50%)', name: 'Likelihood', inputValue: '3' },
						{ boxLabel: 'Low Likelihood (~30%)', name: 'Likelihood', inputValue: '2' },
						{ boxLabel: 'Not Likely (~10%)', name: 'Likelihood', inputValue: '1' }
					]
				}, {
					xtype: 'radiogroup',
					fieldLabel: 'Consequence',				
					layout: 'vbox',
					anchor: '100%',				
					defaultType: 'container',
					defaults: {
						layout: 'hbox',
						margin: '10 0 0 0',
						flex: 1
					},
					items: [{
						items: [
							{xtype: 'label', text: 'Level',  style: 'font-weight: bold;', width: 100},
							{xtype: 'label', text: 'Technical Performance/Life Cycle Sustainment', style: 'font-weight: bold;', margin: '0 10 0 0', width: 300},
							{xtype: 'label', text: 'Schedule', style: 'font-weight: bold;', margin: '0 10 0 0', width: 200},
							{xtype: 'label', text: 'Cost', style: 'font-weight: bold;', width: 200}
						]
					},{
						flex: 2,					
						items: [
							{xtype: 'radiofield', boxLabel: '1', name: 'Consequence', inputValue: '1', width: 100},
							{xtype: 'label', text: 'Minimal or no consequence to technical performance', margin: '0 10 0 0', width: 300},
							{xtype: 'label', text: 'Minimal or no impact', margin: '0 10 0 0', width: 200},
							{xtype: 'label', text: 'Minimal or no impact', width: 200}
						]
					},{
						items: [
							{xtype: 'radiofield', boxLabel: '2', name: 'Consequence', inputValue: '2', width: 100},
							{xtype: 'label', text: 'Minor reduction in technical performance or supportablility; can be tolderated with little or no impact on program', margin: '0 10 0 0', width: 300},
							{xtype: 'label', text: 'Able to meet key dates', margin: '0 10 0 0', width: 200},
							{xtype: 'label', text: 'Budget increase or unit production cost increase (<1% of Budget)', width: 200}
						]
					},{
						items: [
							{xtype: 'radiofield', boxLabel: '3', name: 'Consequence', inputValue: '3', width: 100},
							{xtype: 'label', text: 'Moderate reduction in technical performance or supportablity with limited impact on program objectives', margin: '0 10 0 0', width: 300},
							{xtype: 'label', text: 'Minor schedule slip; able to meet key milestones with no schedule float', margin: '0 10 0 0', width: 200},
							{xtype: 'label', text: 'Budget increase or unit production cost increase (<5% of Budget)', width: 200}
						]
					}, {
						items: [
							{xtype: 'radiofield', boxLabel: '4', name: 'Consequence', inputValue: '4', width: 100},
							{xtype: 'label', text: 'Significant degradation in technical performance or major shortfall in supportability; may jeopardize program success', margin: '0 10 0 0', width: 300},
							{xtype: 'label', text: 'Program critical path affected', margin: '0 10 0 0', width: 200},
							{xtype: 'label', text: 'Budget increase or unit production cost increase (<10% of Budget)', width: 200}						
						]
					}, {
						items: [
							{xtype: 'radiofield', boxLabel: '5', name: 'Consequence', inputValue: '5', width: 100},
							{xtype: 'label', text: 'Severe gradation in technical performance; cannot meet KPP or key technical/supportability threshold; will jeopardize program success', margin: '0 10 0 0', width: 300},
							{xtype: 'label', text: 'Cannot meet key program milestones', margin: '0 10 0 0', width: 200},
							{xtype: 'label', text: 'Exceeds APB threashold (>10% of Budget)', width: 200}
						]
					}]				
				}, {
					name: 'Request',
					hidden: true,
					value: request
				}, {
					name: 'Directorate',
					hidden: true,
					value: directorate
				}]
			}],
			buttons: [{
				text: 'Cancel',
				handler: function () {
					win.close();
				}
			}, {
				text: 'Save',				
				handler: function () {
					var form = win.down('form'),
						values = form.getValues();
					me.addNewRisk(values);
					win.close();
				}
			}]
		});
		win.show()
	},
	addNewRisk: function (values) {
		 this.riskAnalysisStore.add(values);
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