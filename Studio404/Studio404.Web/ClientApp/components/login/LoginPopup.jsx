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
        this.submit = this.submit.bind(this);
        this.updateLoginInfo = this.updateLoginInfo.bind(this);
        this.updateRegisterInfo = this.updateRegisterInfo.bind(this);
        this.registrationToggle = this.registrationToggle.bind(this);

        this.state = {registration: false};
        this.loginInfo = {};
        this.registerInfo = {};
    }

    updateLoginInfo(loginInfo) {
        this.loginInfo = loginInfo;
    }

    updateRegisterInfo(registerInfo) {
        this.registerInfo = registerInfo;
    }

    submit() {
        if (this.props.registration === true)
            this.props.register(this.registerInfo);
        else 
            this.props.login(this.loginInfo);
    }

    registrationToggle(event, isChecked) {
        this.props.toggleRegistration(isChecked);
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
                onClick={this.submit}/>
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
                        : <LoginForm updateLoginInfo={this.updateLoginInfo} /> 
                    }
                    <br />
                    <Toggle
                        label="Registration"
                        labelPosition="right"
                        onToggle={this.registrationToggle} />
                </Dialog>
            </div>
        );
    }
}

export default LoginPopup;