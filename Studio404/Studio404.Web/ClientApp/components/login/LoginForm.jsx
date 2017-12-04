import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class LoginForm extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter username"
                    floatingLabelText="Username"                    
                    value={this.props.loginInfo.username}
                    onChange={(e) => this.props.updateLoginInfo("username", e.target.value)} />
                <br />
                <TextField
                    hintText="Enter password"
                    floatingLabelText="Password"
                    type="password"
                    value={this.props.loginInfo.password}
                    onChange={(e) => this.props.updateLoginInfo("password", e.target.value)} />
            </div>
        );
    }
}

export default LoginForm;