Ext.define('Task.model.User', {
	extend: 'Ext.data.Model',
	idProperty: 'ID',
	fields: [
		{name: 'ID', mapping: '@ID'},
		{name: 'Name', mapping: '@Name'},
		{name: 'LoginName', mapping: '@LoginName'},
		{name: 'Email', mapping: '@Email'},
		{
			name: 'UpdateValue', 
			mapping: '@LoginName', 
			persist: false, 
			convert: function (value, record) {
				var updateValue = record.get('ID') + ';#' + value;
				return updateValue;
			}
		}
	]
	/*
	proxy: {
		type: 'soap',
		url: L_Menu_BaseUrl + '/_vti_bin/UserGroup.asmx',
		envelopeTpl: [
			'<?xml version="1.0" encoding="utf-8"?>',
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
				'{[values.bodyTpl.apply(values)]}',
			'</soap:Envelope>'
		],
		api: {
			read: 'GetUserCollectionFromGroup'
		},
		soapAction: {
			read: 'http://schemas.microsoft.com/sharepoint/soap/directory/GetUserCollectionFromGroup'
		},
		operation: 'op',
		targetNamespace: 'http://schemas.microsoft.com/sharepoint/soap/directory/',
		reader: {
			type: 'soap',
			record: 'User'
		}
	}
	*/
});