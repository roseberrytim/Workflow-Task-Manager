Ext.define('Custom.model.FacilityRequirement', {
    extend: 'Ext.data.Model',	
	idProperty: 'ID',
	fields: [{
		name: "ID",
		mapping: '@ows_ID',
		type: 'int'
	}, {
		name: 'Request',
		mapping: '@ows_Request'
	}, {
		name: "Title",
		mapping: '@ows_Title',
		defaultValue: 'FacilityRequirement'
	}, {
		name: 'AddSpaceReq',
		mapping: '@ows_AddSpaceReq'
	}, {
		name: 'Location',
		mapping: '@ows_Location'
	}, {
		name: 'Seats',
		mapping: '@ows_Seats'
	}, {
		name: 'AdjustedSeats',
		mapping: '@ows_AdjustedSeats'
	}, {
		name: 'Request_ID',
		mapping: '@ows_Request',
		persist: false,
		convert: function (value, record) {
			if (typeof value == 'number') {
				return value;
			}
			var updateValue = value.split(';#');
			return updateValue[0];		
		}
	}],
	proxy: {
		type: 'splistsoap',
		extraParams: {
			listName: 'FacilityRequirements'
		}
	},
	belongsTo: {
		model: 'Custom.model.Request',
		getterName: 'getMyRequest'
	}
});