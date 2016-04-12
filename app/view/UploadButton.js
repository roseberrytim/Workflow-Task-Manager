Ext.define('Task.view.UploadButton', {
    extend: 'Ext.Component',
    alias: 'widget.uploadbutton',
	requires: ['Sharepoint.data.proxy.Silverlight'],
	cls: 'upload-button',
	scales: {
		'large': ['100', '40'],
		'medium': ['75', '32'],
		'small': ['55', '24']
	},
	config: {		
		instance: '',
		store: '',
		scale: 'large'
	},
	constructor: function (config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
    initComponent: function () {
        var configs = Task.config.Globals,
			baseUrl = configs.baseUrl,
			detailsLib = configs.detailsLibrary,
			instance = this.getInstance(),
			id = this.getId(),
			store = this.getStore(),
			scale = this.getScale(),
			wh = this.scales[scale],
			instancePath = Ext.String.format('{0}/{1}/{2}/', baseUrl, detailsLib, instance),
			hostUrl = encodeURI(instancePath);		
        Ext.apply(this, {                      
			html: '<object id="' + id + '_SilverlightControl" width="' + wh[0] + '" height="' + wh[1] + '" data="data:application/x-silverlight-2," type="application/x-silverlight-2" >' + '<param name="source" value="resources/silverlight/SilverSPUpload_' + scale + '.xap"/>' + '<param name="windowless" value="true"/><param name="initParams" value="disabled=false, url=' + hostUrl + ', storename=' + store + '" /></object>'
        });
        this.callParent(arguments);
    }
});