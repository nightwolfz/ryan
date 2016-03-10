# Installation

    npm install ryan

# Idea

The goal is to provide contextTypes through higher-order components so you can write your code like this:

    import React from 'react';
    import ReactDOM from 'react-dom';
    import {connect} from 'ryan';

    @connect
    class App extends React.Component {
        render() {
            // store methods available at all times
            this.context.store.getUsername()
            // state available at all times
            return <div>{this.context.state.username}</div>
        }
    }


    /**
     * But first we need to wrap our root component (App in this case)
     * around a ContextProvider before rendering
     * @returns {Component}
     */
    import React from 'react';
    import {contextTypes} from 'ryan';

    class ContextProvider extends React.Component {

        static childContextTypes = contextTypes;

        getChildContext() {
            return this.props.context;
        }

        render() {
            return this.props && this.props.children
        }
    }

    /**
     * Then we put it all together.
     * Initialize stores & inject state into our context
     */
    const context = {
        state: window.__STATE, // an observable mobx object
        store: {
            setUsername(username) {
                window.__STATE.username = username;
            },
            getUsername() {
                return window.__STATE.username;
            }
        }
    }

    // Render HTML on the browser
    ReactDOM.render(<ContextProvider context={context}>
        <App/>
    </ContextProvider>, document.getElementById('content'));


# Author

    https://github.com/nightwolfz
