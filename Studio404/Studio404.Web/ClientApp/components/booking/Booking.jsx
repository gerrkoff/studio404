import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import DateService from "../../modules/DateService";
import TimeBooking from "./TimeBooking";
import BookingDayChooser from "../../components/booking/BookingDayChooser";
import css from "../../styles/booking.css";

class Booking extends Component {

    constructor(props) {
        super(props);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.getWeekLabel = this.getWeekLabel.bind(this);
        this.saveBooking = this.saveBooking.bind(this);

        this.props.loadWeekWorkload(this.props.weekStartDate);
    }

    previousWeek() {
        let newWeekStartDate = DateService.addDaysToDate(this.props.weekStartDate, -7);
        this.props.changeWeekStartDate(newWeekStartDate);
    }

    nextWeek() {
        let newWeekStartDate = DateService.addDaysToDate(this.props.weekStartDate, 7);
        this.props.changeWeekStartDate(newWeekStartDate);
    }

    getWeekLabel() {
        let weekEndDate = DateService.addDaysToDate(this.props.weekStartDate, 6);
        let weekLabel = `${DateService.toDateString(this.props.weekStartDate)} – ${DateService.toDateString(weekEndDate)}`;
        return weekLabel;
    }

    saveBooking(date, hours) {
        this.props.saveBooking(date, hours, this.props.weekStartDate);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <BookingDayChooser
                            previousWeek={this.previousWeek}
                            nextWeek={this.nextWeek}
                            weekLabel={this.getWeekLabel()}
                            weekWorkload={this.props.weekWorkload}
                            weekWorkloadIsLoading={this.props.weekWorkloadIsLoading}
                            weekWorkloadError={this.props.weekWorkloadError}
                            chooseDay={this.props.chooseDay}
                            showHelp={this.props.showHelp}
                            toggleHelp={this.props.toggleHelp}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {this.props.chosenDate && this.renderTimeBooking()}
                    </Col>
                </Row>
            </div>
        );
    }

    renderTimeBooking() {
        return (
            <div className={ css.timeContainer }>
                <div className={ css.timePageContainer }>
                    <Paper zDepth={1}>
                        <TimeBooking
                            chosenDate={this.props.chosenDate}
                            dayHoursIsLoading={this.props.dayHoursIsLoading}
                            dayHours={this.props.dayHours}
                            dayHoursError={this.props.dayHoursError}
                            bookingHours={this.props.bookingHours}
                            bookingHoursError={this.props.bookingHoursError}
                            bookingIsValid={this.props.bookingIsValid}
                            loadDayHours={this.props.loadDayHours}
                            updateHours={this.props.updateHours}
                            saveBooking={this.saveBooking}
                            userLoggedIn={this.props.userLoggedIn}
                            phoneConfirmed={this.props.phoneConfirmed}
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Booking;


