import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import Labels from "../../modules/Labels";
import css from "../../styles/popup.css";

class LoginPopup extends Component {

    constructor(props) {
        super(props);
        this.externalLogin = this.externalLogin.bind(this);
    }

    render() {
        const actions = [
            <FlatButton
                label={Labels.cancel}
                primary={true}
                onClick={this.props.closePopup}
            />,
            <FlatButton
                label={this.props.registration === true ? Labels.loginPopup_register : Labels.loginPopup_login}
                primary={true}
                onClick={
                    this.props.registration === true
                        ? () => this.props.register(this.props.registerInfo)
                        : () => this.props.login(this.props.loginInfo)
                }
                disabled={
                    this.props.registration === true
                        ? !this.props.registerInfo.isValid
                        : !this.props.loginInfo.isValid
                }
            />
        ];

        return (
            <div>
                <FlatButton label={Labels.loginPopup_login} primary={true} onClick={this.props.openPopup} />
                <Dialog
                    title={this.props.registration === true ? Labels.loginPopup_register_title : Labels.loginPopup_login_title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closePopup}
                    contentClassName={ css.popup }
                    autoScrollBodyContent={true}>

                    {this.props.registration === true
                        ? <RegisterForm updateRegisterInfo={this.props.updateRegisterInfo} registerInfo={this.props.registerInfo} />
                        : <LoginForm updateLoginInfo={this.props.updateLoginInfo} loginInfo={this.props.loginInfo} externalLogin={this.externalLogin} />
                    }
                    <br />
                    <Toggle
                        label={Labels.loginPopup_toogleRegister}
                        labelPosition="right"
                        toggled={this.props.registration}
                        onToggle={(event, isChecked) => this.props.toggleRegistration(isChecked)} />
                </Dialog>
            </div>
        );
    }

    externalLogin(provider) {
        let returnUrl = encodeURI(this.props.location.pathname);
        let redirectUrl = `/externallogin/${provider}?returnUrl=${returnUrl}`;
        location.replace(redirectUrl);
    }
}

export default withRouter(LoginPopup);