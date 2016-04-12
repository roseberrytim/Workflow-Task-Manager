Ext.define('Custom.xmlbuilder.XMLDocType', {
	extend: 'Custom.xmlbuilder.Base',

    constructor: function(parent, pubID, sysID) {
        var ref, ref1;
        this.documentObject = parent;
        this.stringify = this.documentObject.stringify;
        this.children = [];
        if (this.isObjectOrArray(pubID)) {
            ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
        }
        if (sysID == null) {
            ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
        }
        if (pubID != null) {
            this.pubID = this.stringify.dtdPubID(pubID);
        }
        if (sysID != null) {
            this.sysID = this.stringify.dtdSysID(sysID);
        }
    },

    clone: function() {
        return Ext.create('Custom.xmlbuilder.XMLDocType', this, this.pubID, this.sysID);
    },

    element: function(name, value) {
        var child;
        child = new Custom.xmlbuilder.XMLDTDElement(this, name, value);
        this.children.push(child);
        return this;
    },

    attList: function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var child;
        child = new Custom.xmlbuilder.XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.children.push(child);
        return this;
    },

    entity: function(name, value) {
        var child;
        child = new Custom.xmlbuilder.XMLDTDEntity(this, false, name, value);
        this.children.push(child);
        return this;
    },

    pEntity: function(name, value) {
        var child;
        child = new Custom.xmlbuilder.XMLDTDEntity(this, true, name, value);
        this.children.push(child);
        return this;
    },

    notation: function(name, value) {
        var child;
        child = new Custom.xmlbuilder.XMLDTDNotation(this, name, value);
        this.children.push(child);
        return this;
    },

    cdata: function(value) {
        var child;
        child = new Custom.xmlbuilder.XMLCData(this, value);
        this.children.push(child);
        return this;
    },

    comment: function(value) {
        var child;
        child = new Custom.xmlbuilder.XMLComment(this, value);
        this.children.push(child);
        return this;
    },

    instruction: function(target, value) {
        var child;
        child = new Custom.xmlbuilder.XMLProcessingInstruction(this, target, value);
        this.children.push(child);
        return this;
    },

    root: function() {
        return this.documentObject.root();
    },

    document: function() {
        return this.documentObject;
    },

    toString: function(options, level) {
        var child, i, indent, len, newline, offset, pretty, r, ref, ref1, ref2, ref3, space;
        pretty = (options != null ? options.pretty : void 0) || false;
        indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
        offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
        newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
        level || (level = 0);
        space = new Array(level + offset + 1).join(indent);
        r = '';
        if (pretty) {
            r += space;
        }
        r += '<!DOCTYPE ' + this.root().name;
        if (this.pubID && this.sysID) {
            r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
        } else if (this.sysID) {
            r += ' SYSTEM "' + this.sysID + '"';
        }
        if (this.children.length > 0) {
            r += ' [';
            if (pretty) {
                r += newline;
            }
            ref3 = this.children;
            for (i = 0, len = ref3.length; i < len; i++) {
                child = ref3[i];
                r += child.toString(options, level + 1);
            }
            r += ']';
        }
        r += '>';
        if (pretty) {
            r += newline;
        }
        return r;
    },

    ele: function(name, value) {
        return this.element(name, value);
    },

    att: function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    },

    ent: function(name, value) {
        return this.entity(name, value);
    },

    pent: function(name, value) {
        return this.pEntity(name, value);
    },

    not: function(name, value) {
        return this.notation(name, value);
    },

    dat: function(value) {
        return this.cdata(value);
    },

    com: function(value) {
        return this.comment(value);
    },

    ins: function(target, value) {
        return this.instruction(target, value);
    },

    up: function() {
        return this.root();
    },

    doc: function() {
        return this.document();
    }



});