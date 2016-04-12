Ext.define('Task.view.Launch', {
	extend: 'Ext.container.Container',
	alias: 'widget.launch',
	cls: 'launch-main',
	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'center'
	},
	initComponent: function () {
		var configs = Task.config.Globals,
			version = configs.version || 'Not Defined';
		
		Ext.apply(this, {
			items: [{
				xtype: 'component',
				flex: 1,
				cls: 'launch-title',
				html: '<div class="launch-title-inner"><h1>Workflow Task Manager</h1><p>An easy to use application to help keep track of repetitive processes in your organization<span class="launch-title-version">  Version ' + version + '</span></p></div>' +
					'<div class="launch-detail"><img src="resources/images/workflow.png" class="launch-detail-image" alt="Workflow" width="70" height="70"></div>'
			}]
		});
		this.callParent();	
	}
	
});