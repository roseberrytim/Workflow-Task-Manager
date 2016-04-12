Ext.define('Task.view.configure.Users', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userspanel',
    requires: ['Ext.grid.Panel', 'Ext.grid.plugin.DragDrop', 'Ext.view.DragZone', 'Ext.grid.ViewDropZone'],
    title: 'Users',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	initComponent: function () {
        Ext.apply(this, {
            items: [{
				xtype: 'gridpanel',
				itemId: 'userGrid',
				flex: 1,
				autoScroll: true,
				border: false,
				store: 'Users',
				columns: [{
					header: 'User Name',
					dataIndex: 'Name',
					flex: 1
				}],
				viewConfig: {
					loadingText: 'Please wait...'
				}
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 1,
				items: [{
                    xtype: 'gridpanel',
                    itemId: 'availableGrid',
					title: 'Available',
                    autoScroll: true,
                    flex: 1,
                    margins: '2 1 2 2',
                    store: 'AvailableRoles',
                    columns: [{
                        header: 'Roles',
                        dataIndex: 'Name',
                        flex: 1
                    }],
                    selModel: {
                        mode: 'MULTI'
                    },
                    viewConfig: {
                        loadingText: 'Please wait...',
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragGroup: 'availableGridDDGroup',
                            dropGroup: 'selectedGridDDGroup'
                        }
                    }
                }, {
                    xtype: 'gridpanel',
                    itemId: 'selectedGrid',
                    autoScroll: true,
					title: 'Selected',
                    flex: 1,
                    margins: '2 2 2 1',
                    store: 'Groups',
                    columns: [{
                        header: 'Roles',
                        dataIndex: 'Name',
                        flex: 1
                    }],
                    selModel: {
                        mode: 'MULTI'
                    },
                    viewConfig: {
                        loadingText: 'Please wait...',
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragGroup: 'selectedGridDDGroup',
                            dropGroup: 'availableGridDDGroup'
                        }
                    }
                }]
            }]
        });
        this.callParent(arguments);
    }
});