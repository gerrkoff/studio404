import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Labels from "../../modules/Labels";
import FaIconButton from "../common/FaIconButton";
import css from "../../styles/booking.css";

class BookingHelp extends Component {
    render() {
        return (
            <div>
                {this.props.showHelp
                    ? (
                        <Paper zDepth={1}>
                            <Row>
                                <Col md="11">
                                    <p className={ css.helpText }>
                                        {Labels.booking_help}
                                    </p>
                                </Col>
                                <Col md="1" className={ css.rightAligned }>
                                    <FaIconButton icon="times" size="sm" onClick={() => this.props.toggleHelp(false)} alt={true} className={ css.helpCloseButton }/>
                                </Col>
                            </Row>
                        </Paper>
                    )
                    : (
                        <div className={ css.rightAligned }>
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