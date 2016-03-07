'use strict';

var mobxReact = require('mobx-react');
var contextTypes = {
    router: function() {},
    state: function() {},
    store: function() {},
    cache: function() {}
}

/**
 * Decorate components with context and observable
 * @param component {Component|Object}
 * @returns {Function|Class}
 */
function connect(component) {
    if (!component) return contextTypes;

    // Grant components access to store and state.
    component.contextTypes = contextTypes || {};

    return mobxReact.observer(component)
}

/**
 * Grant components access to store and state without making observable
 * @param component {Component|Object}
 * @returns {Component|Object}
 */
function provide(component) {
    component.contextTypes = contextTypes || {};
    return component
}

exports.connect = connect;
exports.provide = provide;
exports.contextTypes = contextTypes;
