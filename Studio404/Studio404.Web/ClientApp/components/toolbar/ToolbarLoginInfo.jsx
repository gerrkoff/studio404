import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from "react-router-dom";
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LoginPopupContainer from "../../containers/LoginPopupContainer";
import FaIconButton from "../common/FaIconButton";
import css from "../../styles/toolbar.css";

class ToolbarLoginInfo extends Component {

    constructor(props) {
        super(props);
        this.props.loadCurrentUser();
    }

    render() {
        const username = this.props.username && this.props.username.length > 30
            ? this.props.username.substring(0, 30) + "..."
            : this.props.username;

        const userLoggedIn = (
            <div>
                <ToolbarTitle
                    text={username}
                    onClick={() => this.props.history.push("/my")}
                    className={ css.user } />
                <FaIconButton
                    onClick={this.props.logoff}
                    icon="sign-out"
                    size="sm"
                    className={ css.signOut }
                    alt={true} />
            </div>
        );

        return (
            <div>
                {this.props.userLoggedIn === true
                    ? userLoggedIn
                    : <LoginPopupContainer updateUser={this.props.loadCurrentUser}/>
                }
            </div>
        );
    }
}

export default withRouter(ToolbarLoginInfo);