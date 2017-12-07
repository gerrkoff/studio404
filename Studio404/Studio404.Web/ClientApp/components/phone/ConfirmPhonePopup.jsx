import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class ConfirmPhonePopup extends Component {

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closePopup}
            />
        ];

        return (
            <div>
                <RaisedButton label="Confirm phone" primary={true} onClick={this.props.openPopup} />
                <Dialog
                    title="Phone"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closePopup}
                    contentStyle={{ width: '100%', maxWidth: '600px' }}
                    autoScrollBodyContent={true}>

                    <TextField
                        hintText="Enter phone"
                        floatingLabelText="Phone"
                        value={this.props.phone}
                        onChange={(e) => this.props.updatePhone(e.target.value)} />
                    <br />
                    <FlatButton
                        label="Send"
                        primary={true}
                        onClick={() => this.props.sendPhoneConfirmation(this.props.phone)}
                    />
                    <br />
                    <TextField
                        hintText="Enter code"
                        floatingLabelText="Code"
                        value={this.props.code}
                        onChange={(e) => this.props.updateCode(e.target.value)} />
                    <br />
                    <FlatButton
                        label="Confirm"
                        primary={true}
                        onClick={() => this.props.confirmPhone(this.props.phone, this.props.code)}
                    />
                </Dialog>
            </div>
        );
    }
}

export default ConfirmPhonePopup;