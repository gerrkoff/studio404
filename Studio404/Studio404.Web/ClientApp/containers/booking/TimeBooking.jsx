import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import BookingService from "../../modules/BookingService";
import DateService from "../../modules/DateService";
import HourSelector from "../../components/booking/HourSelector";
import Message from "../../components/root/Message";

class TimeBooking extends Component {
    constructor(props) {
        super(props);
        this.updateHours = this.updateHours.bind(this);
        this.sendBooking = this.sendBooking.bind(this);
        this.getDayHours = this.getDayHours.bind(this);
        
        this.bookingInfo = {date: this.props.date, userId: 0};
        this.state = {
            showMessage: false,
            messageText: ""
        };
    }

    updateHours(hours) {
        this.bookingInfo.hours = hours;
    }

    sendBooking() {
        BookingService.MakeBooking(this.bookingInfo.date, this.bookingInfo.hours, this.bookingInfo.userId)
            .done(() => {
                this.setState({
                    showMessage: true,
                    messageText: "Booking successfully made"
                })
            });
    }

    getDayHours() {
        return this.props.dayWorkload.map(x => {
            return {
                value: x.hour,
                title: DateService.convertHourToLabel(x.hour),
                disabled: !x.available
            };
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
                        <HourSelector dayHours={this.getDayHours()} updateHours={this.updateHours} date={this.props.date}/>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <RaisedButton label="Book" primary={true} onClick={this.sendBooking} />
                    </Col>
                </Row>
                <Message
                    open={this.state.showMessage}
                    text={this.state.messageText} />
            </div>
        );
    }
}

TimeBooking.propTypes = {
    date: PropTypes.instanceOf(Date),
};

export default TimeBooking;