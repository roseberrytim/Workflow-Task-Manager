Ext.define('Task.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[		
        'Ext.layout.container.Border',		
		'Task.view.Manager',
		'Task.view.Header'
    ],	
    cls: 'app-main',
    layout: 'border',
	
	initComponent: function () {
			
		Ext.apply(this, {
			items: [{
				region: 'north',
				xtype: 'app-header',        
				height: 40
			}, {
				xtype: 'container',
				itemId: 'mainContainer',
				region: 'center',		
				layout: 'fit',				
				items:[{xtype: 'manager'}]
			}, {
				region: "south",		
				id: "footer",
				height: 20,
				contentEl: "footer-content"
			}]   
		});
		this.callParent();
	}
   
});