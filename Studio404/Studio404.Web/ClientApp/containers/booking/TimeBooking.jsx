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
        let hours = this.hours;//.sort();
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
            <div style={{width: "700px", textAlign: "left"}}>
                <Row>
                    <Col md="6">
                        <div style={styles.formElement}>
                            <h5>{DateService.toDateString(this.props.date)}</h5>    
                        </div>
                        <div style={{padding: 20, paddingTop: 0}}>
                            <HourSelector dayHours={this.state.dayHours} updateHours={this.updateHours} date={this.props.date}/>
                            {!this.state.dayHours && <Loader/>}
                        </div>
                    </Col>
                    <Col md="6">
                        <div style={styles.formElement}>
                            <p>Lorem</p>
                        </div>
                        <div style={{padding: 20, textAlign: "right"}}>
                            <RaisedButton label="Book" primary={true} onClick={this.sendBooking} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
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