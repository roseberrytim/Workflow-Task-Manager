Ext.define('Task.view.Header', {
	extend: 'Ext.container.Container',	
	xtype: 'app-header',
	requires: ['Ext.layout.container.HBox', 'Ext.form.field.Trigger'],
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	cls: 'app-header',
	initComponent: function () {
		var globalCfg = Task.config.Globals,
			title = globalCfg.title || '',
			isAdmin = globalCfg.isAdmin;
		Ext.apply(this, {
			items: [{
				xtype: 'component',
				width: 30
			}, {
				xtype: 'component',
				itemId: 'appHeaderTitle',
				flex: 1,
				cls: 'app-header-title',
				html: '<h1>' + title + '</h1>',
				listeners: {
					'afterrender': function () {
						var me = this,
							header = me.up();
						me.mon(me.el, 'click', function () {
							header.fireEvent('titleclick');
						}, me);												
					}
				}
			}, {
				xtype: 'component',
				flex: 2
			}]/*, {				
				xtype: 'container',				
				cls: 'app-header-search',
				hidden: true,
				width: 230,
                margin: "7 0 0 0",
				items: [{
					xtype: 'triggerfield',
					id: 'app-header-search-field',					
					width: 185,
					margin: '0 0 2 0',
					triggerCls: 'x-form-clear-trigger',				
					hideTrigger: false,
					emptyText: 'Search...',
					enableKeyEvents: true,
					onTriggerClick: function () {
						this.reset();
						this.focus();					
						me.fireEvent('resetsearch', field);
					}
				}]
			}, {
				xtype: 'button',
				action: 'configure',				
				scale: 'large',
				width: 40,
				margin: '3 0 0 0',
				ui: 'blue',
				iconCls: 'icon-configure',
				iconAlign: 'top',
				hidden: !isAdmin,
				tooltip: 'Configure Application Settings'
			}]*/
		});
		
		this.callParent();
		/**
         * Specifies a new event that this component will fire when the user clicks on title. Other components can 
		 * listen to this event and take action when it is fired
         */
        this.addEvents(
            /**
             * @event titleclick
             * Fired whenever the user clicks on the title element             
             */
            'titleclick'
        );
	}
});