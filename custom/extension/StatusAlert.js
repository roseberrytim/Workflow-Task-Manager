Ext.define('Custom.extension.StatusAlert', {
	singleton: true,
	
	getMessage: function (status) {
		var tpl = new Ext.XTemplate('<div class="status-alert status-alert-{status}"><strong>{title}</strong> {description}</div>');
		return tpl.apply(status);
	},
	
	alert: function(status, el){
		var tpl = this.getMessage(status),
			msg = Ext.DomHelper.append(el, tpl, true);
		msg.hide();
		msg.slideIn('t').ghost("t", {
			delay: 5000,
			remove: true
		});		
	}
});