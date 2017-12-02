import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserBookings from "./UserBookings";
import Paper from 'material-ui/Paper';

const style = {
    marginTop: 10,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer'
};

class User extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col md="12">
                <Paper style={style} zDepth={2}>
                    <Tabs>
                        <Tab label="My bookings">
                            <UserBookings />
                        </Tab>
                        <Tab label="Settings">
                            <h4>Settings!</h4>
                        </Tab>
                    </Tabs>
                </Paper>
                </Col>
            </Row>
        );
    }
}

export default User;