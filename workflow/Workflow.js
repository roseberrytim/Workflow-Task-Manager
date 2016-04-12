/* global Ext, L_Menu_BaseUrl, window, Sharepoint */
	/**
     * @method name of method
     * @member Workflow
     * Basic Description of Method Goes Here
     * 
     * 
     * 
     *   
     * @param {Function/String/Array/Number/Object/Boolean} parameterName Description of what parameter is
     * @param {Function/String/Array/Number/Object/Boolean} [optional] Optional parameter is listed inside brackets
     * @return {Function/String/Array/Number/Object/Boolean} Description of what is returned
     */
Ext.define('Workflow', {
    requires: ['Ext.util.Observable', 'Ext.window.MessageBox', 'Ext.form.field.*'],
    mixins: {
        observable: 'Ext.util.Observable'
    },
    /**
	 * @property {String}
	 * The url path of site where the workflow engine is deployed.
	 */
	baseUrl: window.location.protocol + '//' + window.location.host + L_Menu_BaseUrl,
    /**
	 * @property {String}
	 * Name of the custom SharePoint Workflow that is deployed to the "Tasks" list to handle custom email notifications
	 */
	notificationWorkflowName: 'SendEmail',    
	/**
	 * @property {Function}
	 * Name of the SharePoint Document Library where WorkflowInstance documents are stored.
	 */
	detailsLibrary: 'SupportingDocuments',
    config: {
        currentDetailItem: null,
        workflowInstance: null,
        currentTask: null,
        rolesStore: null,
        usersStore: null,
        tasksStore: null,
        historyStore: null,
		notificationsStore: null,
        workflowNodes: null,
        historyManager: null,
        transitionParameters: {},
        processVariable: {},
        workflowVariable: {},
        taskVariable: {},
        inputVariable: {},
        model: null,
		appPath: '',
		currentUserId: '',
        eventDomain: null
    },
    // 15 / 2
	constructor: function(config) {		
        var me = this,
            model, workflowStore, activityStores;

        me.initConfig(config);
        me.mixins.observable.constructor.call(me, config);

        model = me.workflowInstance.get('Model');
        workflowStore = Ext.data.StoreManager.lookup('Workflows');

        me.rolesStore = Ext.data.StoreManager.lookup('Roles');
        me.usersStore = Ext.data.StoreManager.lookup('Users');
        me.tasksStore = Ext.data.StoreManager.lookup('WorkflowManagedTasks');
        me.historyStore = Ext.data.StoreManager.lookup('WorkflowHistory');
		me.notificationsStore = Ext.data.StoreManager.lookup('Notifications');
		
        me.model = workflowStore.findRecord('title', model);

        if (me.model) {
            me.workflowNodes = me.model.getNodes();
            activityStores = me.model.get('stores');
            me.setupActivityRequiredStores(activityStores);
        }

        me.addEvents(
            'taskreassign',
			'taskdelegate',
			'taskresolved',
			'taskclaim',
            'notifcationsent',
            'transition',
            'statusupdate'			
        );

    },

    //{ **********          Workflow Event Handlers        **********    
	/**
     * @method startWorkflow
     * @member Workflow
     * Automatically process and transition the current Workflow Engine's configured Workflow Model's 'startEvent' node.
	 *
	 * The 'startEvent' node is expected to always be configured with an "id" of '0' and contain at least on transition
	 * configuration of "action" set to 'auto' 
	 *
	 *  {
	 *		"id": 0,
	 *		"type": "startEvent",
	 *		"transitions": [{
	 *			"type": "serial",
	 *			"nodes": [50],
	 *			"action": "auto"
	 *		}]
	 *	}
	 *
     */
	startWorkflow: function() {
        this.logHistory('Workflow Start');
		this.sendWorkflowStartNotification();
		this.processWorkflowTransition(0, 'auto');
        this.setWorkflowInstanceStarted();
    },
    /**
     * @method endWorkflow
     * @member Workflow
     * Process and 'Complete' the current Workflow Engine's configured Workflow Instantiation.
	 *
	 */
	endWorkflow: function() {
        this.setWorkflowInstanceCompleted();
        this.logHistory('Workflow End');
    },
	/**
     * @method cancelWorkflow
     * @member Workflow
     * Process and 'Cancel' the current Workflow Engine's configured Workflow Instantiation.
	 *
	 */
	cancelWorkflow: function() {
        this.logHistory('Workflow Cancelled');
        // Get all workflow task(Start and Complete)
        // Send notification to those task assignees
        // Update status of all workflow tasks to "Cancelled"


    },
    //} End Workflow Event Handlers Section

    //{ **********      Task Manager Application Hooks     **********
    // 3 / 2
	processTaskCompleteAction: function(action, actionForm) {
        var task = this.getCurrentTask(),
            nodeId = task.get('CurrentNode'),
            node = this.getWorkflowNode(nodeId);

        if (node) {
            this.processNodeActivity(node, action, actionForm, false);
        }
    },
    // 3 / 2
	processTaskResolveAction: function(actionForm) {
        var task = this.getCurrentTask(),
            nodeId = task.get('CurrentNode'),
            node = this.getWorkflowNode(nodeId);

        if (node) {
            this.processNodeActivity(node, 'resolved', actionForm, true);
        }
    },
    //}

    //{ **********  Workflow Task Activity Config Helpers  **********
    // 12 / 3
	getWFConfigFromCurrentTask: function(callback, scope) {
        var me = this,
            model = me.getModel(),
            meta = model.get('metadata'),
            currentTask = me.getCurrentTask(),
            nodeId = currentTask.get('CurrentNode'),
            delegationState = currentTask.get('DelegationState'),
            node = me.getWorkflowNode(nodeId),
            delegated, generateConfig, activity, activityType, config, scopeVariables;

        if (node) {
            delegated = (delegationState !== null && delegationState === 'Pending');
            generateConfig = function(node) {
                var wfi = me.getWorkflowInstance(),
                    wfiId = wfi.get('ID'),
                    wfiGUID = wfi.get('Title'),
                    wfActionPanel = me.getWorkflowActionPanelFromNode(node, delegated),
                    comments = wfi.getWorkflowInstanceComments(),
                    history = wfi.getWorkflowInstanceHistory(),
                    documents = wfi.getWorkflowDocuments(),
                    path = me.detailsLibrary + '/' + wfiGUID,
                    allowDocumentEdit = node.get('allowDocumentEdit');

                comments.load({
                    scope: this,
                    params: {
                        query: '<Query><Where><Eq><FieldRef Name="WorkflowInstance" LookupId="TRUE" /><Value Type="Lookup">' + wfiId + '</Value></Eq></Where></Query>'
                    }
                });
                history.load({
                    scope: this,
                    params: {
                        query: '<Query><Where><Eq><FieldRef Name="WorkflowInstance" LookupId="TRUE" /><Value Type="Lookup">' + wfiId + '</Value></Eq></Where></Query>'
                    }
                });
                documents.load({
                    scope: this,
                    params: {
                        queryOptions: '<QueryOptions><IncludeAttachmentUrls>True</IncludeAttachmentUrls><Folder>' + path + '</Folder></QueryOptions>'
                    }
                });

                return Ext.apply({}, {
                    workflow: me,
                    metaData: meta,
                    commentsStore: comments,
                    historyStore: history,
                    documentsStore: documents,
                    allowDocumentEdit: allowDocumentEdit,
                    actionPanel: wfActionPanel,
                    workflowInstance: wfi,
                    workflowID: wfiId,
                    workflowGUID: wfiGUID
                });
            };

            activity = node.get('activity');
            activityType = activity.type;

            scopeVariables = currentTask.get('Scope');
            if (scopeVariables) {
                this.setTaskVariable(Ext.decode(scopeVariables));
            }

            config = generateConfig(node);
            Ext.callback(callback, scope, [config]);
        }

        return false;
    },
    // 35 / 18
	getWorkflowActionPanelFromNode: function(node, delegated) {
        delegated = delegated || false;
        var wfi = this.getWorkflowInstance(),
            currentRecord = this.getCurrentDetailItem(),
            activity = node.get('activity'),
            activityType = activity.type,
            activityParameters = activity.parameters || false,
            stores = activity.stores || false,
            wfiId = wfi.get('UpdateValue'),
            wfTitle = wfi.get('Title'),
            nodeName = node.get('name'),
            nodeDescription = node.get('description'),
            loadRec = false,
            isGroupAssignment = this.isGroupAssignment(),
            actionItems, toolbar, fields, approveText, rejectText;
        if (stores) {
            this.setupActivityRequiredStores(stores);
        }
        actionItems = [{
            xtype: 'component',
            html: '<div class="action-description-header"><h1>' + nodeName + '</h1><p>' + nodeDescription + '</p></div>'
        }];
        toolbar = ['->'];
        if (isGroupAssignment) {
            toolbar.push({
                action: 'claim',
                text: 'Claim',
                scale: 'medium',
                tooltip: 'Claim task as your own'
            });
        }
        if (delegated) {
            toolbar.push({
                actionType: 'taskresolve',
                action: 'resolve',
                scale: 'medium',
                text: 'Resolve',
                tooltip: 'Resolve this delegated task and send response back to task owner'
            });
        }
        switch (activityType) {
            case 'AddDocuments':
                {
                    actionItems.push({
                        xtype: 'uploadbutton',
                        itemId: 'uploadButton',
                        store: 'WorkflowInstancesLibrary',
                        instance: wfTitle
                    });
                }
				/* falls through */
            case 'UpdateCurrentDetailItem':
                {
                    loadRec = true;
                }
				/* falls through */
            case 'PromptForInput':
                {
                    fields = activity.fields;
                    if (fields) {
                        if (Ext.isArray(fields)) {
                            Ext.each(fields, function(field) {
                                if (field.value) {
                                    field.value = this.parseExpressionFromString(field.value);
                                }
                                actionItems.push(field);
                            }, this);
                        } else {
                            actionItems.push(fields);
                        }
                    }
                    toolbar.push({
                        actionType: 'taskcomplete',
                        action: 'submit',
                        hidden: delegated,
                        scale: 'medium',
                        text: 'Complete',
                        tooltip: 'Complete step and create new step in workflow'
                    }, {
                        action: 'comment',
                        scale: 'medium',
                        text: 'Comment',
                        tooltip: 'Provide comment on selected task'
                    }, {
                        action: 'ActionMenu',
                        scale: 'medium',
                        text: 'Actions',
                        menu: [{
                            action: 'reassign',
                            text: 'Reassign',
                            tooltip: 'Reassing task to another user'
                        }, {
                            action: 'delegate',
                            hidden: delegated,
                            text: 'Delegate',
                            tooltip: 'Delegate task completion to another user'
                        }]
                    });
                    break;
                }
            case 'SendNotification':
                {
                    actionItems.push({
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        baseCls: 'x-plain',
                        bodyStyle: 'padding:5px 5px 5px 5px',
                        items: [{
                            xtype: 'textarea',
                            fieldLabel: 'To',
                            labelWidth: 50,
                            name: 'to',
                            autoScroll: true,
                            allowBlank: false,
                            regex: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
                            regexText: 'This field should be an e-mail address in the format "user@example.com" and multiple addresses delimited with a ";"'
                        }, {
                            xtype: 'textarea',
                            name: 'cc',
                            fieldLabel: 'CC',
                            labelWidth: 50,
                            autoScroll: true,
                            allowBlank: true,
                            regex: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
                            regexText: 'This field should be an e-mail address in the format "user@example.com" and multiple addresses delimited with a ";"'
                        }, {
                            xtype: 'textfield',
                            name: 'subject',
                            allowBlank: false,
                            labelWidth: 50,
                            fieldLabel: 'Subject',
                            regex: /^[a-zA-Z0-9_.:;\-" "()]+$/,
                            maxLength: 255
                        }]
                    }, {
                        xtype: 'htmleditor',
                        itemId: 'body',
                        name: 'body',
                        padding: '2 0 0 0',
                        flex: 1
                    });
                    toolbar.push({
                        actionType: 'taskcomplete',
                        action: 'submit',
                        hidden: delegated,
                        scale: 'medium',
                        text: 'Complete',
                        tooltip: 'Complete step and create new step in workflow'
                    }, {
                        action: 'comment',
                        scale: 'medium',
                        text: 'Comment',
                        tooltip: 'Provide comment on selected task'
                    }, {
                        action: 'ActionMenu',
                        scale: 'medium',
                        text: 'Actions',
                        menu: [{
                            action: 'reassign',
                            text: 'Reassign',
                            tooltip: 'Reassing task to another user'
                        }, {
                            action: 'delegate',
                            hidden: delegated,
                            text: 'Delegate',
                            tooltip: 'Delegate task completion to another user'
                        }]
                    });
                    break;
                }
            case 'Approval':
                {
                    approveText = activity.approveText || "Approve";
                    rejectText = activity.rejectText || "Reject";
                    actionItems.push({
                        xtype: 'htmleditor',
                        name: 'Comment',
                        fieldLabel: 'Comment',
                        height: 200,
                        enableFont: false,
                        enableFontSize: false,
                        enableAlignments: false,
                        enableSourceEdit: false
                    }, {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'WorkflowInstance',
                        value: wfiId
                    });

                    toolbar.push({
                        actionType: 'taskcomplete',
                        hidden: delegated,
                        action: 'approve',
                        scale: 'medium',
                        text: approveText,
                        tooltip: approveText + ' the current task and advance the workflow'
                    }, {
                        actionType: 'taskcomplete',
                        hidden: delegated,
                        action: 'reject',
                        scale: 'medium',
                        text: rejectText,
                        tooltip: rejectText + ' the current task'
                    }, {
                        action: 'comment',
                        scale: 'medium',
                        text: 'Comment',
                        tooltip: 'Add a new comment to the workflow'
                    }, {
                        action: 'subaction',
                        scale: 'medium',
                        text: 'Actions',
                        menu: [{
                            action: 'reassign',
                            text: 'Reassign',
                            tooltip: 'Reassing task to another user'
                        }, {
                            action: 'delegate',
                            hidden: delegated,
                            text: 'Delegate',
                            tooltip: 'Delegate task completion to another user'
                        }]
                    });
                    break;
                }
            case 'CollectFeedback':
                {
                    actionItems.push({
                        xtype: 'htmleditor',
                        name: 'Comment',
                        fieldLabel: 'Comment',
                        height: 200,
                        enableFont: false,
                        enableFontSize: false,
                        enableAlignments: false,
                        enableSourceEdit: false
                    }, {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'WorkflowInstance',
                        value: wfiId
                    });

                    toolbar.push({
                        actionType: 'taskcomplete',
                        hidden: delegated,
                        action: 'submit',
                        scale: 'medium',
                        text: 'Complete',
                        tooltip: 'Complete step and create new step in workflow'
                    }, {
                        action: 'comment',
                        scale: 'medium',
                        text: 'Comment',
                        tooltip: 'Save comment without completing the workflow task'
                    }, {
                        action: 'ActionMenu',
                        scale: 'medium',
                        text: 'Actions',
                        menu: [{
                            action: 'reassign',
                            text: 'Reassign',
                            tooltip: 'Reassing task to another user'
                        }, {
                            action: 'delegate',
                            hidden: delegated,
                            text: 'Delegate',
                            tooltip: 'Delegate task completion to another user'
                        }]
                    });
                    break;
                }
            case 'CustomInput':
                {
                    // Still need to update form with custom form
                    toolbar.push({
                        actionType: 'taskcomplete',
                        hidden: delegated,
                        action: 'submit',
                        scale: 'medium',
                        text: 'Complete',
                        tooltip: 'Complete step and create new step in workflow'
                    }, {
                        action: 'comment',
                        scale: 'medium',
                        text: 'Comment',
                        tooltip: 'Provide comment on selected task'
                    }, {
                        action: 'ActionMenu',
                        scale: 'medium',
                        text: 'Actions',
                        menu: [{
                            action: 'reassign',
                            text: 'Reassign',
                            tooltip: 'Reassing task to another user'
                        }, {
                            action: 'delegate',
                            hidden: delegated,
                            text: 'Delegate',
                            tooltip: 'Delegate task completion to another user'
                        }]
                    });

                    return Ext.create(activity.requires, {
                        workflow: this,
                        loadDetailRecord: loadRec,
                        workflowInstance: wfi,
                        activityParameters: activityParameters,
                        detailRecord: currentRecord,
                        title: nodeName,
                        description: nodeDescription,
                        flex: 1,
                        itemId: 'workflowAction',
                        tbar: toolbar
                    });                    
                }
            default:
                {
                    break;
                }
        }
        return Ext.create('Ext.form.Panel', {
            loadDetailRecord: loadRec,
            title: nodeName,
            flex: 1,
            itemId: 'workflowAction',
            autoScroll: true,
            bodyPadding: 5,
            tbar: toolbar,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: actionItems
        });
    },
    // 6 / 3
	setupActivityRequiredStores: function(stores) {
        var sl = stores.length,
            i = 0,
            store, storeId;
        for (i; i < sl; i++) {
            storeId = stores[i];
            store = Ext.StoreManager.get(storeId);
            if (!store) {
                Ext.create('Custom.store.' + storeId, {
                    storeId: storeId
                });
            }
        }
    },
	// 8 / 4
	getWorkflowTasksConfig: function(transition) {
        var nodes = this.getTransitionNode(transition),
            parameters = this.getTransitionNodeParameters(transition),
            tasks = [];

        this.setTransitionParameters(parameters);

        Ext.each(nodes, function(node) {
            var type = node.get('type'),
                task;

            if (type) {
                task = this['processNode_' + type](node);

                if (task) {
                    if (Ext.isArray(task)) {
                        Ext.each(task, function(t) {
                            tasks.push(t);
                        });
                    } else {
                        tasks.push(task);
                    }
                }
            } else {
                return false;
            }
        }, this);
        return tasks;
    },
    // 5 / 2
	createWorkflowTasks: function(tasks, callback) {
        var store = this.getTasksStore(),
            records;
        if (store) {
            records = store.add(tasks);
            store.sync({
                scope: this,
                callback: callback
            });
        }
        return records;
    },
    // 2 / 2
	getWorkflowNode: function(nodeId) {
        var nodes = this.workflowNodes;
        return nodes ? nodes.getById(nodeId) : false;
    },
    // 7 / 3
	getAssignee: function(assigneeCollection) {
        var assignees = [],
            assignee, i, len;
        if (Ext.isArray(assigneeCollection)) {
            len = assigneeCollection.length;
            for (i = 0; i < len; i++) {
                assignee = assigneeCollection[i];
                assignees.push(this.parseExpressionFromString(assignee));
            }
        }
        return assignees;
    },
    // 12 / 7
	getTaskConfigs: function(node, status) {
        var instance = this.getWorkflowInstance(),
            assignee = this.getAssignee(node.get('assignee')),
            group = this.parseExpressionFromString(node.get('group')),
            now = new Date(),
            individualTasks = node.get('individualTasks'),
            nodeId = node.get('id'),
            nodeName = node.get('name'),
            createListener = this.getCreateListener(node),
            workflowTitle = instance.get('WorkflowTitle'),
            instanceID = instance.get('UpdateValue'),
            transitionParameters = this.getTransitionParameters(),
            scopeVariables = Ext.encode(transitionParameters),
            configs = [],
			startDate = Ext.Date.format(now, 'Y-m-d H:i:s');

        // TODO: Need to process Due Date

        if (individualTasks && !Ext.isEmpty(assignee)) {
            //["12;Test", "14;#66th ABG;#13;#88th ABW"]
            // need to account for the possibility of the above assignee value
            Ext.each(assignee, function(a) {
                configs.push(Ext.apply({}, {
                    Title: workflowTitle,
                    AssignedTo: a,
                    ParentTask: group,
                    CurrentNode: nodeId,
                    CurrentNodeName: nodeName,
                    StartDate: startDate,
                    Status: status || 'Started',
                    Scope: scopeVariables,
                    WorkflowInstance: instanceID
                }));
            }, this);
        } else {
            assignee = assignee.join(';#');
            configs.push(Ext.apply({}, {
                Title: workflowTitle,
                AssignedTo: assignee,
                ParentTask: group,
                CurrentNode: nodeId,
                CurrentNodeName: nodeName,
                StartDate: startDate,
                Status: status || 'Started',
                Scope: scopeVariables,
                WorkflowInstance: instanceID
            }));
        }
        // This is only taking to account delegate class listener and not a script delegate which would be just a function instead of a class
        if (createListener) {
            try {
                var delegateClass = createListener.get('class'),
                    delegate = Ext.create(delegateClass),
                    delegateFn = delegate.notify || false;

                if (delegateFn && (typeof delegateFn === 'function')) {
                    //delegateFn.apply(this, [configs, node, instance]);
                    configs = delegateFn.call(this, configs, node, instance);
                }
            } catch (e) {

            }
        }

        return configs;
    },
    // 2 / 1
	getCreateListener: function(node) {
        var listener = node.getListeners().findRecord('event', 'create');
        return listener;
    },
    // 2 / 1
	isGroupAssignment: function() {
        var currentTask = this.getCurrentTask(),
            assignee = currentTask.get('AssignedTo'),
            rolesStore = this.rolesStore,
			role = rolesStore.findRecord('Group', assignee);
        return role !== null;
    },
    // 2 / 1
	getWorkflowDocumentLibraryPath: function() {
        var wf = this.getWorkflowInstance(),
            wfGUID = wf.get('Title'),
            path = this.baseUrl + '/' + this.detailsLibrary + '/' + wfGUID + '/';
        return path;
    },
    //} End Workflow Task Activity Configs Section

    //{ **********      Workflow Task Action Handlers      **********
    // 3 / 1
	addCommentToWorkflow: function() {
        var win = this.buildCommentWindow();
        win.show();
        return win;
    },
	// 3 / 1
    reassignCurrentTask: function() {
        var win = this.buildReassignWindow();
        win.show();
        return win;
    },
    // 5 / 2
	claimCurrentTask: function(currentUser) {
        var currentTask = this.getCurrentTask(),
            wfi = this.getWorkflowInstance(),
            current;
        if (currentTask) {
            current = currentTask.get('fAssignedTo');
            currentTask.set('AssignedTo', currentUser);
            currentTask.save({
                scope: this,
                callback: function() {
                    this.logHistory('Task Activity Claimed from "' + current + '" to "' + currentUser + '"');
                    this.fireEvent('taskclaim', wfi, currentTask, currentUser, current);
                }
            });
        }
    },
    // 3 / 1
	delegateCurrentTask: function() {
        // Set the DelegationState field to 'PENDING' and then set Delegator field to existing AssignedTo value.
        //Create form to allow user to select from combo name of User from the Users Stors

        var win = this.buildDelegateWindow();
        win.show();
        return win;
    },
    // 7 / 2
	completeCurrentTask: function(callback, scopeCB) {
        var currentTask = this.getCurrentTask(),
            now = new Date(),
            nodeName;
        if (currentTask) {
            nodeName = currentTask.get('CurrentNodeName');
            currentTask.set('Status', 'Complete');
            currentTask.set('CompleteDate', Ext.Date.format(now, 'Y-m-d H:i:s'));
            currentTask.save({
				scope: scopeCB,
				callback: callback
			});
            this.logHistory('Task Activity "' + nodeName + '" - Complete');
        }
    },
    // 10 / 2
	resolveCurrentTaskDelegation: function() {
        var currentTask = this.getCurrentTask(),
            current, owner, nodeName, inputVariable, currentScope, scope;
        if (currentTask) {
            nodeName = currentTask.get('CurrentNodeName');
            current = currentTask.get('AssignedTo');
            owner = currentTask.get('Owner');
            currentScope = this.getTaskVariable();
            inputVariable = this.getInputVariable();
            scope = Ext.apply(currentScope, {
                delegatedResponse: inputVariable
            });
            currentTask.set({
                'DelegationState': 'Resolved',
                'AssignedTo': owner,
                'Scope': Ext.encode(scope)
            });
            currentTask.save({
                scope: this,
                callback: function() {
                    this.logHistory('Task Activity "' + nodeName + '" - Delegation Resolved by "' + current + '". Returning to "Owner" - "' + owner + '"');
                    this.fireEvent('taskresolved', currentTask, current, owner);
                }
            });
        }

    },
    // 6 / 2
	setCurrentTaskAssignee: function(assignee) {
        var currentTask = this.getCurrentTask(),
            current, nodeName;
        if (currentTask) {
            nodeName = currentTask.get('CurrentNodeName');
            current = currentTask.get('AssignedTo');
            currentTask.set('AssignedTo', assignee);
            currentTask.save({
                scope: this,
                callback: function() {
                    this.logHistory('Task Activity "' + nodeName + '" - Reassigned from "' + current + '" to "' + assignee + '"');
                    this.fireEvent('taskreassign', currentTask, assignee, current);
                }
            });
        }
    },
    // 6 / 2
	setCurrentTaskDelegation: function(assignee) {
        var currentTask = this.getCurrentTask(),
            current, nodeName;
        if (currentTask) {
            nodeName = currentTask.get('CurrentNodeName');
            current = currentTask.get('AssignedTo');
            currentTask.set({
                'DelegationState': 'Pending',
                'Owner': current,
                'AssignedTo': assignee
            });
            currentTask.save({
                scope: this,
                callback: function() {
                    this.logHistory('Task Activity "' + nodeName + '" - Delegated from "' + current + '" to "' + assignee + '"');
                    this.fireEvent('taskdelegate', currentTask, assignee, current);
                }
            });
        }
    },
    // 4 / 2
	setWorkflowInstanceStatus: function(state) {
        var wfi = this.getWorkflowInstance(),
            store = wfi.store;

        if (store) {
            wfi.set('Status', state);
            store.sync();
        }
    },
	// 4 / 2
    setWorkflowInstanceStarted: function() {
        var wfi = this.getWorkflowInstance(),
            store = wfi.store,
            now = new Date(),
            startTime = Ext.Date.format(now, 'Y-m-d H:i:s'),
			details = {
				"Status": 'In Progress',
				"StartTime": startTime
			};

        if (store) {
            wfi.set(details);
            store.sync();
        }
    },
	// 4 / 2
    setWorkflowInstanceCompleted: function() {
        var wfi = this.getWorkflowInstance(),
            store = wfi.store,
            now = new Date(),
            endTime = Ext.Date.format(now, 'Y-m-d H:i:s'),
			details = {
				"Status": 'Complete',
				"EndTime": endTime
			};

        if (store) {
            wfi.set(details);
            store.sync();
        }
    },
    // 2 / 1
	logHistory: function(title) {
        var wfi = this.getWorkflowInstance(),
            wf = wfi.get('UpdateValue'),
			historyStore = this.getHistoryStore();
			
        historyStore.add({
            Title: title,
            WorkflowInstance: wf
        });
    },
	// 6 / 3
	logHistoryFromCreatedTasks: function (tasks) {
		var wfi = this.getWorkflowInstance(),
			wf = wfi.get('UpdateValue'),
			historyStore = this.getHistoryStore(),
			tl = tasks.length,
			i = 0,
			logs = [],
			message;
		
		if (tl > 0) {
			for (i; i < tl; i++) {
				message = 'New Task Activity - "' + tasks[i].get('CurrentNodeName') + '"  assigned to - ' + tasks[i].get('fAssignedTo');
				logs.push({
					Title: message,
					WorkflowInstance: wf
				});
			}
			historyStore.add(logs);
		}
	},
    // 6 / 2
	buildCommentWindow: function() {
        var me = this,
            wfi = me.getWorkflowInstance(),
            commentStore = wfi.getWorkflowInstanceComments(),
            wfTitle = wfi.get('WorkflowTitle'),
            wfiId = wfi.get('UpdateValue');

        return Ext.create('Ext.window.Window', {
            title: 'New Comment - ' + wfTitle,
            x: 400,
            y: 150,
            height: 400,
            width: 600,
            autoShow: false,
            autoHeight: true,
            resizable: false,
            constrain: true,
            modal: true,
            defaultFocus: 'DefaultFocus',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: {
                padding: '2 2 2 2'
            },
            items: [{
                xtype: 'form',
                itemId: 'form',
                border: false,
                bodyPadding: '10 10 0 10',
                fieldDefaults: {
                    labelWidth: 100,
                    anchor: '100%'
                },
                defaultType: 'textfield',
                items: [
                    /*{
					xtype: 'textfield',
					name: 'Title',
					fieldLabel: 'Title',
					allowBlank: false
				},*/
                    {
                        xtype: 'htmleditor',
                        name: 'Comment',
                        fieldLabel: 'Comment',
                        height: 250,
                        enableFont: false,
                        enableFontSize: false,
                        enableAlignments: false,
                        enableSourceEdit: false
                    }, {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'WorkflowInstance',
                        value: wfiId
                    }
                ]
            }],
            buttons: [{
                text: 'Save',
                handler: function(button) {
                    var win = button.up('window'),
                        form = win.down('form'),
                        values;
                    if (form.isValid()) {
                        values = form.getValues();
                        Ext.apply(values, {
                            Title: 'Workflow - ' + values.WorkflowInstance + ' - Comment'
                        });
                        commentStore.add(values);
                        win.close();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(button) {
                    var win = button.up('window');
                    win.close();
                }
            }]
        });
    },
    // 4 / 2
	buildReassignWindow: function() {
        var me = this,
            usersStore = me.getUsersStore(),
            rolesStore = me.getRolesStore(),
            wfi = me.getWorkflowInstance(),
            wfTitle = wfi.get('WorkflowTitle');

        return Ext.create('Ext.window.Window', {
            title: 'Reassign Task - ' + wfTitle,
            x: 400,
            y: 150,
            height: 200,
            width: 400,
            autoShow: false,
            autoHeight: true,
            resizable: false,
            constrain: true,
            modal: true,
            defaultFocus: 'DefaultFocus',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: {
                padding: '2 2 2 2'
            },
            items: [{
                xtype: 'form',
                itemId: 'form',
                border: false,
                bodyPadding: '10 10 0 10',
                fieldDefaults: {
                    labelWidth: 100,
                    anchor: '100%'
                },
                items: [{
                    xtype: 'radiogroup',
                    checked: true,
                    fieldLabel: 'Assignee Type',
                    columns: 1,
                    items: [{
                        boxLabel: 'User',
                        name: 'assigneeType',
                        checked: true,
                        inputValue: 'user'
                    }, {
                        boxLabel: 'Role',
                        name: 'assigneeType',
                        checked: false,
                        inputValue: 'role'
                    }],
                    listeners: {
                        scope: me,
                        change: function(field, value) {
                            var form = field.up('form'),
                                combos = form.query('combo');
                            Ext.each(combos, function(combo) {
                                var name = combo.getName(),
                                    visible = name === value.assigneeType;
                                combo.reset();
                                combo.setVisible(visible);
                            });
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Name',
                    store: usersStore,
                    hidden: false,
                    name: 'user',
                    valueField: 'UpdateValue',
                    displayField: 'Name',
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Name',
                    hidden: true,
                    store: rolesStore,
                    name: 'role',
                    valueField: 'Group',
                    displayField: 'Title',
                    allowBlank: false
                }]
            }],
            buttons: [{
                text: 'Confirm',
                scope: me,
                handler: function(button) {
                    var win = button.up('window'),
                        form = win.down('form'),
                        values = form.getValues(),
                        type = values.assigneeType,
                        newAssignee = values[type];

                    if (newAssignee !== '') {
                        me.setCurrentTaskAssignee(newAssignee);
                        win.close();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(button) {
                    var win = button.up('window');
                    win.close();
                }
            }]
        });
    },
    // 4 / 2
	buildDelegateWindow: function() {
        var me = this,
            usersStore = me.getUsersStore(),
            rolesStore = me.getRolesStore(),
            wfi = me.getWorkflowInstance(),
            wfTitle = wfi.get('WorkflowTitle');

        return Ext.create('Ext.window.Window', {
            title: 'Delegate Task - ' + wfTitle,
            x: 400,
            y: 150,
            height: 200,
            width: 400,
            autoShow: false,
            autoHeight: true,
            resizable: false,
            constrain: true,
            modal: true,
            defaultFocus: 'DefaultFocus',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: {
                padding: '2 2 2 2'
            },
            items: [{
                xtype: 'form',
                itemId: 'form',
                border: false,
                bodyPadding: '10 10 0 10',
                fieldDefaults: {
                    labelWidth: 100,
                    anchor: '100%'
                },
                items: [{
                    xtype: 'radiogroup',
                    checked: true,
                    fieldLabel: 'Assignee Type',
                    columns: 1,
                    items: [{
                        boxLabel: 'User',
                        name: 'assigneeType',
                        checked: true,
                        inputValue: 'user'
                    }, {
                        boxLabel: 'Role',
                        name: 'assigneeType',
                        checked: false,
                        inputValue: 'role'
                    }],
                    listeners: {
                        scope: me,
                        change: function(field, value) {
                            var form = field.up('form'),
                                combos = form.query('combo');
                            Ext.each(combos, function(combo) {
                                var name = combo.getName(),
                                    visible = name === value.assigneeType;
                                combo.reset();
                                combo.setVisible(visible);
                            });
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Name',
                    store: usersStore,
                    hidden: false,
                    name: 'user',
                    valueField: 'UpdateValue',
                    displayField: 'Name',
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Name',
                    hidden: true,
                    store: rolesStore,
                    name: 'role',
                    valueField: 'Group',
                    displayField: 'Title',
                    allowBlank: false
                }]
            }],
            buttons: [{
                text: 'Confirm',
                scope: me,
                handler: function(button) {
                    var win = button.up('window'),
                        form = win.down('form'),
                        values = form.getValues(),
                        type = values.assigneeType,
                        newAssignee = values[type];

                    if (newAssignee !== '') {
                        me.setCurrentTaskDelegation(newAssignee);
                        win.close();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(button) {
                    var win = button.up('window');
                    win.close();
                }
            }]
        });
    },

    //} End Workflow Task Handlers Section

    //{ **********        Node (Step) Type Handlers        **********
    // 1 / 1
	processNode_userTask: function(node) {
        return this.getTaskConfigs(node, 'Started');
    },
    // 2 / 1
	processNode_endEvent: function(node) {
        this.endWorkflow();
        return false;
    },
    // 2 / 1
	processNode_systemTask: function(node) {
        this.processNodeActivity(node, 'auto');

        return false;
    },
    // 3 / 2
	processNode_taskgroup: function(node) {
        var taskConfigs = this.getTaskConfigs(node, 'Frozen');

        this.createWorkflowTasks(taskConfigs, function(batch, options) {
            // need to set current task to task group node task that was just created for each one
            Ext.each(batch.operations, function(op) {
                if (op.action === 'create') {
                    var records = op.getRecords();
                    this.processWorkflowGroupTransition(node, records);
                }
            }, this);
        });

        return false;
    },
    // 3 / 2
	processNode_gateway_taskgroup: function(node) {
        var nodeId = node.get('id'),
            workflowInstanceId = this.workflowInstance.get('ID'),
            currentNode = node.get('merge');

        this.getTasksStore().load({
            scope: this,
            params: {
                query: '<Query><Where><And><And><Eq><FieldRef Name="WorkflowInstance" LookupId="TRUE" /><Value Type="Lookup">' + workflowInstanceId + '</Value></Eq><Eq><FieldRef Name="CurrentNode" /><Value Type="Text">' + currentNode[0] + '</Value></Eq></And><Eq><FieldRef Name="Status" /><Value Type="Text">Frozen</Value></Eq></And></Where></Query>'
            },
            callback: function(records, operation, success) {
                var id = Ext.isEmpty(records) ? nodeId : false;
                this.processWorkflowTransition(id, 'auto');
            }
        });
        return false;
    },
    // 3 / 2
	processNode_parallelGateway: function(node) {
        var nodeId = node.get('id'),
            workflowInstanceId = this.workflowInstance.get('ID'),
            nodes = node.get('merge');

        this.tasksStore.load({
            scope: this,
            params: {
                query: '<Query><Where><And><And><Eq><FieldRef Name="WorkflowInstance" LookupId="TRUE" /><Value Type="Lookup">' + workflowInstanceId + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Text">Started</Value></Eq></And><Or><Eq><FieldRef Name="CurrentNode" /><Value Type="Text">' + nodes[0] + '</Value></Eq><Eq><FieldRef Name="CurrentNode" /><Value Type="Text">' + nodes[1] + '</Value></Eq></Or></And></Where></Query>'
            },
            callback: function(records, operation, success) {
                var id = Ext.isEmpty(records) ? nodeId : false;
                this.processWorkflowTransition(id, 'auto');
            }
        });
        return false;
    },
    // 0 / 1
	processNode_exclusiveGateway: function(node) {
        //Do the same with the parallel gateway but instead of started look for completed. And then find the node that was not completed and complete it

    },
    // 0 / 1
	processNode_subprocess: function(node) {

    },
    //} End Node Type Handlers Section

    //{ **********          Activity Type Handlers         **********
    // 10 / 7
	processNodeActivity: function(node, action, actionForm, delegated) {
        try {
			var nodeId = node.get('id'),
				activity = node.get('activity'),
				activityComplete = false,
				activityTypeFn = delegated ? 'processDelegatedActivity_' : 'processActivity_',
				processFn;

			if (activity && activity.type) {

				processFn = this[activityTypeFn + activity.type];

				if (processFn) {
					activityComplete = processFn.apply(this, arguments);
				}
			}
			if (activityComplete && !delegated) {
				this.completeCurrentTask(function () {
					this.processWorkflowTransition(nodeId, action);
				}, this);
			} else if (activityComplete && delegated) {
				this.resolveCurrentTaskDelegation();
			}		
		} catch (e) {
			var msg = 'An error occured processing the current workflow node activity. <br><br>' + e.message;
            Ext.MessageBox.alert('Error', msg);
		}
    },
    //{ 	********* 	System Task Activity Type Handlers 		*********
    // 5 / 2
	processActivity_CompleteTask: function(node) {
        var nodeId = node.get('id'),
            activity = node.get('activity'),
            taskId = this.parseExpressionFromString(activity.taskId);

        if (taskId) {
            taskId = this.parseSPLookupValues(taskId, true);
            this.getTasksStore().load({
                scope: this,
                params: {
                    query: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="number">' + taskId + '</Value></Eq></Where></Query>'
                },
                callback: function(records, operation, success) {
                    var record = records[0];
                    if (record) {
                        record.set('Status', 'Complete');
                        record.save({
                            scope: this,
                            callback: function() {
                                this.processWorkflowTransition(nodeId, 'auto');
                            }
                        });
                    }
                }
            });
        }
        return false;
    },
    // 5 / 2
	processActivity_UpdateCurrentDetailItem: function(node) {
        var currentItem = this.getCurrentDetailItem(),
            activity = node.get('activity'),
            fields = activity.fields || {};

        currentItem.beginEdit();
        Ext.iterate(fields, function(key, value) {
            var lookup = this.parseExpressionFromString(value);
            currentItem.set(key, lookup);
        }, this);
        currentItem.endEdit();

        return true;
    },
    // 3 / 1
	processActivity_SubProcess: function(node, action) {
        var nodeId = node.get('id');
        this.processWorkflowTransition(nodeId, action);

        return false;
    },
	processActivity_Notification: function(node, action) {
      
        return true;
    },
    //} End System Task Activity Type Handlers Section
    //{ 	********* 	User Task Activity Type Handlers 		*********
    // 1 / 1
	processActivity_AddDocuments: function(node, action, actionForm) {
        return true;
    },
    // 4 / 2
	processActivity_CustomInput: function(node, action, actionForm) {
        var validateFn = actionForm.processActivity,
            //nodeId = node.get('id'),
            result = false; // result;
        if (validateFn && (typeof validateFn === 'function')) {
            result = validateFn.apply(actionForm, [this, node, action]);
            /*if (result && !delegated) {
                this.completeCurrentTask(function () {
					this.processWorkflowTransition(nodeId, action);
				}, this);
            }
			*/
        }
        return result;
    },
    // 5 / 1
	processActivity_Approval: function(node, action, actionForm) {
        var wfi = this.getWorkflowInstance(),
            actionValues = actionForm.getValues(),
            commentsStore = wfi.getWorkflowInstanceComments();
        Ext.apply(actionValues, {
            Title: 'Workflow - ' + actionValues.WorkflowInstance + ' - Comment',
            Approved: action
        });
        commentsStore.add(actionValues);
        this.setInputVariable(actionValues);
        return true;
    },
    // 5 / 1
	processActivity_CollectFeedback: function(node, action, actionForm) {
        var wfi = this.getWorkflowInstance(),
            actionValues = actionForm.getValues(),
            commentsStore = wfi.getWorkflowInstanceComments();
        if (!Ext.isEmpty(actionValues.Comment)) {
			Ext.apply(actionValues, {
				Title: 'Workflow - ' + actionValues.WorkflowInstance + ' - Comment'
			});
			commentsStore.add(actionValues);
		}
        this.setInputVariable(actionValues);
        return true;
    },
    // 3 / 1
	processActivity_SendNotification: function(node, action, actionForm) {
        var actionValues = actionForm.getValues(),
            nodeId = node.get('id'),
            taskId = this.getCurrentTask().get('ID'),
            path = this.baseUrl + '/Lists/Tasks/' + taskId + '_.000';

        Sharepoint.data.WebServices.getTemplatesForItem(path, this, function(options, success, response) {
            this.startEmailWorkflow(actionValues, path, response);
            this.completeCurrentTask(function () {
			    this.processWorkflowTransition(nodeId, action);
			}, this);
        });

        return false;
    },
    // 7 / 3
	processActivity_PromptForInput: function(node, action, actionForm) {
        var activity = node.get('activity'),
            actionValues = actionForm.getValues(),
            record = activity.record ? this['get' + activity.record]() : false;

        if (record) {
            record.beginEdit();
            Ext.iterate(actionValues, function(key, value) {
                record.set(key, value);
            }, this);
            record.endEdit();
        }
        this.setInputVariable(actionValues);
        return true;
    },
    //} End User Task Activity Type Handlers Section
    //{ 	********* 	Delegate Activity Type Handlers 		*********
    // 1 / 1
	processDelegatedActivity_AddDocuments: function(node, action, actionForm) {
        return true;
    },
    // 4 / 2
	processDelegatedActivity_CustomInput: function(node, action, actionForm) {
        var validateFn = actionForm.processActivity,
            result = false;
        if (validateFn && (typeof validateFn === 'function')) {
            result = validateFn.apply(actionForm, [this, node, action]);
        }
        return result;
    },
    // 3 / 1
	processDelegatedActivity_Approval: function(node, action, actionForm) {
        var actionValues = actionForm.getValues();

        this.setInputVariable(actionValues);
        return true;
    },
	// 3 / 1
    processDelegatedActivity_CollectFeedback: function(node, action, actionForm) {
        var actionValues = actionForm.getValues();

        this.setInputVariable(actionValues);
        return true;
    },
	// 3 / 1
    processDelegatedActivity_SendNotification: function(node, action, actionForm) {
        var actionValues = actionForm.getValues();

            this.setInputVariable(actionValues);
        return true;
    },
	// 3 / 1
    processDelegatedActivity_PromptForInput: function(node, action, actionForm) {
        var actionValues = actionForm.getValues();

            this.setInputVariable(actionValues);
        return true;
    },
    //} End Delegate Activity Type Handlers Section
    //} End Activity Type Handlers Section

    //{ **********      Parameter/Lookup Value Helpers     **********
    // 9 / 5
	getParameter: function(value) {
        var tempValue = value,
            lookupValue, source, fn;

        if (typeof value === 'string') {
            lookupValue = value.split(((value.indexOf('::') !== -1) ? '::' : ':'));
            if (lookupValue.length > 1) {
                source = lookupValue[0];
                fn = this['get' + source + 'LookupValue'];
                if (fn) {
                    tempValue = fn.call(this, this.getParameter(lookupValue[1]));
                }
            }
        }
        return tempValue;
    },
    // 4 / 2
	getTransitionNodeParameters: function(transition) {
        var params = transition.get('parameters'),
            output = {};
        if (params) {
            Ext.iterate(params, function(key, value) {
                var lookup = this.parseExpressionFromString(value);
                output[key] = lookup;
            }, this);
        }
        return output;
    },
    // 21 / 5
	parseExpressionFromString: function(str) {
        //   "Role:{%TransitionParameter:Directorate%} Facilities Manager"
        var me = this,
            len = str.length,
            reg = /(?:(\{\%))/g,
            output = [],
            result, index, begin, end, e, value, lookup;

        for (index = 0; index < len; index = end) {
            reg.lastIndex = index;
            e = reg.exec(str);

            if (!e) {
                value = str.substring(index, len);
                output.push(value);
                break;
            }
            begin = e.index;
            end = reg.lastIndex;

            if (index < begin) {
                value = str.substring(index, begin);
                //lookup = me.getParameter(value);
                output.push(value);
            }

            if (e[1]) {
                end = str.indexOf('%}', begin + 2);
                value = str.substring(begin + 2, end);
                lookup = me.getParameter(value);
                output.push(lookup);
                end += 2;
            }
        }
        result = output.join('');
        return me.getParameter(result);
    },
    // 11 / 5
	parseSPLookupValues: function(values, valueOnly) {
        if (values.indexOf(";#") !== -1) {
            var getValues = values.split(';#'),
                gvl = getValues.length,
                i = 1,
                fixedValue;
            if (gvl > 2) {
                fixedValue = [];
                for (i; i < gvl; i += 2) {
                    if (valueOnly) {
                        fixedValue.push(getValues[i]);
                    } else {
                        fixedValue.push([getValues[i - 1], getValues[i]]);
                    }
                }
            } else {
                fixedValue = getValues[1]; // Display Field Value
            }
            return fixedValue;
        }
        return values;
    },
    // 8 / 3
	applyLookupValue: function(value) {
        var me = this,
            updateValue, args,
            formatRe = /\{(\d+)\}/g;
        if (Ext.isEmpty(value)) {
            return value;
        }
        if (value.length === 1) {
            return value[0];
        }
        args = Ext.Array.toArray(value, 1);
        updateValue = value[0].replace(formatRe, function(m, i) {
            return me.parseExpressionFromString(args[i]);
        });
        return updateValue;
    },

    //{ ********* 			Lookup Value Type Handlers 			*********
    // 2 / 2
	getTransitionParameterLookupValue: function(key) {
        var transParams = this.getTransitionParameters();
        return transParams[key] ? transParams[key] : '';
    },
	// 2 / 2
    getTaskVariableLookupValue: function(key) {
        var taskVars = this.getTaskVariable();
        return taskVars[key] ? taskVars[key] : '';
    },
	// 2 / 2
    getInputVariableLookupValue: function(key) {
        var inpVars = this.getInputVariable();
        return inpVars[key] ? inpVars[key] : '';
    },
	// 2 / 2
    getCurrentTaskLookupValue: function(key) {
        var currentTask = this.getCurrentTask();
        return currentTask ? currentTask.get(key) : '';
    },
	// 2 / 2
    getWorkflowLookupValue: function(key) {
        var workflow = this.getWorkflowInstance();
        return workflow ? workflow.get(key) : '';
    },
    // 7 / 4
	getRoleLookupValue: function(key) {
        var roles = this.getRolesStore(),
            role;
        if (roles) {
            key = this.parseSPLookupValues(key, true);
            if (key) {
                role = roles.findRecord('Title', key);
                return role ? role.get('Group') : '';
            }
        }
        return false;
    },
	// 2 / 2
    getCurrentDetailItemLookupValue: function(key) {
        var item = this.getCurrentDetailItem();
        return item ? item.get(key) : '';
    },
    //} End Lookup Value Type Handlers Section
    //} End Parameter/Lookup Value Helpers Section

    //{ **********       Workflow Transition Handlers      **********
    // 12 / 6
	processWorkflowTransition: function(nodeId, action) {
        try {
            var me = this,
				node = me.getWorkflowNode(nodeId),
                fire = true,
                transition, taskCfgs, tasks;

            if (node) {
                transition = node.getTransitions().findRecord('action', action);
                if (transition) {
                    taskCfgs = me.getWorkflowTasksConfig(transition);
                    if (taskCfgs.length > 0) {
                        fire = false;
                        tasks = me.createWorkflowTasks(taskCfgs, me.processCreatedTasks);
                    }
                }
            }
            if (fire) {
                me.fireEvent('transition', false);
            }
            me.fireEvent('statusupdate', {
                status: 'success',
                title: 'Success',
                description: 'The workflow transition has complete.'
            }, true);
        } catch (e) {
            var msg = 'There was a problem with the workflow transition. <br><br>' + e.message;
            Ext.MessageBox.alert('Error', msg);
        }
    },
    // 9 / 4
	processWorkflowGroupTransition: function(node, groupTasks) {
        try {
            var configs = [],
                taskCfgs, transition, tasks, scope;

            Ext.each(groupTasks, function(parentTask) {
                this.setCurrentTask(parentTask);
                scope = parentTask.get('Scope');
                if (scope) {
                    this.setTaskVariable(Ext.decode(scope));
                }
                transition = node.getTransitions().findRecord('action', 'auto');
                if (transition) {
                    taskCfgs = this.getWorkflowTasksConfig(transition);
                    if (taskCfgs.length > 0) {
                        configs = configs.concat(taskCfgs);
                    }
                }
            }, this);

            if (configs.length > 0) {
                tasks = this.createWorkflowTasks(configs, this.processCreatedTasks);
            }
        } catch (e) {
            var msg = 'There was a problem with the workflow transition. <br><br>' + e.message;
            Ext.MessageBox.alert('Error', msg);
        }
    },
	// 8 / 3
	processCreatedTasks: function (batch, options) {
		var operations = batch.operations,
			i = 0,
			ol = operations.length,
			createdTasks = [],
			tl;
		
		for (i; i < ol; i++) {
			if (operations[i].action === 'create') {
				createdTasks = operations[i].getRecords();
				break;
			}
		}
		this.logHistoryFromCreatedTasks(createdTasks);
		this.sendCreatedTasksNotification(createdTasks);
		
		this.fireEvent('transition', true);	
	},
    // 10 / 6
	getTransitionNode: function(transition) {
        try {
            var tnodes = transition.get('nodes'),
                ttype = transition.get('type'),
                nodes = [],
                i = 0,
                node, nodeId;
			
            if (ttype === 'xor') { // Check if the transition type is configured for a conditional logic evaluation.
                /* 
					Because an 'xor' configured transition type will not know what static route to take via the process definition is it must
					evaluate the logic formula configured to find which definition nodes are available to transition. This expression must only 
					return an exclusive path (single node).
				*/
				tnodes = this.evaluateConditionalTransition(transition); 
            }

            for (i; i < tnodes.length; i++) {
                // For each available process definition node get the registered workflow node object
				nodeId = tnodes[i];
                node = this.getWorkflowNode(nodeId);
                if (node) {
                    nodes.push(node);
                }
            }
            return ttype === 'parallel' ? nodes : nodes[0];
        } catch (e) {
            var msg = 'There was a problem with the configured workflow transition. <br><br>' + e.message;
            Ext.MessageBox.alert('Error', msg);
        }
    },
    // 5 / 2
	evaluateConditionalTransition: function(transition) {
        var condition = transition.get('condition'),
            params;

        if (condition && (typeof condition === 'string') && condition.indexOf("function") === 0) {
            //Ext.functionFactory('v', 'return v ' + a + ';');
            //var condFn = new Function('return ' + condition)();
            var condFn = Ext.functionFactory('params', 'return ' + condition);
            return condFn(params);
            //return condFn.call(this, params); // Need to determine what parameters to pass to the function
        }
        return [];
    },
    //} End Workflow Transition Handlers Section

    //{ **********          Notification Handlers          **********
    // 10 / 3
	sendCreatedTasksNotification: function (tasks) {
		var notifications = [],
			appPath = this.getAppPath(),
			notificationsStore = this.getNotificationsStore(),
			tl = tasks.length,
			i = 0,
			to, subject, body, task;
		
		if (tl > 0) {
			for (i; i < tl; i ++) {
				task = tasks[i];
				to = task.get('AssignedTo');
				subject = 'Workflow Task Assignment: ' + task.get('Title'),
				body = '<p>As the <i>' + this.parseSPLookupValues(to) + '</i>, a new workflow task has been assigned to you.</p><p>To view the task(s) assigned to you please go to the <a href="' + appPath + '">Workflow Task Manager</a></p>';
				
				notifications.push({
					Title: 'Notification - ' + task.get('CurrentNodeName'),
					To: to,
					CC: '',
					Subject: subject,
					Body: body
				});
			}
			notificationsStore.add(notifications);
			notificationsStore.sync();
		}
	},
	// 2 / 1
	sendWorkflowStartNotification: function () {
		var notificationsStore = this.getNotificationsStore(),
			wfi = this.getWorkflowInstance(),
			wfiId = wfi.get('Title'),
			wfiTitle = wfi.get('WorkflowTitle'),
			wfiModel = wfi.get('Model'),
			to = this.getCurrentUserId(), 
			subject = 'Workflow Submitted: ' + wfiId + ' - ' + wfiTitle, 
			body = '<p>A new instance of the ' + wfiModel + ' Workflow Model Process (' + wfiTitle + ') has been submitted for processing.</p>';
		
		notificationsStore.add({
			Title: 'Notification - Start Workflow',
			To: to,
			CC: '',
			Subject: subject,
			Body: body
		});
	},
	// 8 / 3
	buildMailWindow: function(config) {
        //need to find alternative for getCurrentTask because it may not always exist

        var me = this,
            taskId = this.getCurrentTask().get('ID'),
            path = window.location.protocol + '//' + window.location.host + L_Menu_BaseUrl + '/Lists/Tasks/' + taskId + '_.000',
            values, win;

        values = Ext.apply({}, {
            'to': config.to.join(';'),
            'cc': config.cc.join(';'),
            'subject': this.applyLookupValue(config.subject),
            'body': this.applyLookupValue(config.body)
        });

        if (!config.editBeforeSend) {
            if (!Ext.isEmpty(values.To)) {
                Sharepoint.data.WebServices.getTemplatesForItem(path, this, function(options, success, response) {
                    this.startEmailWorkflow(values, path, response);
                });
            }
            return false;
        }
        win = Ext.create('Ext.window.Window', {
            autoShow: true,
            width: 600,
            height: 600,
            constrain: true,
            modal: true,
            bodyPadding: '2 2 2 2',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                itemId: 'mailPanel',
                layout: 'column',
                defaults: {
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    }
                },
                items: [{
                    baseCls: 'x-plain',
                    bodyStyle: 'padding:5px 0 5px 5px',
                    items: [{
                        xtype: 'button',
                        action: 'Send',
                        text: 'Send',
                        scale: 'large',
                        iconCls: 'icon-sendemail',
                        iconAlign: 'top',
                        handler: function() {
                            me.onSendEmailButtonClick(win);
                        }
                    }]
                }, {
                    columnWidth: 1,
                    baseCls: 'x-plain',
                    bodyStyle: 'padding:5px 5px 5px 5px',
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: 'To',
                        itemId: 'to',
                        labelWidth: 50,
                        labelClsExtra: 'emailButtons',
                        name: 'to',
                        value: values.to,
                        autoScroll: true,
                        allowBlank: false,
                        regex: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
                        regexText: 'This field should be an e-mail address in the format "user@example.com" and multiple addresses delimited with a ";"'
                    }, {
                        xtype: 'textarea',
                        name: 'cc',
                        fieldLabel: 'CC',
                        value: values.cc,
                        itemId: 'cc',
                        labelWidth: 50,
                        labelClsExtra: 'emailButtons',
                        autoScroll: true,
                        allowBlank: true,
                        regex: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.]\s*(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
                        regexText: 'This field should be an e-mail address in the format "user@example.com" and multiple addresses delimited with a ";"'
                    }, {
                        xtype: 'textfield',
                        name: 'subject',
                        value: values.subject,
                        itemId: 'subject',
                        allowBlank: false,
                        labelWidth: 50,
                        fieldLabel: 'Subject',
                        regex: /^[a-zA-Z0-9_.:;\-" "()]+$/,
                        maxLength: 255
                    }]
                }]
            }, {
                xtype: 'htmleditor',
                itemId: 'body',
                name: 'body',
                value: values.body,
                padding: '2 0 0 0',
                flex: 1
            }]
        });
        return win;
    },
    // 5 / 3
	startEmailWorkflow: function(values, path, response) {
        var to = values.to,
            cc = values.cc,
            subject = values.subject,
            body = values.body,
            fixbody = Ext.util.Format.htmlEncode(body),
            fixedbody = '<![CDATA[' + fixbody + ']]>',
            workflow = response.responseXML.getElementsByTagName('WorkflowTemplate'),
            //idNode = response.responseXML.getElementsByTagName('WorkflowTemplateIdSet'),
            i = 0,
            il = workflow.length,
            templateId;
        for (i; i < il; i++) {
            if (workflow[i].getAttribute('Name') === this.notificationWorkflowName) {
                templateId = workflow[i].firstChild.getAttribute('TemplateId');
                Sharepoint.data.WebServices.startWorkflow(path, templateId, '<Fields xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><To>' + to + '</To><CC>' + cc + '</CC><Subject>' + subject + '</Subject><Body>' + fixedbody + '</Body></Fields>', this, Ext.emptyFn);
            }
        }
    },
    // 3 / 2
	sendTransitionNotification: function(transition) {
        var notify = transition.get('notification');
        if (notify) {
            this.buildMailWindow(notify);
        }
    },
    // 3 / 2
	onSendEmailButtonClick: function(mailWindow) {
		var id = this.getCurrentTask().get('ID'),
			to = mailWindow.down('#to'),
			cc = mailWindow.down('#cc'),
			subject = mailWindow.down('#subject'),
			body = mailWindow.down('#body'),
			path = window.location.protocol + '//' + window.location.host + L_Menu_BaseUrl + '/Lists/Tasks/' + id + '_.000';
		if (to.isValid() && cc.isValid() && subject.isValid() && body.isValid()) {
			//mailWindow.el.mask();
			Sharepoint.data.WebServices.getTemplatesForItem(path, this, function(options, success, response) {
				var values = Ext.apply({}, {
					'to': to.getValue(),
					'cc': cc.getValue(),
					'subject': subject.getValue(),
					'body': body.getValue()
				});
				this.startEmailWorkflow(values, path, response);
				mailWindow.close();
			});
		}
	}
    //} End Notification Handlers Section
});