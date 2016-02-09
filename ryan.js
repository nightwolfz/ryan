import React, {Component} from 'react';
import {observer} from 'mobservable-react';

/**
 * Define what to inject in the context
 */
const contextTypes = {
    router: React.PropTypes.object,
    uiStore: React.PropTypes.object,
    userStore: React.PropTypes.object,
    chatStore: React.PropTypes.object,
    cacheStore: React.PropTypes.object
}

const createContext = function(CreatedComponent) {
    CreatedComponent.contextTypes = contextTypes;
    return class extends React.Component {
        render() {
            return React.createElement(observer(CreatedComponent), this.props);
        }
    }
};

createContext.subscribe = function(lookup) {
    if (!lookup) return contextTypes;

    let customTypes = {};
    for (let i = 0; i < lookup.length; i++) {
        var type = lookup[i];
        if (contextTypes[type]) {
            customTypes[type] = contextTypes[type];
        } else {
            console.warn('ContextType `' + type + '` does not exist');
        }
    }
    return customTypes;
};

/**
 * This component must wrap your main entry component (thus above react-router / i18n as well)
 */
class ContextProvider extends Component {

    static childContextTypes = contextTypes;

    getChildContext() {
        return Object.keys(contextTypes).reduce((contextType, k) => {
            contextType[k] = this.props.context[k];
            return contextType;
        }, {})
    }

    render() {
        return this.props && this.props.children
    }
}

/**
 * Export them all
 */
export {
    React,
    Component,
    contextTypes,
    createContext as create,
    ContextProvider
};
