import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AccountService from "../../modules/AccountService";
import LoginPopup from "../../containers/login/LoginPopup";
import {withRouter} from "react-router-dom";
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

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
                    onClick={this.moveToUser}
                    style={{cursor: "pointer"}} />
                <FontIcon 
                    className="fa fa-sign-out"
                    style={{fontSize: "20px", paddingLeft: "10px", cursor: "pointer"}}
                    onClick={this.logoff} />
            </div>
        );

        return (
            <div>
                {this.state.username
                    ? userLoggedIn
                    : <LoginPopup updateUser={this.getCurrentUser}/>
                }
            </div>
        );
    }
}

export default withRouter(ToolbarLoginInfo);