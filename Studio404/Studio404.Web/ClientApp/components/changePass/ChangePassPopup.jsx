import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Labels from "../../modules/Labels";

class ChangePassPopup extends Component {

    render() {
        const actions = [
            <FlatButton
                label={Labels.cancel}
                primary={true}
                onClick={this.props.closeChangePassPopup}
            />,
            <FlatButton
                label={Labels.changePass_button}
                primary={true}
                onClick={() => this.props.changePassword(this.props.info)}
                disabled={!this.props.info.isValid}
            />
        ];

        return (
            <div>
                <RaisedButton label={Labels.changePass_button} primary={true} onClick={this.props.openChangePassPopup} />
                <Dialog
                    title={Labels.changePass_title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closeChangePassPopup}
                    contentStyle={{ width: '100%', maxWidth: '600px' }}
                    autoScrollBodyContent={true}>

                    <TextField
                        hintText={Labels.changePass_currentPassEnter}
                        floatingLabelText={Labels.changePass_currentPass}
                        type="password"
                        errorText={this.props.info.currentPasswordError}
                        value={this.props.info.currentPassword}
                        onChange={(e) => this.props.updateChangePassInfo("currentPassword", e.target.value)} />
                    <br />
                    <TextField
                        hintText={Labels.changePass_newPassEnter}
                        floatingLabelText={Labels.changePass_newPass}
                        type="password"
                        errorText={this.props.info.newPasswordError}
                        value={this.props.info.newPassword}
                        onChange={(e) => this.props.updateChangePassInfo("newPassword", e.target.value)} />
                    <br />
                    <TextField
                        hintText={Labels.changePass_newPassConfirmEnter}
                        floatingLabelText={Labels.changePass_newPassConfirm}
                        type="password"
                        errorText={this.props.info.newPasswordConfirmError}
                        value={this.props.info.newPasswordConfirm}
                        onChange={(e) => this.props.updateChangePassInfo("newPasswordConfirm", e.target.value)} />
                </Dialog>
            </div>
        );
    }
}

export default ChangePassPopup;