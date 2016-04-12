Ext.define('Task.view.designer.Sheet', {
	extend: 'Ext.container.Container',
	alias: 'node.sheet',
	requires: ['Ext.layout.container.Absolute'],
	
	layout: 'absolute',
	autoScroll: true,
	cls: 'sheet-container',
	hideMode: 'offsets',
	
	config: {
		nodeCount: 0,
		editing: false,			
		designer: null,
		zoomFactor: 100
	},
	constructor: function (config) {	
		this.addEvents('sheetcontextmenu');
		this.initConfig(config);
		this.callParent(arguments);
	},
	initComponent: function () {
		var me = this;
					
		Ext.apply(me, {
			items: [],
			listeners: {
				el: {
					scope: me,
					contextmenu: me.onSheetContextMenu					
				}
			}
		});
		me.callParent();		
		// Setup ZIndex management stuff.
		me.zSeed = 100;
		me.nodeList = new Ext.util.MixedCollection();
		me.zIndexStack = [];
        me.front = null;
	},	
	registerNode: function (node) {
		if (node.isNode) {
			var me = this,
				seed = me.zSeed,
				stack = me.zIndexStack,
				sl = stack.length,
				nodeId = node.getId();
			
			Ext.apply(node, {
				style: {
					'z-index': seed + sl
				},
				sheet: me
			});		
			me.nodeList.add(nodeId, node);
			me.zIndexStack.push(node);
			me.front = node;
		}		
	},
	unregisterNode: function (node) {
		var me = this,
			nodeList = me.nodeList,
			nodeId = node.getId(),
			stack = me.zIndexStack;
			
		if (nodeList && nodeList.containsKey(nodeId)) {
			nodeList.removeAtKey(nodeId);
			//delete nodeList[nodeId];
			
			if (me.front == node) {
				me.front = stack[stack.length - 1]
			}
			Ext.Array.remove(stack, node);
		}
	},
	assignZIndices: function () {
		var me = this,
			stack = me.zIndexStack,
			sl = stack.length,
			i = 0,
			zIndex = me.zSeed,
			node;
		for (i;i < sl; i++) {
			node = stack[i];
			
			if (node) {
				node.el.setStyle('z-index', zIndex + i);
			}	
		}
	},	
	bringNodeToFront: function (node) {
		var me = this,
			index = me.nodeList.indexOf(node),
			stack = me.zIndexStack,
			result = false,
			order = {};
			
		if (node !== me.front) {
			order[index] = me.nodeList.getCount() - 1;
			Ext.Array.remove(stack, node);
			stack.push(node);
			me.nodeList.reorder(order);
			me.assignZIndices();
			result = true;
			me.front = node;
		}
		return result;
	},
	sendNodeToBack: function (node) {
		var me = this,
			index = me.nodeList.indexOf(node),
			stack = me.zIndexStack,
			order = {};
		
		order[index] = 0;
		Ext.Array.remove(stack, node);
		stack.unshift(node);
		me.nodeList.reorder(order);
		me.assignZIndices();
	},
	getNodes: function () {
		return this.nodeList;
	},
	
	onSheetContextMenu: function (event, target) {
		var editing = this.getEditing();
		if (editing) {
			this.fireEvent('sheetcontextmenu', event, target, this);
			event.preventDefault();
		}
	}
});