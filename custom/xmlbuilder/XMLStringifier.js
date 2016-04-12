Ext.define('Custom.xmlbuilder.XMLStringifier', {
	extend: 'Custom.xmlbuilder.Base',
    convertAttKey: '@',

    convertPIKey: '?',

    convertTextKey: '#text',

    convertCDataKey: '#cdata',

    convertCommentKey: '#comment',

    convertRawKey: '#raw',

    convertListKey: '#list',

    constructor: function(options) {
        this.assertLegalChar = Ext.bind(this.assertLegalChar, this);
        var key, ref, value;
        this.allowSurrogateChars = options != null ? options.allowSurrogateChars : void 0;
        ref = (options != null ? options.stringify : void 0) || {};
        for (key in ref) {
            if (!Object.hasOwnProperty.call(ref, key)) continue;
            value = ref[key];
            this[key] = value;
        }
    },
    eleName: function(val) {
        val = '' + val || '';
        return this.assertLegalChar(val);
    },

    eleText: function(val) {
        val = '' + val || '';
        return this.assertLegalChar(this.elEscape(val));
    },

    cdata: function(val) {
        val = '' + val || '';
        if (val.match(/]]>/)) {
            throw new Error("Invalid CDATA text: " + val);
        }
        return this.assertLegalChar(val);
    },

    comment: function(val) {
        val = '' + val || '';
        if (val.match(/--/)) {
            throw new Error("Comment text cannot contain double-hypen: " + val);
        }
        return this.assertLegalChar(val);
    },

    raw: function(val) {
        return '' + val || '';
    },

    attName: function(val) {
        return '' + val || '';
    },

    attValue: function(val) {
        val = '' + val || '';
        return this.attEscape(val);
    },

    insTarget: function(val) {
        return '' + val || '';
    },

    insValue: function(val) {
        val = '' + val || '';
        if (val.match(/\?>/)) {
            throw new Error("Invalid processing instruction value: " + val);
        }
        return val;
    },

    xmlVersion: function(val) {
        val = '' + val || '';
        if (!val.match(/1\.[0-9]+/)) {
            throw new Error("Invalid version number: " + val);
        }
        return val;
    },

    xmlEncoding: function(val) {
        val = '' + val || '';
        if (!val.match(/[A-Za-z](?:[A-Za-z0-9._-]|-)*/)) {
            throw new Error("Invalid encoding: " + val);
        }
        return val;
    },

    xmlStandalone: function(val) {
        if (val) {
            return "yes";
        } else {
            return "no";
        }
    },

    dtdPubID: function(val) {
        return '' + val || '';
    },

    dtdSysID: function(val) {
        return '' + val || '';
    },

    dtdElementValue: function(val) {
        return '' + val || '';
    },

    dtdAttType: function(val) {
        return '' + val || '';
    },

    dtdAttDefault: function(val) {
        if (val != null) {
            return '' + val || '';
        } else {
            return val;
        }
    },

    dtdEntityValue: function(val) {
        return '' + val || '';
    },

    dtdNData: function(val) {
        return '' + val || '';
    },
    
	assertLegalChar: function(str) {
        var chars, chr;
        if (this.allowSurrogateChars) {
            chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFE-\uFFFF]/;
        } else {
            chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/;
        }
        chr = str.match(chars);
        if (chr) {
            throw new Error("Invalid character (" + chr + ") in string: " + str + " at index " + chr.index);
        }
        return str;
    },

    elEscape: function(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    },

    attEscape: function(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    }

});