Ext.define('Task.view.MyTasks', {
	extend: 'Ext.container.Container',
	alias: 'widget.mytasks',
	requires: ['Task.view.Selector', 'Task.view.Search', 'Task.view.Details', 'Task.view.Launch', 'Ext.grid.*'],
	layout: {
		type: 'hbox',
		align: 'stretch'
	},		
	initComponent: function () {		
		
		Ext.apply(this, {
			tabConfig: {
				width: 200,
				iconAlign: 'top',
				action: 'mytasks'
			},
			items: [{
				xtype: 'container',
				width: 250,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'search',
					itemId: 'searchField',
					margin: '5 0 2 2'
				}, {
					xtype: 'taskselector',
					margin: '0 0 0 2',
					flex: 1
				}]
			}, {
				xtype: 'container',				
				flex: 1,
				itemId: 'taskDetailContainer',
				layout: 'fit',
				margin: '0 0 0 5',
				items: [{				
					xtype: 'launch'
				}]
			}]
		});
		this.callParent();
	}
});