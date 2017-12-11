import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from "react-router-dom";
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LoginPopupContainer from "../../containers/LoginPopupContainer";
import FaIconButton from "../common/FaIconButton";

class ToolbarLoginInfo extends Component {

    constructor(props) {
        super(props);
        this.props.loadCurrentUser();
    }

    render() {
        const username = this.props.username.substring(0, 20) + "...";

        const userLoggedIn = (
            <div>
                <ToolbarTitle
                    text={username}
                    onClick={() => this.props.history.push("/my")}
                    style={{cursor: "pointer"}} />
                <FaIconButton
                    onClick={this.props.logoff}
                    icon="sign-out"
                    size="sm"
                    style={{paddingLeft: "10px"}}
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