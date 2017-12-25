import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import DateService from "../../modules/DateService";
import HourSelector from "../../components/booking/HourSelector";
import Loader from "../../components/common/Loader";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import ConfirmPhonePopupContainer from "../../containers/ConfirmPhonePopupContainer";

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
                            <h5 style={{paddingLeft: "10px"}}>{DateService.toDateString(this.props.chosenDate)}</h5>
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
                            {this.props.dayHoursError && <ErrorLabel align="left" text={Labels.errorLoadCommon} />}
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
                                disabled={!this.props.bookingIsValid || !this.props.userLoggedIn || !this.props.phoneConfirmed} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    renderInfo() {
        if (!this.props.userLoggedIn)
            return <p>{Labels.booking_userNotLoggedIn}</p>;

        if (!this.props.phoneConfirmed)
            return (
                <div>
                    <p>{Labels.booking_phoneNotConfirmed}</p>
                    <ConfirmPhonePopupContainer />
                </div>
            );

        if (this.props.bookingHours.length === 0)
            return <p>{Labels.booking_defaultInfo}</p>;

        if (!this.props.bookingIsValid)
            return <p>{Labels.booking_hoursInvalid}</p>;

        return <p>{Labels.booking_choiceInfo(this.props.bookingHours[0], this.props.bookingHours[this.props.bookingHours.length-1])}</p>;
    }
}

const styles = {
    formElement: {
        padding: 10
    }
}

export default TimeBooking;