import React, { Component } from 'react';
import TextField from "../common/TextField";

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordConfirmation = this.updatePasswordConfirmation.bind(this);
        this.registerInfo = {};
    }

    updateUsername(value) {
        this.registerInfo.username = value;
        this.props.updateRegisterInfo(this.registerInfo);
    }
    
    updatePassword(value) {
        this.registerInfo.password = value;
        this.props.updateRegisterInfo(this.registerInfo);
    }

    updatePasswordConfirmation(value) {
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter username"
                    floatingLabelText="Username"
                    updateValue={this.updateUsername}/>
                <br />
                <TextField
                    hintText="Enter password"
                    floatingLabelText="Password"
                    type="password"
                    updateValue={this.updatePassword}/>
                <br />
                <TextField
                    hintText="Confirm password"
                    floatingLabelText="Password Confirmation"
                    type="password"
                    updateValue={this.updatePasswordConfirmation}/>
            </div>
        );
    }
}

export default RegisterForm;