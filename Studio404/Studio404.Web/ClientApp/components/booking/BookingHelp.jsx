import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Labels from "../../modules/Labels";
import FaIconButton from "../common/FaIconButton";

class BookingHelp extends Component {
    render() {
        return (
            <div>
                {this.props.showHelp
                    ? (
                        <Paper zDepth={1}>
                            <Row>
                                <Col md="11">
                                    <p style={{padding: "10px 0px 0px 20px", whiteSpace: "pre-line"}}>
                                        {Labels.booking_help}
                                    </p>
                                </Col>
                                <Col md="1" style={{textAlign: "right"}}>
                                    <FaIconButton icon="times" size="sm" onClick={() => this.props.toggleHelp(false)} alt={true} style={{padding: 10}}/>
                                </Col>
                            </Row>
                        </Paper>
                    )
                    : (
                        <div style={{textAlign: "right"}}>
                            <FlatButton
                                label={Labels.booking_helpShow}
                                secondary={true}
                                onClick={() => this.props.toggleHelp(true)}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default BookingHelp;