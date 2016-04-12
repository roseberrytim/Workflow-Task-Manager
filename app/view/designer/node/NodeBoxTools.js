 Ext.define('Task.view.designer.node.NodeBoxTools', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.nodeboxtools',
	
	config: {
		widget: null
	},
	vertical: true,
	style: 'background: transparent;',
	defaults: {
		margin: 1
	},
	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	initComponent: function () {		
		Ext.apply(this, {
			items: [{
				xtype: 'button',
				action: 'edit',
				iconCls: 'icon-edit',
				tooltip: 'Change Node Settings'
			}, {
				xtype: 'button',
				iconCls: 'icon-zindex',
				tooltip: 'Change Z-Index Order',
				arrowCls: '',
				menu: [{
					text: 'To Front',
					iconCls: 'icon-bringfront',					
					action: 'toFront'					
				}, {
					text: 'To Back',
					iconCls: 'icon-toback',					
					action: 'toBack'					
				}]
			}, {
				xtype: 'button',
				action: 'copy',
				iconCls: 'icon-copy',
				tooltip: 'Copy Widget'
			}, {
				xtype: 'button',
				action: 'cut',
				iconCls: 'icon-cut',
				tooltip: 'Cut Widget'
			}, {
				xtype: 'button',
				action: 'close',
				iconCls: 'icon-close'
			}]
		});
		this.callParent();
	}
});