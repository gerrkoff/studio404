import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import BookingService from "../../modules/BookingService";
import DateService from "../../modules/DateService";
import HourSelector from "../../components/booking/HourSelector";
import Loader from "../../components/common/Loader";

class TimeBooking extends Component {
    constructor(props) {
        super(props);
        this.props.loadDayHours(this.props.chosenDate);        
    }

    render() {
        return (
            <div style={{width: "800px", textAlign: "left"}}>
                <Row>
                    <Col md="6">
                        <div style={styles.formElement}>
                            <h5>{DateService.toDateString(this.props.chosenDate)}</h5>
                        </div>
                        <div style={{padding: 20, paddingTop: 0, verticalAlign: "center", position: "relative"}}>
                            <div style={{display: "inline-block"}}>
                                <HourSelector
                                    dayHours={this.props.dayHours}
                                    hours={this.props.bookingHours}
                                    error={this.props.bookingHoursError}
                                    disabled={this.props.dayHoursIsLoading || this.props.dayHoursError}
                                    updateHours={this.props.updateHours}
                                />
                            </div>
                            <div style={{display: "inline-block", position: "relative", padding: 10, top: "-10px"}}>
                                {this.props.dayHoursIsLoading === true && <Loader />}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div style={styles.formElement}>
                            {this.renderInfo()}
                        </div>
                        <div style={{padding: 20, textAlign: "right"}}>
                            <RaisedButton
                                label="Book"
                                primary={true}
                                onClick={() => this.props.saveBooking(this.props.chosenDate, this.props.bookingHours)}
                                disabled={!this.props.bookingIsValid || !this.props.userLoggedIn} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    renderInfo() {
        if (this.props.bookingHours.length === 0)
            return <p>Some default info!</p>;
        if (this.props.bookingIsValid === true)
            return <p>Some info about booking!</p>;
        else
            return <p>Hours are incorrect!</p>;
    }
}

const styles = {
    formElement: {
        padding: 20
    }
}

export default TimeBooking;