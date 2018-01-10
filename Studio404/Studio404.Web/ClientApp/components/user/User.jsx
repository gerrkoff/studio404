import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import UserBookings from "../../containers/UserBookingContainer";
import UserSettings from "./UserSettings";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import css from "../../styles/userProfile.css";

class User extends Component {

    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.renderUser = this.renderUser.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.state = { menuChoosed: 0 };
    }

    handleMenuItemClick(item) {
        this.setState({menuChoosed: item});
    }

    render() {
        return (
            <div>
                {this.props.userLoggedIn === true
                    ? this.renderUser()
                    : <Row>
                        <Col md="12"><ErrorLabel text={Labels.errorLoginNeed}/></Col>
                    </Row>
                }
            </div>
        );
    }

    renderUser() {
        return (
            <Row>
                <Col md="3">
                    <List>
                        <ListItem
                            primaryText={Labels.bookings}
                            leftIcon={<FontIcon className="fa fa-list-alt" />}
                            onClick={() => this.handleMenuItemClick(0)} />
                        <ListItem
                            primaryText={Labels.settings}
                            leftIcon={<FontIcon className="fa fa-cog" />}
                            onClick={() => this.handleMenuItemClick(1)} />
                    </List>
                </Col>
                <Col md="9">
                    <Paper className={ css.main } zDepth={1}>
                        {this.renderMenuItem()}
                    </Paper>
                </Col>
            </Row>
        );
    }

    renderMenuItem() {
        switch (this.state.menuChoosed) {
            case 0: return <UserBookings />;
            case 1: return <UserSettings phone={this.props.phone} phoneConfirmed={this.props.phoneConfirmed} />;
        }
    }
}

export default User;