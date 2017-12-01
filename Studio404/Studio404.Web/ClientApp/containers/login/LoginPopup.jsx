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
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.submit = this.submit.bind(this);
        this.updateLoginInfo = this.updateLoginInfo.bind(this);
        this.updateRegisterInfo = this.updateRegisterInfo.bind(this);
        this.registrationToggle = this.registrationToggle.bind(this);

        this.state = {
            open: false,
            registration: false
        };
        this.loginInfo = {};
        this.registerInfo = {};
    }
    
    handleOpen() {
        this.setState({open: true});
    }
    
    handleClose() {
        this.setState({open: false});
    }

    updateLoginInfo(loginInfo) {
        this.loginInfo = loginInfo;
    }

    updateRegisterInfo(registerInfo) {
        this.registerInfo = registerInfo;
    }

    login() {
        AccountService.Login(this.loginInfo)
            .done(() => {
                this.handleClose();
                this.props.updateUser();
            });
    }

    register() {
        AccountService.Register(this.registerInfo)
            .done(() => {
                this.handleClose();
                this.props.updateUser();
            });
    }

    submit() {
        if (this.state.registration === true)
            this.register();
        else 
            this.login();
    }

    registrationToggle(event, isChecked) {
        this.setState({registration: isChecked});
    }
    
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}/>,
            <FlatButton
                label={this.state.registration === true ? "Register" : "Login"}
                primary={true}
                onClick={this.submit}/>
        ];
    
        return (
            <div>
                <FlatButton label="Login" onClick={this.handleOpen} />
                <Dialog
                    title={this.state.registration === true ? "Register" : "Login"}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

                    {this.state.registration === true
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