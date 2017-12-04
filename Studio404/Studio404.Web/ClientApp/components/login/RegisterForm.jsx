import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class RegisterForm extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter username"
                    floatingLabelText="Username"
                    value={this.props.registerInfo.username}
                    onChange={(e) => this.props.updateRegisterInfo("username", e.target.value)} />
                <br />
                <TextField
                    hintText="Enter password"
                    floatingLabelText="Password"
                    type="password"
                    value={this.props.registerInfo.password}
                    onChange={(e) => this.props.updateRegisterInfo("password", e.target.value)} />
                <br />
                <TextField
                    hintText="Confirm password"
                    floatingLabelText="Password Confirmation"
                    type="password"
                    value={this.props.registerInfo.passwordConfirmation}
                    onChange={(e) => this.props.updateRegisterInfo("passwordConfirmation", e.target.value)} />
            </div>
        );
    }
}

export default RegisterForm;