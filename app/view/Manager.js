Ext.define('Task.view.Manager', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.manager',
	requires: ['Task.view.MyTasks', 'Task.view.Processes', 'Task.view.People', 'Task.view.WorkflowDefinitions'],
	ui: 'wizard',
	activeTab: 0,	
	cls: 'task-manager',
	layout: 'fit',
	bodyPadding: '5px 0 0 0',
	initComponent: function () {
		var config = Task.config.Globals,
			isAdmin = config.isAdmin,
			components = [{								
				xtype: 'mytasks',
				title: 'My Tasks',
				itemId: 'mytasks',				
				iconCls: 'icon-mytasks'				
			}]
		
		if (isAdmin) {
			components.push( {
				xtype: 'processes',				
				title: 'Processes',
				itemId: 'processes',				
				iconCls: 'icon-processes'				
			}, {
				xtype: 'people',
				title: 'People',
				itemId: 'people',
				iconCls: 'icon-people'
			}, {
				xtype: 'definitions',
				title: 'Workflow Designer',
				itemId: 'definitions',
				iconCls: 'icon-designer'
			})
		}
		
		Ext.apply(this, {
			tabBar: {
				height: 100,
				items: [{
					xtype: 'component',
					itemId: 'status',
					cls: 'status-alert-wrapper',
					margin: '0 0 0 10',
					flex: 1,
					height: 100
				}]				
			},
			dockedItems: [{
				xtype: 'component',
				flex: 1,
				height: 3,
				dock: 'top',
				style: 'background-color: #eaeaea;'
			}],
			items: components
		});
		
		this.callParent();
	}	
});