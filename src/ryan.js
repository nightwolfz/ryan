'use strict';

import {observer} from 'mobx-react';

const contextTypes = {
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

    return observer(provide(component))
}

/**
 * Grant components access to stores and state.
 * @param component {Component|Object}
 * @returns {Component|Object}
 */
function provide(component) {
    component.contextTypes = contextTypes || {};
    return component
}

/**
 * Top level component that wraps everything (router, i18n, app)
 * providing an entry point for the store ad state references
 * @class ContextProvider
 * @returns {Component}
 */
class ContextProvider extends Component {
    getChildContext() {
        return this.props.context;
    }
    render() {
        return this.props && this.props.children
    }
}

ContextProvider.childContextTypes = contextTypes

export {
    connect,
    provide
};
