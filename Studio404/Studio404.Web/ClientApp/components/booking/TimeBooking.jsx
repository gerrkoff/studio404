﻿import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import DateService from "../../modules/DateService";
import HourSelector from "../../components/booking/HourSelector";
import Loader from "../../components/common/Loader";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import ConfirmPhonePopupContainer from "../../containers/ConfirmPhonePopupContainer";
import LoginPopupContainer from "../../containers/LoginPopupContainer";
import css from "../../styles/booking.css";

class TimeBooking extends Component {
    constructor(props) {
        super(props);
        this.props.loadDayHours(this.props.chosenDate);
    }

    render() {
        return (
            <div className={ css.timeForm }>
                <Row>
                    <Col md="6">
                        <div className={css.timeFormElement}>
                            <h5 className={css.timeFormDateLabel}>{DateService.toDateString(this.props.chosenDate)}</h5>
                        </div>
                        <div className={css.hourSelectBlock}>
                            <div className={css.hourSelectContainer}>
                                <HourSelector
                                    dayHours={this.props.dayHours}
                                    hours={this.props.bookingHours}
                                    error={this.props.bookingHoursError}
                                    disabled={this.props.dayHoursIsLoading || this.props.dayHoursError}
                                    updateHours={this.props.updateHours}
                                />
                            </div>
                            <div className={css.hourSelectLoader}>
                                {this.props.dayHoursIsLoading && <Loader />}
                            </div>
                            {this.props.dayHoursError && <ErrorLabel align="left" text={Labels.errorLoadCommon} />}
                        </div>
                    </Col>
                    <Col md="6">
                        <div className={css.timeFormElement}>
                            {this.renderInfo()}
                        </div>
                        <div className={css.timeFormSubmitContainer}>
                            <RaisedButton
                                label={Labels.booking_book}
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
            return (
                <div>
                    <p>{Labels.booking_userNotLoggedIn}</p>
                    <LoginPopupContainer />
                </div>
            );

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

        return (
            <div>
                <p>{Labels.booking_choiceInfo(this.props.bookingHours[0], this.props.bookingHours[this.props.bookingHours.length - 1])}</p>
                {this.renderCostInfo()}
            </div>
        );
    }

    renderCostInfo() {
        let cost = <span />;

        if (this.props.hoursCostIsLoading)
            cost = (
                <div className={css.hoursCostLoader}>
                    <Loader size={15}/>
                </div>
            )
        else if (!this.props.hoursCostError)
            cost = <span>{this.props.hoursCost}₽</span>
        
        return (
            <div>
                <span>{Labels.booking_hoursCost}: </span>
                {cost}
            </div>
        );
    }
}

export default TimeBooking;