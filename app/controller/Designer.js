Ext.define('Task.controller.Designer', {
    extend: 'Ext.app.Controller',
    models: [],
    stores: [],
    views: ['designer.Viewer', 'designer.Designer'],
    refs: [		
		{ref: 'viewer', selector: 'viewer'}, 
		{ref: 'designer', selector: 'viewer designer'}, 
		{ref: 'zoomSlider', selector: 'viewer #zoomFactor'}, 
		{ref: 'saveDesignerButton', selector: 'viewer button[action=save]'}
	],
   init: function () {
        var me = this;
		me.listen({			
			component: {				
				'viewer': {
					render: 'onViewerRender'					
				},
				'viewer #zoomFactor': {
					changecomplete: 'onZoomFactorChange'
				},
				'viewer button[action=home]': {
					click: 'onBackToDetails'
				},
				'viewer button[action=config]': {
					click: 'onViewerConfigClick'
				},
				'viewer button[action=info]': {
					click: 'onViewerInfoClick'
				},
				'viewer button[action=save]': {
					click: 'onViewerSaveClick'
				},
				'designer': {
					//beforeremove: 'onDesignerSheetRemove',
					//closemenuclick: 'onSheetContextMenuClick',
					//settingsmenuclick: 'onSheetContextMenuClick',					
					designerrestore: 'onDesignerRestore',
					markdirty: 'onDesignerMarkDirty',
					settingssave: 'onDesignerSettingsSave'					
				},				
				'sheet': {
					render: 'restoreSheetNodes',
					//sheetcontextmenu: 'onSheetContextMenu',
					settingsupdate: 'onSheetSettingsUpdate'
					//titlechange: 'onSheetTitleChange'
				},
				'sheetsettings button[action=save]': {
					click: 'onSheetSettingsSave'
				}			
			}			
		});		
    },
	onZoomFactorChange: function (slider, value) {
		var factor = value / 100;
		
		var designer = this.getDesigner(),
			sheet = designer.down('sheet'),
			nodes;
		if (sheet) {
			sheet.setZoomFactor(value);
			nodes = sheet.getNodes();
			nodes.each(function (node) {
				node.scaleNode(factor);
			});
		}
	},
	onViewerRender: function (viewer) {
		try {
			var record = viewer.getRecord(),
				editing = viewer.getEditing(),
				settings, sheets, designer;
				
			if (record) {
				settings = Ext.decode(record.get('Settings'));
				sheets = settings.sheets || [];				
				
				viewer.setLoading(true);
				designer = Ext.create('Task.view.designer.Designer', {
					flex: 1,
					record: record,
					settings: settings,
					restoring: true,
					editing: editing					
				});				
				viewer.add(designer);
				
				Ext.Function.defer(this.restoreSheets, 1000, this, [designer, sheets, editing]);
			}
		} catch (e) {
			Ext.MessageBox.alert('Error', 'There was a problem reading the designer configuration');		
		}
	},
	onViewerSaveClick: function (button) {
		var viewer = button.up('viewer'),
			designer = viewer.down('designer');
		this.saveDesigner(designer);		
	},
	onViewerConfigClick: function (button) {
		var viewer = button.up('viewer'),
			designer = viewer.down('designer'),
			sheet, settings;
		if (designer) {
			sheet = designer.down('sheet');
			this.showSheetSettings(sheet);			
		}
	},
	onViewerInfoClick: function (button) {
		var record = button.up('viewer').getRecord(),
			notes;
		if (record) {
			notes = record.get('Notes');
		}
	},
	onBackToDetails: function (button) {
		var viewer = button.up('viewer'),
			designer = viewer.down('designer'),
			editing = designer.getEditing(),
			isDirty = designer.getDirty();		
		if (editing && isDirty) {
			Ext.MessageBox.show({
				title:'Save Changes?',
				msg: 'You are closing a design that has unsaved changes. Would you like to save your changes?',
				buttons: Ext.MessageBox.YESNOCANCEL,
				icon: Ext.MessageBox.QUESTION,
				scope: this,
				fn: function (buttonId) {
					if (buttonId === 'yes') {
						this.saveDesigner(designer);
					} else if (buttonId === 'no') {
						this.closeViewer(viewer);
					}
				}
			});
		} else {
			this.closeViewer(viewer);
		}
	},
	onDesignerMarkDirty: function (designer) {		
		var isDirty = designer.getDirty(),
			saveButton;
		if (!isDirty) {
			designer.setDirty(true);
			saveButton = this.getSaveDesignerButton();
			saveButton.setIconCls('icon-viewer-save-dirty');
		}
	},
	onDesignerSettingsSave: function (designer) {
		var saveButton = this.getSaveDesignerButton();
		designer.setDirty(false);
		saveButton.setIconCls('icon-viewer-save');
	},
	onDesignerRestore: function (designer) {
		var viewer = designer.up('viewer');
		designer.setRestoring(false);
		this.getViewer().setLoading(false);		
	},
	
	onSheetSettingsUpdate: function (sheet, settings) {
		var designer = sheet.getDesigner();
		designer.fireEvent('markdirty', designer);
	},
	onSheetSettingsSave: function (button) {
		var window = button.up('window'),
			form = window.down('form'),
			sheet = window.getSheet(),
			values;
		if (form.isValid()) {
			values = form.getValues();
			sheet.applySheetSettings(values);
			sheet.fireEvent('settingsupdate', sheet, values);
			window.close();
		}
	},
	
	saveDesigner: function (designer) {
		try {
			var me = this,			
				record = designer.getRecord(),
				config = {},
				sheets = designer.query('sheet'),
				sheetsCfg = [];
			
			Ext.Array.each(sheets, function (sheet) {				
				var settings = sheet.getSettings(),
					nodes = sheet.getNodes(),
					nodeCfg = []
				nodes.each(function (node) {
					nodeCfg.push(node.getSaveConfiguration());
				});
				sheetsCfg.push(Ext.apply({}, {
					nodes: nodeCfg
				}, settings));				
			});
				
			Ext.apply(config, {
				sheets: sheetsCfg
			});
			config = Ext.encode(config);
			record.set('Settings', config);
			designer.fireEvent('settingssave', designer);
		} catch (e) {
			Ext.MessageBox.alert('Error', 'There was an error saving the configuration of the current designer - ' + e.message);
		}
	},
	closeViewer: function (viewer) {		
		viewer.destroy();
	},
	restoreSheetNodes: function (sheet) {
		var designer = sheet.getDesigner(),
			config = sheet.getSettings(),
			editing = sheet.getEditing(),
			restoreCount = sheet.getNodeCount(),
			nodes = config.nodes || [],
			restoring = false;
		Ext.each(nodes, function (node) {
			var type = node.type,
				viewable = node.viewable,
				box;
			if (viewable || editing) {
				box = Ext.widget(type, Ext.apply(node, {
					viewable: viewable,
					editing: editing
				}));
				if (box) {						
					sheet.add(box);					
					restoring = true;
				}
			} else {
				if (--restoreCount <= 0) {
					designer = sheet.getDesigner();
					designer.fireEvent('designerrestore', designer);
				}
				sheet.setNodeCount(restoreCount);
			}
		});
		if (!restoring) {
			designer.fireEvent('designerrestore', designer);
		}
	},
	showSheetSettings: function (sheet) {
		if (sheet) {
			Ext.create('Task.view.designer.SheetSettings', {
				sheet: sheet
			});
		}
	},
	restoreSheets: function (designer, sheets, editing) {		
		if (Ext.isEmpty(sheets)) {
			designer.fireEvent('designerrestore', designer);
		} else {
			Ext.each(sheets, function (sheetCfg) {				
				var title = sheetCfg.title || 'Sheet',
					nodes = sheetCfg.nodes || [],
					nl = nodes.length,
					sheet = Ext.create('Task.view.designer.Sheet', {
						title: sheetCfg.title || 'Sheet',
						designer: designer,
						settings: sheetCfg,
						editing: editing,						
						nodeCount: nl
					});
				designer.add(sheet);			
			}, this);
			//designer.setActiveTab(0);
			if (editing && designer.editTools) {
				designer.editTools.show();
			}
		}
	},
	pasteWidget: function (menu, designer, sheet) {
		var clipboard = designer.getClipboard(),
			cutOperation = designer.getCutOperation(),
			coord = menu.getOffsetsTo(sheet),
			scroll = sheet.el.getScroll(),
			config;	
		
		config = Ext.apply({}, {
			x: coord[0] + scroll.left,
			y: coord[1] + scroll.top,
			editing: true
		}, clipboard);
			
		sheet.add(Ext.create('widget.' + config.type, config));
		designer.fireEvent('markdirty', designer);
		if (cutOperation) {
			designer.setClipboard({});
		}
	}
});