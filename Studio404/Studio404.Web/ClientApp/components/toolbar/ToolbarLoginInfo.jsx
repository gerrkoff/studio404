import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from "react-router-dom";
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AccountService from "../../modules/AccountService";
import LoginPopup from "../login/LoginPopup";
import FaIconButton from "../common/FaIconButton";

class ToolbarLoginInfo extends Component {

    constructor(props) {
        super(props);
        this.logoff = this.logoff.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.moveToUser = this.moveToUser.bind(this);

        this.state = {
            username: null
        }
        this.getCurrentUser();
    }

    getCurrentUser() {
        AccountService.GetCurrentUser()
            .done(data => {
                this.setState({username: data});
            });
    }

    moveToUser() {
        this.props.history.push("/my");
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
                <ToolbarTitle
                    text={this.state.username}
                    onClick={this.props.test}
                    style={{cursor: "pointer"}} />
                <FaIconButton onClick={this.logoff} icon="sign-out" size="sm" style={{paddingLeft: "10px"}} alt={true} />
            </div>
        );

        return (
            <div>
                {this.props.msg}
                {this.state.username
                    ? userLoggedIn
                    : <LoginPopup updateUser={this.getCurrentUser}/>
                }
            </div>
        );
    }
}

export default withRouter(ToolbarLoginInfo);