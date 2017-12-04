import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AccountService from "../../modules/AccountService";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import Toggle from 'material-ui/Toggle';

class LoginPopup extends Component {
    
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.closePopup}/>,
            <FlatButton
                label={this.props.registration === true ? "Register" : "Login"}
                primary={true}
                onClick={
                    this.props.registration === true
                        ? () => this.props.register(this.props.registerInfo)
                        : () => this.props.login(this.props.loginInfo)
                }/>
        ];
    
        return (
            <div>
                <FlatButton label="Login" primary={true} onClick={this.props.openPopup} />
                <Dialog
                    title={this.props.registration === true ? "Register" : "Login"}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closePopup}>

                    {this.props.registration === true
                        ? <RegisterForm updateRegisterInfo={this.props.updateRegisterInfo} registerInfo={this.props.registerInfo} />
                        : <LoginForm updateLoginInfo={this.props.updateLoginInfo} loginInfo={this.props.loginInfo} /> 
                    }
                    <br />
                    <Toggle
                        label="Registration"
                        labelPosition="right"
                        defaultToggled={this.props.registration}
                        onToggle={(event, isChecked) => this.props.toggleRegistration(isChecked)} />
                </Dialog>
            </div>
        );
    }
}

export default LoginPopup;