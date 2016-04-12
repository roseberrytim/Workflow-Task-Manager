Ext.define('Custom.extension.PowerPointSlide', {
	
	config: {
		id: '',
		name: '',
		back: {
			type: 'solid',
			color: 'ffffff',
			alpha: false
		},
		color: {
			type: 'solid',
			color: '000000',
			alpha: false
		},
		show: true		
	},
	
	data: null,
	rels: null,
	
	constructor: function (config) {
		
		var me = this;
		
		
		me.data = [];
		// Set SlideLayout
		me.rels = [{
			type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
            target: '../slideLayouts/slideLayout1.xml',
            clear: 'data'
		}]
		
	}


});