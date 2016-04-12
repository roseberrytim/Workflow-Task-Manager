Ext.define('Task.view.WorkflowDefinitions', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.definitions',
	requires: ['Task.view.designer.*'],
	initComponent: function () {
		Ext.apply(this, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			tabConfig: {
				width: 200,
				iconAlign: 'top',
				action: 'definitions'
			},
			items: [{
				xtype: 'component',
				height: 100,
				html: '<div class="definitions-header"><h2>Workflow Definitions</h2><p>Select your configuration to modify. </p></div>'				
			}]
		});
		this.callParent();
	}
});