Ext.define('Task.store.Workflows', {
	extend: 'Ext.data.Store',
    model: 'Task.model.Workflow',
    
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : 'resources/json/Workflows.jso'
    }
});