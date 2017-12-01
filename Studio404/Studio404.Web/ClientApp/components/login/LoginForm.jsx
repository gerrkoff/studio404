import React, { Component } from 'react';
import TextField from "../common/TextField";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.loginInfo = {};
    }

    updateUsername(value) {
        this.loginInfo.username = value;
        this.props.updateLoginInfo(this.loginInfo);
    }
    
    updatePassword(value) {
        this.loginInfo.password = value;
        this.props.updateLoginInfo(this.loginInfo);
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
            </div>
        );
    }
}

export default LoginForm;