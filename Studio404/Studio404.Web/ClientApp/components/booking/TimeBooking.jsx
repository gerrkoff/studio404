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
        /*
        this.updateHours = this.updateHours.bind(this);
        this.sendBooking = this.sendBooking.bind(this);
        this.getDayHours = this.getDayHours.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        */
        /*
        this.state = {
            dayHours: null,
            valid: true,
            hours: []
        };
        */

        this.props.loadDayHours(this.props.date);        
    }
    /*
    componentWillReceiveProps(nextProps) {
        if(nextProps.date !== this.props.date) {
            this.setState({dayHours: null});
            this.getDayHours(nextProps.date);
        }
    }
    */

    updateHours(hours, valid) {
        this.props.updateHours(hours);
    }
    /*
    sendBooking() {
        let hours = this.state.hours.sortNumbers();
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
    */

    render() {
        return (
            <div style={{width: "800px", textAlign: "left"}}>
                <Row>
                    <Col md="6">
                        <div style={styles.formElement}>
                            <h5>{DateService.toDateString(this.props.date)}</h5>
                        </div>
                        <div style={{padding: 20, paddingTop: 0, verticalAlign: "center", position: "relative"}}>
                            <div style={{display: "inline-block"}}>
                                <HourSelector
                                    dayHours={this.props.bookingInfo.dayHours}
                                    updateHours={this.updateHours}
                                    date={this.props.date}
                                    hours={this.props.bookingInfo.hours}
                                />
                            </div>
                            <div style={{display: "inline-block", position: "relative", padding: 10, top: "-10px"}}>
                                {this.props.bookingInfo.dayHoursIsLoading === true && <Loader />}
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
                                onClick={this.sendBooking}
                                disabled={!this.props.bookingInfo.isValid} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    renderInfo() {
        if (this.props.bookingInfo.hours.length === 0)
            return <p>Some default info!</p>;
        if (this.props.bookingInfo.isValid === true)
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

TimeBooking.propTypes = {
    date: PropTypes.instanceOf(Date),
};

export default TimeBooking;