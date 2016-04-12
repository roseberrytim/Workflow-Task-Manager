Ext.define('Task.view.designer.node.Toolbox', {
	extend: 'Ext.window.Window',
	alias: 'widget.nodetoolbox',
	title: 'Nodes',
	config: {
		designer: null
	},
	layout: {
		type: 'vbox',
		align: 'center',
		padding: '5',
		defaultMargins: '5 0 0 0'
	},
	x: 10,
	y: 100,
	width: 72,
	closable: false,
	autoHeight: true,
	constrain: true,
	defaultType: 'button',
	defaults: {
		ui: 'default-toolbar',
		scale: 'large'
	},
	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	initComponent: function () {
		Ext.apply(this, {
			items: [{							
				nodeCfg: {
					type: 'taskbox'
				},					
				action: 'addnode',
				iconCls: 'icon-node-task',			
				tooltip: 'Add Task Node'				
			}, {							
				nodeCfg: {
					type: 'actionbox'
				},
				action: 'addwidget',
				iconCls: 'icon-node-action',			
				tooltip: 'Add System Action Node'
			}]			
		});
		this.callParent();
	}
});