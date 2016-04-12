Ext.define('Task.view.configure.Roles', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.roles',
	title: 'Roles',
	store: 'Roles',
	autoScroll: true,
	viewConfig: {
		loadingText: 'Please wait...',
		stripeRows: true
	},
	columns:[{
		header: 'Title',
		dataIndex: 'Title',
		flex: 1
	}],
	tbar: [{
		action: 'New',
		text: 'New'		
	}, {
		action: 'Edit',
		text: 'Edit'		
	}, {
		action: 'Delete',
		text: 'Delete'		
	}]
});