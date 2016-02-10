

# WARNING !! THIS IS BARELY WORKING ! DO NOT USE !
# Expect a stable release some time later


# Installation

    npm install ryan

# Idea

The goal is to provide contextTypes through higher-order components so you can write your code like this:

    import React from 'react';
    import {context} from 'context';

    class App extends React.Component {
        render() {
            console.log(this.context); // <--- contexttypes available without declaring them for each component
            return <div>Test</div>
        }
    }

    export default context(App);


# Author

    https://github.com/nightwolfz
