import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Message extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.state = {
            open: false,
            text: ""
        };
    }
    
    show(text) {
        this.setState({
            open: true,
            text: text
        });
    }

    close() {
        this.setState({
            open: false,
            text: ""
        });
    }

    render() {
        return (
            <Snackbar
                open={this.state.open}
                message={this.state.text}
                autoHideDuration={4000}
                onRequestClose={this.close} />
        );
    }
}

export default Message;