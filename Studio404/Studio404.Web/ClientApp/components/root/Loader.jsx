import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loader extends Component {
    render() {
        return (
            <CircularProgress size={60} thickness={7} />
        );
    }
}

export default Loader;