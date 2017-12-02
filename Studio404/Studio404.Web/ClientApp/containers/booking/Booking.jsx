import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import BookingService from "../../modules/BookingService";
import DateService from "../../modules/DateService";
import TimeBooking from "./TimeBooking";
import BookingDayChooser from "../../components/booking/BookingDayChooser";
import Message from "../../components/common/Message";

class Booking extends Component {

    constructor(props) {
        super(props);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.getWeekWorkload = this.getWeekWorkload.bind(this);
        this.chooseDay = this.chooseDay.bind(this);
        this.changeWeekStartDate = this.changeWeekStartDate.bind(this);
        this.bookingAdded = this.bookingAdded.bind(this);
        
        let monday = DateService.getMonday(new Date());
        this.state = {
            weekStartDate: monday,
            chosenDate: null,
            weekWorkload: null,
            dayWorkload: []
        };

        this.getWeekWorkload(monday);
    }

    getWeekWorkload(weekStartDate) {
        BookingService.GetWeekWorkload(weekStartDate)
            .done(data => {
                data = data.map(x => {
                    return {
                        date: x.date,
                        title: DateService.getDayOfWeekLabel(x.date),
                        labels: DateService.convertHoursToLabels(x.freeHours)
                    }
                });
                this.setState({weekWorkload: data})
            });
    }
    
    previousWeek() {
        this.changeWeekStartDate(-7);
    }

    nextWeek() {
        this.changeWeekStartDate(7);
    }

    changeWeekStartDate(days) {
        let newWeekStartDate = DateService.addDaysToDate(this.state.weekStartDate, days);
        this.setState({weekStartDate: newWeekStartDate, weekWorkload: null});
        this.getWeekWorkload(newWeekStartDate);
    }

    getWeekLabel() {
        let weekEndDate = DateService.addDaysToDate(this.state.weekStartDate, 6);
        let weekLabel = `${DateService.toDateString(this.state.weekStartDate)} - ${DateService.toDateString(weekEndDate)}`;
        return weekLabel;
    }

    chooseDay(date) {
        this.setState({chosenDate: date});
    }

    bookingAdded() {
        this.message.show("Booking successfully added");
        this.setState({ chosenDate: null, weekWorkload: null });
        this.getWeekWorkload(this.state.weekStartDate);
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
                                    weekWorkload={this.state.weekWorkload}
                                    chooseDay={this.chooseDay}/>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {this.state.chosenDate && <TimeBooking date={this.state.chosenDate} bookingAdded={this.bookingAdded} />}
                    </Col>
                </Row>
                <Message ref={x => { this.message = x; }} />
            </div>
        );
    }
}

export default Booking;