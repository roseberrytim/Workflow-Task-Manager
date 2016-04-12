Ext.define('Task.store.Users', {
	extend: 'Ext.data.Store',	
	model: 'Task.model.User',
	storeId: 'Users',
	autoLoad: false,
	
	constructor: function (config) {
		var globals = Task.config.Globals;
		config = Ext.apply({
			proxy: {
				type: 'spuserfromgroup',
				extraParams: {
					groupName: globals.applicationUserGroup
				}
			}
		 }, config);
        this.callParent([config]);
	}
});