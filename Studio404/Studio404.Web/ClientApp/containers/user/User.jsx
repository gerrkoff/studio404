import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserBookings from "./UserBookings";

class User extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: this.props.match.params.tab,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.tab != this.props.match.params.tab)
            this.setState({value: nextProps.match.params.tab});
    }

    handleChange(value) {
        this.setState({value: value});
    };

    render() {
        return (
            <Row>
                <Col md="12">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}>
                    
                        <Tab label="My bookings" value="bookings">
                            <UserBookings />
                        </Tab>
                        <Tab label="Settings" value="settings">
                            <h4>Settings!</h4>
                        </Tab>
                </Tabs>
                </Col>
            </Row>
        );
    }
}

export default User;