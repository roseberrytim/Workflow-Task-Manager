Ext.define('Task.store.Groups', {
    extend: 'Ext.data.Store',
	model: 'Task.model.Group',
	storeId: 'Groups',
	autoLoad: false,
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
			read: 'GetGroupCollectionFromUser'
		},
		soapAction: {
			read: 'http://schemas.microsoft.com/sharepoint/soap/directory/GetGroupCollectionFromUser'
		},
		operation: 'op',
		targetNamespace: 'http://schemas.microsoft.com/sharepoint/soap/directory/',
		reader: {
			type: 'soap',
			record: 'Group'
		}
	}
});