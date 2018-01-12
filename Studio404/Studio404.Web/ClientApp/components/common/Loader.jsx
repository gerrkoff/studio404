import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loader extends Component {
    render() {
        return (
            <CircularProgress size={this.props.size ? this.props.size : 20} thickness={2} />
        );
    }
}

export default Loader;