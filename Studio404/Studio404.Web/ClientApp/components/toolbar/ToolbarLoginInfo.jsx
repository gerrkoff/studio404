import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import {withRouter} from "react-router-dom";
import LoginPopupContainer from "../../containers/LoginPopupContainer";
import FaIconButton from "../common/FaIconButton";
import css from "../../styles/toolbar.css";
import { muiTheme } from '../../modules/MaterialTheme';

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
                <NavLink className={ css.user } 
                         onClick={() => this.props.history.push("/my")}
                         style={{color: muiTheme.palette.accent1Color}}>
                    {username}
                </NavLink>
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
                    : <LoginPopupContainer updateUser={this.props.loadCurrentUser} toolbarLoginBtn={true}/>
                }
            </div>
        );
    }
}

export default withRouter(ToolbarLoginInfo);