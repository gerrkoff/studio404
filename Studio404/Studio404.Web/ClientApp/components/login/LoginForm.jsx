import React, { Component } from 'react';
import TextField from "../common/TextField";

class LoginForm extends Component {
    render() {
        return (
            <div>
                <TextField
                    hintText="Enter username"
                    floatingLabelText="Username"
                    updateValue={this.props.updateUsernameValue}/>
                <br />
                <TextField
                    hintText="Enter password"
                    floatingLabelText="Password"
                    type="password"
                    updateValue={this.props.updatePasswordValue}/>
            </div>
        );
    }
}

export default LoginForm;