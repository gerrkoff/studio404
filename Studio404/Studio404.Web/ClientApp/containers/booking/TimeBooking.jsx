import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import BookingService from "../../modules/BookingService";
import DateService from "../../modules/DateService";
import HourSelector from "../../components/booking/HourSelector";
import Loader from "../../components/root/Loader";

class TimeBooking extends Component {
    constructor(props) {
        super(props);
        this.updateHours = this.updateHours.bind(this);
        this.sendBooking = this.sendBooking.bind(this);
        this.getDayHours = this.getDayHours.bind(this);
        
        this.hours = [];
        this.state = {dayHours: null};
        this.getDayHours(this.props.date);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.date !== this.props.date) {
            this.setState({dayHours: null});
            this.getDayHours(nextProps.date);
        }
    }

    updateHours(hours) {
        this.hours = hours;
    }

    sendBooking() {
        let hours = this.hours.sort();
        BookingService.MakeBooking(this.props.date, hours[0], hours[hours.length-1])
            .done(() => {
                this.props.bookingAdded();                
            });
    }

    getDayHours(date) {
        BookingService.GetDayWorkload(date)
            .done(data => {
                let dayHours = data.map(x => {
                    return {
                        value: x.hour,
                        title: DateService.convertHourToLabel(x.hour),
                        disabled: !x.available
                    };
                });
                this.setState({dayHours: dayHours});
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <h5>{this.props.date.toDateString()}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <HourSelector dayHours={this.state.dayHours} updateHours={this.updateHours} date={this.props.date}/>
                        {!this.state.dayHours && <Loader/>}
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <RaisedButton label="Book" primary={true} onClick={this.sendBooking} />
                    </Col>
                </Row>
                
            </div>
        );
    }
}

TimeBooking.propTypes = {
    date: PropTypes.instanceOf(Date),
};

export default TimeBooking;