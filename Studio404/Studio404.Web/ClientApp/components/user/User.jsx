import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserBookings from "./UserBookings";
import UserSettings from "./UserSettings";
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';

class User extends Component {

    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.state = {
            menuChoosed: 0
        }
    }

    handleMenuItemClick(item) {
        this.setState({menuChoosed: item});
    }

    render() {
        return (
            <Row>
                <Col md="3">
                    <List>
                        <ListItem
                            primaryText="Bookings"
                            leftIcon={<ContentInbox />}
                            onClick={() => this.handleMenuItemClick(0)}
                            styles={{backgroundColor: "red"}} />
                        <ListItem
                            primaryText="Settings"
                            leftIcon={<ActionGrade />}
                            onClick={() => this.handleMenuItemClick(1)} />
                    </List>
                </Col>
                <Col md="9">
                    <Paper style={{marginTop: 8}} zDepth={2}>
                        {this.renderMenuItem()}
                    </Paper>
                </Col>
            </Row>
        );
    }

    renderMenuItem() {
        switch (this.state.menuChoosed) {
            case 0: return <UserBookings />;
            case 1: return <UserSettings />;
        }
    }
}

export default User;