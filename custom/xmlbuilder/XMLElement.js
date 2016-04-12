﻿Ext.define('Custom.xmlbuilder.XMLElement', {
    extend: 'Custom.xmlbuilder.XMLNode',

    constructor: function(parent, name, attributes) {
        this.callParent([parent]);
        if (name == null) {
            throw new Error("Missing element name");
        }
        this.name = this.stringify.eleName(name);
        this.children = [];
        this.instructions = [];
        this.attributes = {};
        if (attributes != null) {
            this.attribute(attributes);
        }
    },
    clone: function() {
        var att, attName, clonedSelf, i, len, pi, ref, ref1;
        clonedSelf = Ext.create('Custom.xmlbuilder.XMLElement', this, this.name, this.attributes);
        if (clonedSelf.isRoot) {
            clonedSelf.documentObject = null;
        }
        clonedSelf.attributes = {};
        ref = this.attributes;
        for (attName in ref) {
            if (!hasProp.call(ref, attName)) continue;
            att = ref[attName];
            clonedSelf.attributes[attName] = att.clone();
        }
        clonedSelf.instructions = [];
        ref1 = this.instructions;
        for (i = 0, len = ref1.length; i < len; i++) {
            pi = ref1[i];
            clonedSelf.instructions.push(pi.clone());
        }
        clonedSelf.children = [];
        this.children.forEach(function(child) {
            var clonedChild;
            clonedChild = child.clone();
            clonedChild.parent = clonedSelf;
            return clonedSelf.children.push(clonedChild);
        });
        return clonedSelf;

    },
    attribute: function(name, value) {
        var attName, attValue;
        if (name != null) {
            name = name.valueOf();
        }
        if (this.isObjectOrArray(name)) {
            for (attName in name) {
                if (!hasProp.call(name, attName)) continue;
                attValue = name[attName];
                this.attribute(attName, attValue);
            }
        } else {
            if (Ext.isFunction(value)) {
                value = value.apply();
            }
            if (!this.options.skipNullAttributes || (value != null)) {
                this.attributes[name] = new Custom.xmlbuilder.XMLAttribute(this, name, value);
            }
        }
        return this;
    },

    removeAttribute: function(name) {
        var attName, i, len;
        if (name == null) {
            throw new Error("Missing attribute name");
        }
        name = name.valueOf();
        if (Ext.isArray(name)) {
            for (i = 0, len = name.length; i < len; i++) {
                attName = name[i];
                delete this.attributes[attName];
            }
        } else {
            delete this.attributes[name];
        }
        return this;
    },

    instruction: function(target, value) {
        var i, insTarget, insValue, instruction, len;
        if (target != null) {
            target = target.valueOf();
        }
        if (value != null) {
            value = value.valueOf();
        }
        if (Ext.isArray(target)) {
            for (i = 0, len = target.length; i < len; i++) {
                insTarget = target[i];
                this.instruction(insTarget);
            }
        } else if (this.isObjectOrArray(target)) {
            for (insTarget in target) {
                if (!hasProp.call(target, insTarget)) continue;
                insValue = target[insTarget];
                this.instruction(insTarget, insValue);
            }
        } else {
            if (Ext.isFunction(value)) {
                value = value.apply();
            }
            instruction = new Custom.xmlbuilder.XMLProcessingInstruction(this, target, value);
            this.instructions.push(instruction);
        }
        return this;
    },

    toString: function(options, level) {
        var att, child, i, indent, instruction, j, len, len1, name, newline, offset, pretty, r, ref, ref1, ref2, ref3, ref4, ref5, space;
        pretty = (options != null ? options.pretty : void 0) || false;
        indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
        offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
        newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
        level || (level = 0);
        space = new Array(level + offset + 1).join(indent);
        r = '';
        ref3 = this.instructions;
        for (i = 0, len = ref3.length; i < len; i++) {
            instruction = ref3[i];
            r += instruction.toString(options, level + 1);
        }
        if (pretty) {
            r += space;
        }
        r += '<' + this.name;
        ref4 = this.attributes;
        for (name in ref4) {
            if (!Object.hasOwnProperty.call(ref4, name)) continue;
            att = ref4[name];
            r += att.toString(options);
        }
        if (this.children.length === 0 || Ext.Array.every(this.children, function(e) {
                return e.value === '';
            })) {
            r += '/>';
            if (pretty) {
                r += newline;
            }
        } else if (pretty && this.children.length === 1 && (this.children[0].value != null)) {
            r += '>';
            r += this.children[0].value;
            r += '</' + this.name + '>';
            r += newline;
        } else {
            r += '>';
            if (pretty) {
                r += newline;
            }
            ref5 = this.children;
            for (j = 0, len1 = ref5.length; j < len1; j++) {
                child = ref5[j];
                r += child.toString(options, level + 1);
            }
            if (pretty) {
                r += space;
            }
            r += '</' + this.name + '>';
            if (pretty) {
                r += newline;
            }
        }
        return r;
    },

    att: function(name, value) {
        return this.attribute(name, value);
    },

    ins: function(target, value) {
        return this.instruction(target, value);
    },

    a: function(name, value) {
        return this.attribute(name, value);
    },

    i: function(target, value) {
        return this.instruction(target, value);
    }


});