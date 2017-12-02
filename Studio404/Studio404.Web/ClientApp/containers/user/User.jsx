import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserBookings from "./UserBookings";

class User extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col md="12">
                <Tabs>
                    <Tab label="My bookings">
                        <UserBookings />
                    </Tab>
                    <Tab label="Settings">
                        <h4>Settings!</h4>
                    </Tab>
                </Tabs>
                </Col>
            </Row>
        );
    }
}

export default User;