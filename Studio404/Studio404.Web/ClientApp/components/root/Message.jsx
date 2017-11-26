import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {open: this.props.open};
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.open)
            this.setState({open: true});
    }

    close() {
        this.setState({open: false});
    }

    render() {
        return (
            <Snackbar
                open={this.state.open}
                message={this.props.text}
                autoHideDuration={4000}
                onRequestClose={this.state.close} />
        );
    }
}

export default Message;