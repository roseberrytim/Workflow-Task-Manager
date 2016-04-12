Ext.define('Task.view.Search', {
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.search',
	
	triggerCls: 'x-form-clear-trigger',
	hideTrigger: false,
	emptyText: 'Search...',
	enableKeyEvents: true,
	
	initComponent: function () {
		this.callParent();
		this.addEvents('resetsearch');
	},
	onTriggerClick: function () {
		this.reset();
		this.focus();
		this.fireEvent('resetsearch', this);
	}
	
});