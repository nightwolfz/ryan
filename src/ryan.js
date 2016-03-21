'use strict';

var mobxReact = require('mobx-react');
var defaultContextTypes = {
    router: function() {},
    state: function() {},
    store: function() {},
    cache: function() {}
}

/**
 * Create contextTypes object from an array of strings.
 * @param ctxTypes {Array}
 * @returns {Object}
 */
function createContextTypes(ctxTypes) {
    return ctxTypes.reduce((obj, ctxItem) => {
        obj[ctxItem] = function() {}
        return obj
    }, {});
}

/**
 * Decorate components with context and observable
 * @param component {Component|Object}
 * @returns {Function|Class}
 */
function connect() {
    var args = Array.prototype.slice.call(arguments);
    if (args && args.length) {

        // @connect
        // The first argument is the component.
        if (typeof args[0] === 'function') {
            args[0].contextTypes = defaultContextTypes;
            return mobxReact.observer(args[0])
        }

        // @connect('store', 'state', ''...)
        return function(component) {
            component.contextTypes = createContextTypes(args);
            return mobxReact.observer(component)
        }

    } else {

        // @connect()
        return function(component) {
            component.contextTypes = defaultContextTypes;
            return mobxReact.observer(component)
        }
    }
}

/**
 * Grant components access to store and state without making observable
 * @param component {Component|Object}
 * @returns {Component|Object}
 */
function provide(args) {
    var args = Array.prototype.slice.call(arguments);
    if (args && args.length) {

        // @provide
        // The first argument is the component.
        if (typeof args[0] === 'function') {
            args[0].contextTypes = defaultContextTypes;
            return args[0]
        }

        // @provide('store', 'state', ''...)
        return function(component) {
            component.contextTypes = createContextTypes(args);
            return component
        }

    } else {

        // @provide()
        return function(component) {
            component.contextTypes = defaultContextTypes;
            return component
        }
    }
}

exports.connect = connect;
exports.provide = provide;
exports.contextTypes = defaultContextTypes;
