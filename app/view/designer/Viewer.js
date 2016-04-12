﻿Ext.define('Task.view.designer.Viewer', {
	extend: 'Ext.container.Container',
	alias: 'widget.viewer',
	requires: ['Ext.slider.Slider', 'Task.view.designer.Designer'],
	
	config: {
		record: null,
		settings: {},
		editing: false,
		publishMode: false
	},	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	initComponent: function () {
		var me = this,
			toolbar = me.buildToolbar();			
			
		Ext.apply(me, {			
			items: [toolbar]
		});
		
		this.callParent();
		this.addEvents('markdirty');
	},
	buildToolbar: function () {
		var editMode = this.getEditing(),
			publishMode = this.getPublishMode(),
			rec = this.getRecord(),	
			title = rec.get('Title'),
			items = [];
		
			
		items.push({
			xtype: 'tbtext',
			itemId: 'dashboardTitle',			
			cls: 'dashboard-title',			
			text: title		
		}, '->');
		if (!editMode) {
			items.push({
				xtype: 'slider',
				itemId: 'zoomFactor',
				fieldLabel: '',
				width: 150,
				value: 100,
				increment: 10,
				minValue: 10,
				maxValue: 200,
				animate: false
			});
		}
		if (editMode) {
			items.push({				
				action: 'save',
				iconCls: 'icon-viewer-save',
				tooltip: 'Save Dashboard',
				scale: 'medium'
			},  {				
				action: 'config',
				iconCls: 'icon-viewer-config',
				tooltip: 'Configure Current Sheet',
				scale: 'medium'
			},{				
				action: 'previewEdit',				
				hidden: true,
				iconCls: 'icon-viewer-preview',
				tooltip: 'Toggle Edit/View Mode',
				scale: 'medium',
				toggleGroup: 'editViewMode'				
			});
		}
		
		items.push({
			action: 'info',
			hidden: true,
			iconCls: 'icon-help',
			scale: 'medium',
			tooltip: 'Information'
		});
		
		return Ext.create('Ext.toolbar.Toolbar', {
			style: 'background-color: #f5f5f5;',
			items: items
		});
	}	
});