import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import WeekWorkload from "./WeekWorkload";
import Loader from "../root/Loader";

class BookingDayChooser extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <FlatButton label="Previous" onClick={this.props.previousWeek} />
                        <span>{this.props.weekLabel}</span>
                        <FlatButton label="Next" onClick={this.props.nextWeek} />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {this.props.weekWorkload
                            ? <WeekWorkload workload={this.props.weekWorkload} chooseDay={this.props.chooseDay} />
                            : <Loader />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BookingDayChooser;