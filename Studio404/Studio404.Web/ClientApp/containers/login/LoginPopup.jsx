import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AccountService from "../../modules/AccountService";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";

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

        this.state = {
            open: false
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
        this.register();
    }
    
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}/>,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.submit}/>
        ];
    
        return (
            <div>
                <FlatButton label="Login" onClick={this.handleOpen} />
                <Dialog
                    title="Login"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

                    <LoginForm updateLoginInfo={this.updateLoginInfo} />
                    <RegisterForm updateRegisterInfo={this.updateRegisterInfo} />
                </Dialog>
            </div>
        );
    }
}

export default LoginPopup;