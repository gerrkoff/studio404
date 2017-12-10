import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Labels from "../../modules/Labels";

class RegisterForm extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText={Labels.loginForm_userEnter}
                    floatingLabelText={Labels.loginForm_user}
                    errorText={this.props.registerInfo.usernameError}
                    value={this.props.registerInfo.username}
                    onChange={(e) => this.props.updateRegisterInfo("username", e.target.value)} />
                <br />
                <TextField
                    hintText={Labels.loginForm_passEnter}
                    floatingLabelText={Labels.loginForm_pass}
                    type="password"
                    errorText={this.props.registerInfo.passwordError}
                    value={this.props.registerInfo.password}
                    onChange={(e) => this.props.updateRegisterInfo("password", e.target.value)} />
                <br />
                <TextField
                    hintText={Labels.loginForm_passConfirmEnter}
                    floatingLabelText={Labels.loginForm_passConfirm}
                    type="password"
                    errorText={this.props.registerInfo.passwordConfirmError}
                    value={this.props.registerInfo.passwordConfirm}
                    onChange={(e) => this.props.updateRegisterInfo("passwordConfirm", e.target.value)} />
            </div>
        );
    }
}

export default RegisterForm;