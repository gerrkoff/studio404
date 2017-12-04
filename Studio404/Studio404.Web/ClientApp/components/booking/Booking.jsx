import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import DateService from "../../modules/DateService";
import TimeBooking from "./TimeBooking";
import BookingDayChooser from "../../components/booking/BookingDayChooser";

class Booking extends Component {

    constructor(props) {
        super(props);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.getWeekLabel = this.getWeekLabel.bind(this);

        this.props.loadWeekWorkload(this.props.weekStartDate);
    }

    previousWeek() {
        let newWeekStartDate = DateService.addDaysToDate(this.props.weekStartDate, -7);
        this.props.changeWeekStartDate(newWeekStartDate);
        this.props.loadWeekWorkload(newWeekStartDate);
    }

    nextWeek() {
        let newWeekStartDate = DateService.addDaysToDate(this.props.weekStartDate, 7);
        this.props.changeWeekStartDate(newWeekStartDate);
        this.props.loadWeekWorkload(newWeekStartDate);
    }

    getWeekLabel() {
        let weekEndDate = DateService.addDaysToDate(this.props.weekStartDate, 6);
        let weekLabel = `${DateService.toDateString(this.props.weekStartDate)} – ${DateService.toDateString(weekEndDate)}`;
        return weekLabel;
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
            <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-block" }}>
                    <Paper style={{ marginTop: 10 }} zDepth={2}>
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
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Booking;


