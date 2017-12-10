import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Labels from "../../modules/Labels";

class LoginForm extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText={Labels.loginForm_userEnter}
                    floatingLabelText={Labels.loginForm_user}
                    value={this.props.loginInfo.username}
                    onChange={(e) => this.props.updateLoginInfo("username", e.target.value)}
                    errorText={this.props.loginInfo.usernameError} />
                <br />
                <TextField
                    hintText={Labels.loginForm_passEnter}
                    floatingLabelText={Labels.loginForm_pass}
                    type="password"
                    value={this.props.loginInfo.password}
                    onChange={(e) => this.props.updateLoginInfo("password", e.target.value)}
                    errorText={this.props.loginInfo.passwordError} />
            </div>
        );
    }
}

export default LoginForm;