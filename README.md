

# WARNING !! THIS IS BARELY WORKING !
# Expect a stable release some time later


# Installation

    npm install ryan

# Running

Run the following command in the root of the project:

    nodemon

This will auto restart your server when changes are detected.


# Usage

Wrap your entry point component with the ContextProvider

    import {React, ContextProvider} from './helpers/context';

    const context = {
        helloWorld(str) {
            console.log('Hello ' + str);
        }
    };

    // Render HTML on the browser
    ReactDOM.render(<ContextProvider context={context}>
        <YourApp/>
    </ContextProvider>, document.getElementById('content'));


# Author

    https://github.com/takanorig/mqtt-bench
