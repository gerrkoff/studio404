import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import AccountService from "../../modules/AccountService";
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

class LoginInfo extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logoff = this.logoff.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);

        this.state = {
            userName: null
        }
        this.getCurrentUser();
    }

    getCurrentUser() {
        AccountService.GetCurrentUser()
            .done(data => {
                this.setState({user: data});
            });
    }

    login() {
        AccountService.Login({email: "qqq", password: "Qwerty!1"})
            .done(() => {
                this.getCurrentUser();
            });
    }

    logoff() {
        AccountService.Logoff()
            .done(() => {
                this.getCurrentUser();
            });
    }

    render() {
        return (
            <Row>
                <Col md="12">
                    <div className="float-right" style={{height: "35px"}}>
                        {this.state.user
                            ? this.userLoggedIn()
                            : <FlatButton label="Login" onClick={this.login} />
                        }
                    </div>
                </Col>
            </Row>
        );
    }

    userLoggedIn() {
        return (
            <div>
                <span>Hello, {this.state.user}!</span>
                <IconButton tooltip="Logoff" onClick={this.logoff}>
                    <ActionHome />
                </IconButton>
            </div>
        );
    }
}

export default LoginInfo;