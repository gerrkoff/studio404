import React, { Component } from 'react';
import { Row } from 'reactstrap';
import BookingService from "../../modules/BookingService";
import DateService from "../../modules/DateService";
import TimeBooking from "./TimeBooking";
import BookingDayChooser from "../../components/booking/BookingDayChooser";

class Booking extends Component {

    constructor(props) {
        super(props);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.getWeekWorkload = this.getWeekWorkload.bind(this);
        this.chooseDay = this.chooseDay.bind(this);
        this.changeWeekStartDate = this.changeWeekStartDate.bind(this);
        
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
        BookingService.GetDayWorkload(date)
            .done(data => 
                this.setState({
                    chosenDate: date,
                    dayWorkload: data
                }));
    }

    render() {
        return (
            <div>
                <Row>
                    <BookingDayChooser
                                previousWeek={this.previousWeek}
                                nextWeek={this.nextWeek}
                                weekLabel={this.getWeekLabel()}
                                weekWorkload={this.state.weekWorkload}
                                chooseDay={this.chooseDay}/>
                </Row>
                <Row>
                    {this.state.chosenDate && <TimeBooking date={this.state.chosenDate} dayWorkload={this.state.dayWorkload}/>}
                </Row>
            </div>
        );
    }
}

export default Booking;