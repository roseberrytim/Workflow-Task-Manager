/* global Ext, Workflow, Task, Custom */
Ext.define('Task.controller.Manager', {
    extend: 'Ext.app.Controller',	
	views: ['Manager'],
	models: ['WorkflowInstance', 'WorkflowTask', 'WorkflowHistory', 'Workflow', 'Document', 'Notification'],
	stores: ['WorkflowInstances', 'AllWorkflowInstances', 'WorkflowTasks', 'WorkflowManagedTasks', 'WorkflowHistory', 'Workflows', 'WorkflowInstancesLibrary', 'Notifications'],
	refs: [
		{ref: 'taskContainer', selector: 'mytasks #taskDetailContainer'},
		{ref: 'taskManager', selector: 'manager'},
		{ref: 'taskSelector', selector: 'manager taskselector'},
		{ref: 'statusAlert', selector: 'manager #status'}
	],
	init: function () {
        var me = this;		
		
		me.listen({			
			component: {								
				'manager tab[action=mytasks]': {
					click: 'onMyTasksTabClick'
				},
				'manager tab[action=processes]': {
					click: 'onProcessesTabClick'
				},
				'mytasks': {
					render: 'onMyTasksRender'
				},
				'mytasks #searchField': {
					resetsearch: 'onResetMyTaskSearch',
					change: {
                        fn: me.onSearchFieldChange,                    
                        buffer: 100
                    }
				},
				'taskselector': {
					itemclick: 'onTaskClick',
					beforecontainerclick: 'onTaskSelectorViewClick'					
				},
				'taskdetails #workflowAction button[actionType=taskcomplete]': {
					click: 'onCompleteWorkflowTaskClick'
				},
				'taskdetails #workflowAction button[actionType=taskresolve]': {
					click: 'onResolveWorkflowTaskClick'
				},
				'taskdetails #workflowAction button[action=comment]': {
					click: 'onWorkflowAddCommentClick'
				},
				'taskdetails #workflowAction button[action=claim]': {
					click: 'onWorkflowTaskClaimClick'
				},
				'taskdetails #workflowAction menuitem[action=reassign]': {
					click: 'onWorkflowReassignClick'
				},
				'taskdetails #workflowAction menuitem[action=delegate]': {
					click: 'onWorkflowDelegateClick'
				},
				'#documentPanel button[action=delete]': {
					click: 'onDocumentDeleteClick'
				},				
				'taskdetails': {
					render: 'onTaskDetailsRender'
				}
				/*
				'taskdetails #commentPanel toolbar button[action=expand]' : {
					click: 'onExpandAllCommentRows'
				},
				'taskdetails #commentPanel toolbar button[action=collapse]' : {
					click: 'onCollapseAllCommentRows'
				}*/
			}
		});
		
		Ext.util.Observable.observe(Workflow, {
			scope: me,
			taskreassign: 'onTaskReassign',
			taskdelegate: 'onTaskDelegate',
			taskresolved: 'onTaskDelegationResolved',
			taskclaim: 'onTaskClaim',
			transition: 'onWorkflowTransition',
			statusupdate: 'onStatusUpdate'
		});	
    },	
	
	getSearchValue: function (value) {
        if (value === '') {
            return null;
        }
        try {
           new RegExp(value);
		} catch(error) {
			return null;
		}
		if (value === '^' || value === '$') {
			return null;
		}	
        return value;
    },
	resetMyTaskView: function () {
		this.getWorkflowTasksStore().load();		
		this.getTaskContainer().removeAll();		
	},
	
	onMyTasksTabClick: function (tab) {
		var selector = this.getTaskSelector();
		selector.getStore().load();
	},
	onProcessesTabClick: function (tab) {
		this.getAllWorkflowInstancesStore().load();		
	},
	onTaskSelectorViewClick: function () {
		return false;
	},
	onMyTasksRender: function (cmp) {
		var taskStore = cmp.down('taskselector').getStore();
		
		taskStore.load();		
	},
	onSearchFieldChange: function (field, newValue) {
		var searchValue = this.getSearchValue(newValue),
			selector = this.getTaskSelector(),
			store = selector.getStore(),
			searchRegExp;
		if (searchValue !== null) {
            searchRegExp = new RegExp(searchValue, 'gi');
			 store.filterBy(function (record) {
				var key, recordMatch;
				for (key in record.data) {
					if (record.data.hasOwnProperty(key)) {
						recordMatch = String(record.data[key]).match(searchRegExp) ? true : false;
						if (recordMatch) {
							return true;
						}
					}
				}
				return false;
			});
		} else {
			store.clearFilter();
		}
	},
	onResetMyTaskSearch: function (field) {
		var selector = this.getTaskSelector(),			
			store = selector.getStore();
		store.clearFilter();
	},
	onDocumentDeleteClick: function (button) {		
		try {
            var docPanel = button.up('grid'),
				docStore = docPanel.getStore(),
				selectedRecord = docPanel.getSelectionModel().getSelection();            
            if (!Ext.isEmpty(selectedRecord)) {                
                docStore.remove(selectedRecord);				
            } else {                
                Ext.MessageBox.alert('Error', 'There is no record selected to perfrom operation on.');
            }
        } catch (e) {
            Ext.MessageBox.alert('Error', 'There was a problem performing your action. <br><br>' + e.message);
        }
	},
	/* Workflow Instance setup - Promises implementation
	onTaskClick: function (view, task) {		
		try {
			var taskContainer = this.getTaskContainer();				
			
			taskContainer.setLoading(true);
			taskContainer.removeAll();
			
			Workflow.engine.Runtime.getProcessInstanceFromTask(task).then(this, function (processInstance) {
				var taskForm = processInstance.getTaskForm();
				taskContainer.add(taskForm);
				taskContainer.setLoading(false);
			});
			
		} catch (e) {
			taskContainer.setLoading(false);
			var msg = 'There was a problem performing the selected operation. <br><br>' + e.message;;
			Ext.MessageBox.alert('Error', msg);
		}
	},
	*/
	onTaskClick: function (view, task) {		
		var taskContainer = this.getTaskContainer(),
			workflowID = task.get('WorkflowInstance_ID');
		taskContainer.setLoading(true);
		
		this.getWorkflowInstancesStore().load({
			scope: this,
			params: {				
				query: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Number">' + workflowID + '</Value></Eq></Where></Query>'			
			},
			callback: function (records) {
				var workflowInstance = records[0];					
				if (workflowInstance) {
					this.selectTask(workflowInstance, task);					
				}
			}
		});	
	},
	selectTask: function (workflowInstance, task) {
		try {
			var globals = Task.config.Globals,
				taskContainer = this.getTaskContainer(),
				metaType = workflowInstance.get('MetaType'),
				wfId = workflowInstance.get('ID'),
				metaStore = this.getMetaTypeStore(metaType),
				className  = 'Custom.meta.' + metaType;				
			
			if (metaStore) {
				metaStore.load({
					scope: this,
					params: {
						query: '<Query><Where><Eq><FieldRef Name="WorkflowInstance" LookupId="TRUE" /><Value Type="Lookup">' + wfId + '</Value></Eq></Where></Query>'
					},
					callback: function (records) {
						if (records.length) {
							var detailRecord = records[0],								
								wf = Ext.create('Workflow', {
									appPath: globals.baseUrl + '/' + globals.appPath,
									currentUserId: globals.currentUserID,
									workflowInstance: workflowInstance,
									currentTask: task,
									currentDetailItem: detailRecord
								});
							/*
							wf = Workflow.Engine.initProcessFromInstance(workflowInstance, task, detailRecord);							
							if (wf) {
							*/
								wf.getWFConfigFromCurrentTask(function (config) {
									var metaDetail = Ext.create(className, {
										record: detailRecord
									});									
																	
									taskContainer.removeAll();
									taskContainer.add({
										xtype: 'taskdetails',
										workflowConfig: config,									
										detail: metaDetail
									});
									taskContainer.setLoading(false);
								}, this);
							/*}*/
						}
					}
				});
			} else {
				Ext.Error.raise({
					msg: 'Detail Store not found"',
					code: 100
				});
			}			
		} catch (e) {
			taskContainer.setLoading(false);
			var msg = 'There was a problem performing the selected operation. <br><br>' + e.message;
			Ext.MessageBox.alert('Error', msg);
		}
	},
	getMetaTypeStore: function (storeId) {
        var store = Ext.StoreManager.get(storeId);

        if (!store) {
            store = Ext.create('Custom.store.' + storeId, {
                storeId: storeId
            });            
        }
        return store;
    },
	//{ Workflow Engine Event Handlers
	onWorkflowTransition: function (success) {
		this.resetMyTaskView(true);		
	},
	onTaskReassign: function (task, newAssignee, oldAssignee) {
		this.resetMyTaskView(true);
	},
	onTaskDelegate: function (task, newAssignee, owner) {
		this.resetMyTaskView(true);
	},
	onTaskDelegationResolved: function (task, assignee, owner) {
		this.resetMyTaskView(true);
	},
	onTaskClaim: function (wfi, task, currentUser, group) {
		this.selectTask(wfi, task);
	},
	onStatusUpdate: function (status, submit) {
		var statusAlert = this.getStatusAlert().getEl();
			
		Custom.extension.StatusAlert.alert(status, statusAlert);
	},
	//}
	//{ -----------May need to move into the workflow engine classes
	onCompleteWorkflowTaskClick: function (button) {
		var action = button.action,
			taskDetails = button.up('taskdetails'),
			actionForm = taskDetails.down('#workflowAction'),
			wfConfig = taskDetails.getWorkflowConfig(),
			workflow;
		
		if (actionForm.isValid()) {
			workflow = wfConfig.workflow;
			workflow.processTaskCompleteAction(action, actionForm);			
		}
	},
	onResolveWorkflowTaskClick: function (button) {
		var taskDetails = button.up('taskdetails'),
			actionForm = taskDetails.down('#workflowAction'),
			wfConfig = taskDetails.getWorkflowConfig(),
			workflow;
		
		if (actionForm.isValid()) {
			workflow = wfConfig.workflow;
			workflow.processTaskResolveAction(actionForm);			
		}
	},
	onWorkflowAddCommentClick: function (button) {
		var taskDetails = button.up('taskdetails'),
			wfConfig = taskDetails.getWorkflowConfig(),
			workflow;
		
		workflow = wfConfig.workflow;
		workflow.addCommentToWorkflow();
	},
	onWorkflowReassignClick: function (button) {
		var taskDetails = button.up('taskdetails'),
			wfConfig = taskDetails.getWorkflowConfig(),
			workflow;
		
		workflow = wfConfig.workflow;
		workflow.reassignCurrentTask();
	},
	onWorkflowTaskClaimClick: function (button) {
		var config = Task.config.Globals,
			taskDetails = button.up('taskdetails'),
			wfConfig = taskDetails.getWorkflowConfig(),
			workflow;
		
		workflow = wfConfig.workflow;
		workflow.claimCurrentTask(config.currentUserUpdateValue);
	},
	onWorkflowDelegateClick: function (button) {
		var taskDetails = button.up('taskdetails'),
			wfConfig = taskDetails.getWorkflowConfig(),
			workflow;
		
		workflow = wfConfig.workflow;
		workflow.delegateCurrentTask();
	},
	onTaskDetailsRender: function (panel) {
		var actionPanel = panel.down('#workflowAction'),
			loadRecord = actionPanel.loadDetailRecord,
			detail;
		if (loadRecord) {
			detail = panel.getDetail().getRecord();
			actionPanel.loadRecord(detail);
		}
	}
	//}--------------
});
/* Original Workflow Instance Setup Functions
	onTaskClick: function (view, task) {		
		var taskContainer = this.getTaskContainer(),
			workflowID = task.get('WorkflowInstance_ID');
		taskContainer.setLoading(true);
		
		this.getWorkflowInstancesStore().load({
			scope: this,
			params: {				
				query: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Number">' + workflowID + '</Value></Eq></Where></Query>'			
			},
			callback: function (records) {
				var workflowInstance = records[0];					
				if (workflowInstance) {
					this.selectTask(workflowInstance, task);					
				}
			}
		});	
	},
	selectTask: function (workflowInstance, task) {
		try {
			var taskContainer = this.getTaskContainer(),
				metaType = workflowInstance.get('MetaType'),
				wfId = workflowInstance.get('ID'),
				metaStore = this.getMetaTypeStore(metaType),
				className  = 'Custom.meta.' + metaType;				
			
			if (metaStore) {
				metaStore.load({
					scope: this,
					params: {
						query: '<Query><Where><Eq><FieldRef Name="WorkflowInstance" LookupId="TRUE" /><Value Type="Lookup">' + wfId + '</Value></Eq></Where></Query>'
					},
					callback: function (records) {
						if (records.length) {
							var detailRecord = records[0],								
								wf;
							
							wf = Workflow.Engine.initProcessFromInstance(workflowInstance, task, detailRecord);							
							if (wf) {
								wf.getWFConfigFromCurrentTask(function (config) {
									var metaDetail = Ext.create(className, {
										record: detailRecord
									});									
																	
									taskContainer.removeAll();
									taskContainer.add({
										xtype: 'taskdetails',
										workflowConfig: config,									
										detail: metaDetail
									});
									taskContainer.setLoading(false);
								}, this);
							}
						}
					}
				});
			} else {
				Ext.Error.raise({
					msg: 'Detail Store not found"',
					code: 100
				});
			}			
		} catch (e) {
			taskContainer.setLoading(false);
			var msg = 'There was a problem performing the selected operation. <br><br>' + e.message;;
			Ext.MessageBox.alert('Error', msg);
		}
	},
	getMetaTypeStore: function (storeId) {
        var store = Ext.StoreManager.get(storeId);

        if (!store) {
            store = Ext.create('Custom.store.' + storeId, {
                storeId: storeId
            });            
        }
        return store;
    },
	*/
	