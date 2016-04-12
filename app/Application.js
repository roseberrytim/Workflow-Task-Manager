Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false,
	paths: {
		'Ext.ux': 'extensions',		
		'Sharepoint': 'packages/sharepoint/src',
		'Custom': 'custom'
		//'Workflow': 'workflow'
	}
});

Ext.define('Task.Application', {
    name: 'Task',

    extend: 'Ext.app.Application',

   requires: [
		//'Ext.Promise',
		'Sharepoint.data.WebServices',
		'Sharepoint.data.proxy.SPList',
		'Sharepoint.data.proxy.SPUserCollectionFromGroup',
		'Ext.form.field.VTypes',
		'Ext.util.Format',
		'Ext.Promise'
	],
    views: [],
    controllers: [
       'Main',
	   'Manager',
	   'Roles',
	   'Users',
	   'WorkflowDefinitions',
	   'Designer',
	   'Nodes'
    ],	
    stores: [],
	launch: function () {
		var configs = Task.config.Globals,
			phone = /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/,
			version = configs.version || 'Not Defined',
			overrides = configs.overrides,
			defaultDict = {
				thousand : 'k',
				million : 'm',
				billion : 'b'
			};
		
		Ext.tip.QuickTipManager.init();
		
		Ext.apply(Task, {
			version: version,
			getVersion: function () {
				return this.version;
			}
		});
		Ext.apply(Ext.util.Format, {
			splookup: function (v) {
				if (Ext.isString(v)) {
					var fv = v.split(';#');
					if (fv.length > 0) {
						return fv[1];
					}
				}
				return v;
			},
			spyesno: function (v) {
				if (Ext.isString(v)) {
					return v === '1' ? 'Yes' : 'No'
				}
				return v;
			},
			abbreviateNumber: function (v, nDecimals, dict) {
				function enforcePrecision(val, nDecimalDigits){
					var pow = Math.pow(10, nDecimalDigits);
					return +(Math.round(val * pow) / pow).toFixed(nDecimalDigits);
				}
				
				nDecimals = nDecimals != null ? nDecimals : 1;
				dict = dict || defaultDict;
				val = enforcePrecision(val, nDecimals);

				var str, mod;

				if (val < 1000000) {
					mod = enforcePrecision(val / 1000, nDecimals);
					// might overflow to next scale during rounding
					str = mod < 1000 ? mod + dict.thousand : 1 + dict.million;
				} else if (val < 1000000000) {
					mod = enforcePrecision(val / 1000000, nDecimals);
					str = mod < 1000 ? mod + dict.million : 1 + dict.billion;
				} else {
					str = enforcePrecision(val / 1000000000, nDecimals) + dict.billion;
				}

				return str;
			}
		});		
		Ext.apply(Ext.form.VTypes, {
            phone: function (val, field) {
				return phone.test(val);
			},
			phoneText: 'The phone number format is wrong, ie: 123-456-7890 (dashes optional) Or (123) 456-7890',
			phoneMask: /[\d\(\)\-]/
        });
		
		Ext.Object.each(overrides, function (key, value, myself) {
			if (value.override) {
				if (window[key]) {
					value.origFn = window[key];
					window[key] = value.fn;
				}
			}
		}, this);
	}
});
