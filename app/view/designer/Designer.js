Ext.define('Task.view.designer.Designer', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.designer',
	requires: ['Task.view.designer.node.Toolbox', 'Task.view.designer.Sheet'],
	
	autoScroll: true,
	plain: true,
	deferredRender: false,   
	layout: 'fit',
	
	config: {
		record: null,
		settings: {},
		editing: false,
		dirty: false,
		restoring: false,		
		clipboard: {},
		cutOperation: false
	},	
	constructor: function (config) {
		this.addEvents('restore', 'markdirty');
		this.initConfig(config);
		this.callParent(arguments);		
	},
	initComponent: function () {
		var me = this;
		me.editTools = me.buildEditTools();
		me.callParent(arguments);
	},
	
	buildEditTools: function () {
		return Ext.create('Task.view.designer.node.Toolbox', {
			designer: this
		});
	},	
	onDestroy : function(){
        var me = this;
		if (me.editTools) {
			me.editTools.destroy();
		}
        me.callParent(arguments);
    }
});