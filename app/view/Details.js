Ext.define('Task.view.Details', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.taskdetails',	
	requires: ['Ext.form.*', 'Ext.grid.column.Number', 'Ext.grid.feature.Grouping', 'Ext.grid.feature.GroupingSummary', 'Ext.ux.form.ItemSelector', 'Ext.layout.container.*', 'Task.view.UploadButton'],
	layout: {
		type: 'hbox',
		align: 'stretch'
	},	
	cls: 'task-details',
	border: true,
	bodyBorder: false,
	bodyStyle: 'border-width: 0px !important;',
	
	config: {
		workflowConfig: null,
		detail: null	
	},	
	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	
	initComponent: function () {		
		var wf = this.workflowConfig,
			items = [],
			comments, history, docs, actionPanel, details, docToolbar, workflowGUID, allowEdit;
		
		if (wf) {
			comments = wf.commentsStore;
			history = wf.historyStore;
			docs = wf.documentsStore;
			actionPanel = wf.actionPanel;
			allowEdit = wf.allowDocumentEdit;
			workflowGUID = wf.workflowGUID;			
			
			docs.storeId = 'WorkflowDocumentLibrary';
			Ext.data.StoreManager.register(docs);
			
			if (allowEdit) {
				docToolbar = [{
					xtype: 'uploadbutton',
					itemId: 'uploadButton',
					store: 'WorkflowDocumentLibrary',
					instance: workflowGUID,
					scale: 'small'
				}, {
					action: 'delete',
					text: 'Delete'	
				}];
			}
									
			if (actionPanel) {
				items.push(actionPanel);
			}			
						
			details = this.detail; //.buildDetailsPanel();
						
			items.push({
				xtype: 'panel',
				flex: 1,
				title: 'Details',
				itemId: 'taskDetails',
				autoScroll: true,
				bodyPadding: 5,				
				bodyStyle: 'background-color: #f5f5f5;',				
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [details, 
				/*
				{
					xtype: 'container',
					flex: 1,
					margin: '0 5 0 0',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [details, ]
				}, */
				{
					xtype: 'container',					
					flex: 1,					
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						xtype: 'gridpanel',
						title: 'Comments',
						itemId: 'commentPanel',				
						margin: '5 5 0 0',
						flex: 1,
						store: comments,
						border: true,
						autoScroll: true,
						/*
						features: [Ext.create('Ext.grid.feature.Grouping',{
							groupHeaderTpl: [
								'Comments: ',
								'{name:this.getTitleValue}', 
								' ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
								{
									getTitleValue: function (name) {
										if (name.indexOf(';#') !== -1) {
											var splitName = name.split(';#');
											return splitName[1];
										}
										return name;
									}
								}
							],
							hideGroupedHeader: true
						})],
						
						plugins: [{					
							ptype: 'rowexpander',
							rowBodyTpl : [
								'<div class="comment-list"><div class="comment"><div class="comment-wrapper">{Comment}</div></div></div>'
							]
						}],
						dockedItems: [{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [{
								xtype : 'button',
								text: 'Expand all Rows',
								action: 'expand'
							}, { 
								xtype: 'tbseparator' 
							}, {
								xtype : 'button',
								text: 'Collapse all Rows',
								action: 'collapse'
							}]
						}],
						*/
						columns: [{
							dataIndex: 'Comment',
							flex: 1,
							header: 'Comment',
							renderer:function(val, meta, record, rowIndex, colIndex, store) {
								return '<div style="white-space:normal !important;">'+ val +'</div>';
							}
						}, 
						/*{
							dataIndex: 'Title',
							sortable: true,
							flex: 1,
							header: 'Title'
						}, */
						{
							dataIndex: 'Author',
							sortable: true,
							flex: 1,
							header: 'User'					
						}, {
							dataIndex: 'TimeDate',
							header: 'Date/Time',
							sortable: true,
							groupable: false,
							flex: 1, 
							renderer: function (value) {
								var fixedDate;
								if (value) {
									fixedDate = Ext.Date.format(value, 'M d, Y H:i');
								}
								return fixedDate;
							}
						}]
					}, {
						xtype: 'gridpanel',
						title: 'Documents',
						margin: '5 0 0 0',
						tools: [{
							type: 'refresh',
							tooltip: 'Refresh Data',
							scope: this,
							handler: function (event, toolEl, header) {
								docs.reload();
							}
						}],
						flex: 1,
						itemId: 'documentPanel',				
						store: docs,
						border: true,
						viewConfig: {
							loadingText: 'Please wait...'
						},
						columns: [{
							dataIndex: 'Path',
							menuDisabled: true,
							sortable: false,
							flex: 0.1,
							scope: this,
							renderer: function (value, meta, record, rowIndex, colIndex, store) {
								var permMask = record.get('PermMask'),									
									docIcon = this.getDocumentIconType(record);
								g_varSkipRefreshOnFocus = true;
								if (allowEdit) {
									//return "<a HREF=" + value + " target=\"_blank\" onclick=\"return DispEx(this, event, 'TRUE', 'FALSE', 'FALSE','SharePoint.OpenDocuments.3','0','SharePoint.OpenDocuments','','',''," + Task.config.Globals.currentUserID + ",'0','0','" + permMask + "')\"><img src=\"resources/images/document.png\" /></a>";
									return "<a HREF=" + value + " onclick=\"return DispEx(this, event, 'TRUE', 'FALSE', 'FALSE','SharePoint.OpenDocuments.3','0','SharePoint.OpenDocuments','','',''," + Task.config.Globals.currentUserID + ",'0','0','" + permMask + "')\"><img src=\"resources/images/" + docIcon + ".png\" /></a>";
								} else {
									return "<a HREF=" + L_Menu_BaseUrl + "/_layouts/download.aspx?sourceUrl=" + value + " target=\"_blank\"><img src=\"resources/images/" + docIcon + ".png\" /></a>";
								}
							},
							listeners: {
								mousedown: function (column, grid, rowIndex, eventObj) {
									return false;
								}
							}
						}, {
							header: 'File Name',
							dataIndex: 'LinkFilename',
							flex: 1
						}, {
							xtype: 'datecolumn',
							header: 'Modified',
							flex: 0.5,
							dataIndex: 'Modified',
							format: 'M d, Y H:i'
						}, {
							header: 'Modified By',
							flex: 0.5,
							dataIndex: 'ModifiedBy'
						}, {
							header: 'Version',
							flex: 0.2,
							dataIndex: 'Version'
						}],
						tbar: docToolbar
					}]
				}]
			}, {				
				xtype: 'gridpanel',
				title: 'Activity',
				flex: 1,
				itemId: 'historyPanel',				
				//border: true,
				autoScroll: true,
				store: history,
				columns: [{
					header: 'Action',
					flex: 1,
					dataIndex: 'Title'
				}, {
					header: 'User',
					flex: 1,
					dataIndex: 'Author'					
				}, {
					header: 'Date / Time',
					flex: 1,
					dataIndex: 'TimeDate',
					renderer: function (value) {
						return Ext.Date.format(value, 'F j, Y, H:i A'); 
					}
				}]			
			});
		}
		Ext.apply(this, {
			activeTab: 0,
			plain: true,			
			items: items
		});
		this.callParent();
	},
	getDocumentIconType: function (record) {
		var docType = record.get('DocIcon'),
			type = 'document';
		
		switch (docType) {
			case 'doc':
			case 'docx': {
				type = 'document-word'
				break;
			}
			case 'xls':
			case 'xlsx': {
				type = 'document-excel'
				break;
			}
			case 'ppt':
			case 'pptx': {
				type = 'document-powerpoint'
				break;
			}			
			case 'pdf': {
				type = 'document-pdf'
				break;
			}
			case 'png':
			case 'jpg': {
				type = 'document-image'
				break;
			}
			case 'txt': {
				type = 'document-text'
				break;
			}
			default: {				
			}
		}
		return type;
	},
	onDestroy: function() {
        this.workflowConfig = null;
		this.detail = null;
		
		this.callParent();
    }
	
});