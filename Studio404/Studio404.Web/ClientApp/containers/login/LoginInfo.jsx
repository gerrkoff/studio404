import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
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
                <span>{this.state.user}</span>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}} >
                    
                        <MenuItem primaryText="My bookings" />
                        <MenuItem primaryText="Settings" />
                        <Divider />
                        <MenuItem primaryText="Sign out" onClick={this.logoff}/>
                </IconMenu>
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