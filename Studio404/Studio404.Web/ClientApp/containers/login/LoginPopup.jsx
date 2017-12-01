import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AccountService from "../../modules/AccountService";
import LoginForm from "../../components/login/LoginForm";

class LoginPopup extends Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.login = this.login.bind(this);
        this.updateUsernameValue = this.updateUsernameValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);

        this.state = {
            open: false
        };
        this.loginInfo = {};
    }
    
    handleOpen() {
        this.setState({open: true});
    }
    
    handleClose() {
        this.setState({open: false});
    }

    updateUsernameValue(value) {
        this.loginInfo.username = value;
    }

    updatePasswordValue(value) {
        this.loginInfo.password = value;
    }

    login() {
        AccountService.Login(this.loginInfo)
            .done(() => {
                this.handleClose();
                this.props.updateUser();
            });
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
                onClick={this.login}/>
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

                    <LoginForm updateUsernameValue={this.updateUsernameValue} updatePasswordValue={this.updatePasswordValue}/>
                </Dialog>
            </div>
        );
    }
}

export default LoginPopup;