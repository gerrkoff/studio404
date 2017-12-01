import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import AccountService from "../../modules/AccountService";
import LoginPopup from "../login/LoginPopup";

class LoginInfo extends Component {

    constructor(props) {
        super(props);
        this.logoff = this.logoff.bind(this);
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

    logoff() {
        AccountService.Logoff()
            .done(() => {
                this.getCurrentUser();
            });
    }

    render() {
        const userLoggedIn = (
            <div>
                <span>Hello, {this.state.user}!</span>
                <IconButton tooltip="Logoff" onClick={this.logoff}>
                    <ActionHome />
                </IconButton>
            </div>
        );

        return (
            <Row>
                <Col md="12">
                    <div className="float-right" style={{height: "35px"}}>
                        {this.state.user
                            ? userLoggedIn
                            : <LoginPopup updateUser={this.getCurrentUser}/>
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}

export default LoginInfo;