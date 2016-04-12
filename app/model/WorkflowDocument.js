Ext.define('Task.model.WorkflowDocument', {
	extend: 'Ext.data.Model',	
	idProperty: 'ID',
	docLibrary: true,
	proxy: {
		type: 'splistsoap',		
		extraParams: {
			listName: 'SupportingDocuments',
			viewFields: '<ViewFields><FieldRef Name="ID" /><FieldRef Name="ContentType" /><FieldRef Name="LinkFilename" /><FieldRef Name="EncodedAbsUrl" /><FieldRef Name="PermMask" /><FieldRef Name="ServerUrl" /><FieldRef Name="_UIVersionString" /></ViewFields>'
		}
	},
	fields: [{
		name: 'ID',
		mapping: '@ows_ID'
	}, {
		name: 'ContentType',
		mapping: '@ows_ContentType'
	}, {
		name: 'LinkFilename',
		mapping: '@ows_LinkFilename'
	}, {
		name: 'Path',
		mapping: '@ows_ServerUrl',
		convert: function (v, r) {
			return encodeURI(v);
		}
	}, {
		name: 'PermMask',
		mapping: '@ows_PermMask'
	}, {
		name: 'Modified',
		mapping: '@ows_Modified',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	}, {
		name: 'DeletePath',
		mapping: '@ows_ServerUrl'
	}, {
		name: 'ModifiedBy',
		mapping: '@ows_Editor',
		convert: function (v, record) {
			var fixedValue = v.split(';#');
			return fixedValue[1];
		}
	}, {
		name: 'Version',
		mapping: '@ows__UIVersionString',
		persist: false
	}, {
		name: 'DocIcon',
		mapping: '@ows_DocIcon',
		persist: false
	}, {
		name: 'Name',
		mapping: '@ows_EncodedAbsUrl'
	}, {
		name: 'WorkflowInstance_Title',
		persist: false,
		mapping: '@ows_FileRef',
		convert: function (v, record) {			
			var re = new RegExp('[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}'),
				match = re.exec(v);
			return match ? match[0] : '';			
		}		
	}]
});