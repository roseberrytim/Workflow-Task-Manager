Ext.define('Task.view.Selector', {
	extend: 'Ext.view.View',
	alias: 'widget.taskselector',
	cls: 'task-listview',
	autoScroll: true,	
	selModel: {
		enableKeyNav: false
	},
	tpl:[],	
	overItemCls: 'task-button-over',
	selectedItemCls: 'task-button-pressed',
	itemSelector: 'div.task-button',	
	
	initComponent: function () {
		Ext.apply(this, {
			store: 'WorkflowTasks',
			tpl:[
				'<tpl for=".">',
					'<div class="task-button">',
						'<div class="task-button-wrapper">',
							'<div class="task-detail">{Title}<p>{CurrentNodeName}</p></div>',
							'<div class="task-detail-meta">Due: <span>{fDueDate}</span></div>',
							'<div class="task-detail-meta">Assigned To: <span>{fAssignedTo}</span></div>',
						'</div>',
					'</div>',
					'<div class="task-seperator"></div>',
				'</tpl>'
			]
		});
						
		this.callParent();
	}	
});