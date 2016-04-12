Ext.define('Task.view.People', {
	extend: 'Ext.panel.Panel', 
	alias: 'widget.people',
	requires: ['Task.view.configure.*'],
	
	initComponent: function () {
		Ext.apply(this, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			tabConfig: {
				width: 200,
				iconAlign: 'top',
				action: 'people'
			},
			items: [{
				xtype: 'component',
				height: 100,
				html: '<div class="people-header"><h2>People Configuration</h2><p>Select your configuration to modify. </p></div>'				
			}, {
				xtype: 'tabpanel',
				flex: 1,				
				plain: true,
				layout: 'fit',
				activeTab: 0,
				defaults:{
					bodyPadding: 10
				},
				items: [{
					xtype: 'roles'
				}, {
					xtype: 'userspanel'
				}]
			}]
		});
		this.callParent();
	}
});