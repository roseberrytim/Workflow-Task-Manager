Ext.define('Task.controller.Nodes', {
    extend: 'Ext.app.Controller',
    models: [],
    stores: [],
    views: ['designer.Sheet', 'designer.node.NodeBox', 'designer.node.Toolbox'],	
	refs: [{
		ref: 'designer', selector: 'designer'
	}],
	init: function () {
        var me = this;
		me.listen({
			component: {
				'sheet': {
					beforeadd: 'onBeforeAddNode'					
				},
				'nodebox': {
					render: 'onNodeBoxRender',
					move: 'onNodeBoxMoveResize'					
				},
				'nodetoolbox component[action=addnode]': {
					click: 'onAddNodeClick'
				},
				'nodeboxtools component': {
					click: 'onNodeBoxToolClick'
				}				
			}			
		});		
    },
	
	onBeforeAddNode: function (sheet, node) {
		sheet.registerNode(node);
		return true;
	},	
	onNodeBoxRender: function (node) {
		var sheet = node.sheet,
			restoreCount = sheet.getNodeCount(),
			editing = node.getEditing(),
			dashboard;
		if (editing) {
			node.enableNodeBoxTools();
		}
		if (--restoreCount <= 0) {
			designer = sheet.getDesigner();
			designer.fireEvent('designerrestore', designer);
		}
		sheet.setNodeCount(restoreCount);
	},
	onNodeBoxMoveResize: function (node) {
		var designer = node.sheet.getDesigner(),
			dirty = designer.getDirty();			
		if (!dirty) {
			designer.fireEvent('markdirty', designer);
		}
	},	
	
	onAddNodeClick: function (button) {
		try {
			var designer = button.up('window').getDesigner(),
				sheet = designer.down('sheet'),
				config = Ext.apply({}, {
					editing: true
				}, button.nodeCfg);
			
			sheet.add(Ext.create('widget.' + config.type, config));
			designer.fireEvent('markdirty', designer);
		} catch (e) {
			Ext.MessageBox.alert('Error', 'There was a problem adding the selected node');
		}		
	},
	onNodeBoxToolClick: function (button) {
		try {
			var action = button.action,
				node = button.up('toolbar').getNode(),
				sheet = node.sheet,
				designer = sheet.getDesigner();
			if (action) {
				switch (action) {
					case 'edit':
						this.showWidgetSettings(node);
						break;
					case 'toFront':					
						sheet.bringWidgetToFront(node);					
						break;
					case 'toBack':					
						sheet.sendWidgetToBack(node);					
						break;
					case 'copy':
						this.cutCopyWidget(designer, node, false);
						break
					case 'cut':
						this.cutCopyWidget(designer, node, true);					
						break;
					case 'resize':
						this.resizeWidget(node, button.dimensions);
						break;
					case 'visible':
						this.toggleWidgetVisibility(node, button);
						break;
					case 'close':
						Ext.MessageBox.confirm('Confirm', 'Are you sure you wish to remove the node?', function (answer) {
							if (answer === "yes") {
								node.destroy();
							}
						}, this);					
						break;
					default:
					 break;
				}
				designer.fireEvent('markdirty', designer);
			}
		} catch (e) {
			Ext.MessageBox.alert('Error', 'There was a problem performing the requested operation');
		}
	},
	
	cutCopyWidget: function (designer, node, remove) {
		var clipboard = designer.getClipboard(),
			settings = node.getSaveConfiguration();			
		
		designer.setClipboard(settings);
		designer.setCutOperation(remove);
		if (remove) {
			node.destroy()
		}
	},
	showNodeSettings: function (node) {
		var type = node.getType(),
			settings = Ext.create('widget.' + type + 'settings', {
				node: node
			});
		settings.show()
	},	
	
	resizeNode: function (node, dimensions) {
		if (dimensions) {
			node.setSize(dimensions);
		} else {
			var currentWidth = node.getWidth(),
				currentHeight = node.getHeight(),
				win = Ext.create('Ext.window.Window', {				
					title:'Set custom size', 
					bodyPadding:15, 
					modal:true,
					items:[{
						xtype: 'form',
						defaults:{anchor:'100%'},
						items: [{
							xtype: 'numberfield',
							fieldLabel: 'Width',
							name: 'width',
							minValue: 20, 							
							value: currentWidth,
							allowBlank: false
						}, {
							xtype: 'numberfield',
							fieldLabel: 'Height',
							name: 'height',
							minValue: 20, 							
							value: currentHeight,
							allowBlank: false
						}]
					}],
					buttons:[{
						text:'Cancel',
						handler: function (){
							win.close();
						}
					}, {
						text:'Apply',					
						handler: function (button){
							var form = win.down('form'),
								values = form.getValues(false, false, false, true);
							if (form.isValid()) {
								node.setSize(values);
								win.close();
							}
						}
					}]
				});
			win.show();
		}
	}
});