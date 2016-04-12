Ext.define('Task.view.Processes', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.processes',
	autoScroll: true,	
	
	initComponent: function () {
		Ext.apply(this, {
			title: 'Processes',
			store: 'AllWorkflowInstances',		
			tabConfig: {
				width: 200,
				iconAlign: 'top',
				action: 'processes'
			},
			columns: [{
				text: 'Name',
				flex: 1,
				dataIndex: 'WorkflowTitle'
			}, {
				text: 'Status',
				dataIndex: 'Status'				
			}, {
				text: 'Model',
				flex: 1,
				dataIndex: 'Model'
			}, {
				text: 'Workflow ID',
				flex: 1,
				dataIndex: 'Title'				
			}]
		});
		this.callParent();
	}
});