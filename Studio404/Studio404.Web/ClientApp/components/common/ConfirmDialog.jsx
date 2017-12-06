import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ConfirmDialog extends Component {

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.hide}
            />,
            <FlatButton
                label={this.props.actionText}
                primary={true}
                onClick={() => {
                    this.props.action();
                    this.props.hide();
                }}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.hide} >
                
                {this.props.text}
            </Dialog>
        );
    }
}

export default ConfirmDialog;