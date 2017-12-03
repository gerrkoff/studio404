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
        this.goTo = this.goTo.bind(this);

        this.state = {
            username: null
        }
        this.props.loadCurrentUser();
    }

    goTo(path) {
        this.props.history.push(path);
    }

    logoff() {
        AccountService.Logoff()
            .done(() => {
                this.props.loadCurrentUser();
            });
    }

    render() {
        const userLoggedIn = (
            <div>
                <ToolbarTitle
                    text={this.props.username}
                    onClick={() => this.goTo("/my")}
                    style={{cursor: "pointer"}} />
                <FaIconButton onClick={this.logoff} icon="sign-out" size="sm" style={{paddingLeft: "10px"}} alt={true} />
            </div>
        );

        return (
            <div>
                {this.props.userLoggedIn
                    ? userLoggedIn
                    : <LoginPopup updateUser={this.props.loadCurrentUser}/>
                }
            </div>
        );
    }
}

export default withRouter(ToolbarLoginInfo);