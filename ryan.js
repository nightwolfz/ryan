import React, {Component} from 'react';

// You can add all contextTypes that you want to make available here.
//@TODO: Allow setting types outside of this module.
let contextTypes = {
    router: React.PropTypes.object
}

//@TODO: This doesn't work because mainController executes routes.js
function setContextTypes(types) {
    contextTypes = types;
}

function subscribe(lookup) {
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
}

function createContext(component) {
    component.contextTypes = contextTypes || {};
    return component;
}

function contextProvider() {
    return class extends Component {

        static childContextTypes = contextTypes;

        getChildContext() {
            if (!contextTypes) return {};

            return Object.keys(contextTypes).reduce((contextType, k) => {
                contextType[k] = this.props.context[k];
                return contextType;
            }, {})
        }

        render() {
            return this.props && this.props.children
        }
    }
}

export {React, Component, createContext as context, setContextTypes, subscribe, contextProvider, contextTypes};
