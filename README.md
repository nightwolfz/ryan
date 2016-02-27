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
            this.context.store.doSomething1() // <--- store methods available at all time
            console.log(this.context.state); // <--- state available at all time
            return <div>Test</div>
        }
    }


    /**
     * But first we need to wrap our root component (App in this case)
     * around a ContextProvider before rendering
     * @returns {Component}
     */
    class ContextProvider extends React.Component {

        static childContextTypes = contextTypes;

        getChildContext() {
            return this.props.context;
        }

        render() {
            return this.props && this.props.children
        }
    }


    // Initialize stores & inject server-side state into front-end
    const context = {
        state: window.__STATE, // an observable mobx object
        store: {
            doSomething1() {
                window.__STATE.username = 'test';
            },
            doSomething2() {
                return window.__STATE.something;
            }
        }
    }

    // Render HTML on the browser
    ReactDOM.render(<ContextProvider context={context}>
        <App/>
    </ContextProvider>, document.getElementById('content'));


# Author

    https://github.com/nightwolfz
