import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AccountService from "../../modules/AccountService";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import Toggle from 'material-ui/Toggle';

class LoginPopup extends Component {

    constructor(props) {
        super(props);
        this.updateRegisterInfo = this.updateRegisterInfo.bind(this);
        this.registerInfo = {};
    }

    updateRegisterInfo(registerInfo) {
        this.registerInfo = registerInfo;
    }
    
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
                        ? () => this.props.register(this.registerInfo)
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
                        ? <RegisterForm updateRegisterInfo={this.updateRegisterInfo} />
                        : <LoginForm updateLoginInfo={this.props.updateLoginInfo} /> 
                    }
                    <br />
                    <Toggle
                        label="Registration"
                        labelPosition="right"
                        onToggle={(event, isChecked) => this.props.toggleRegistration(isChecked)} />
                </Dialog>
            </div>
        );
    }
}

export default LoginPopup;