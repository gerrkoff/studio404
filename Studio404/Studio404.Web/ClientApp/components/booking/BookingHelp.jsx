import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import Labels from "../../modules/Labels";

class BookingHelp extends Component {
    render() {
        return (
            <Paper zDepth={2}>
                <Row>
                    <Col md="11">
                        <p style={{padding: "10px 0px 0px 10px"}}>
                            {Labels.booking_help}
                        </p>
                    </Col>
                </Row>
            </Paper>
        );
    }
}

export default BookingHelp;