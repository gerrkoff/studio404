import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FaIconButton from "../common/FaIconButton";
import WeekWorkload from "./WeekWorkload";
import Loader from "../common/Loader";

class BookingDayChooser extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <div style={{textAlign: "center"}}>
                            <FaIconButton icon="arrow-left" size="sm" onClick={this.props.previousWeek} style={{padding: 10}} alt={true}/>
                            <span style={{padding: 10}}>{this.props.weekLabel}</span>
                            <FaIconButton icon="arrow-right" size="sm" onClick={this.props.nextWeek} style={{padding: 10}} alt={true}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div style={{textAlign: "center"}}>
                            {this.props.weekWorkload
                                ? <WeekWorkload workload={this.props.weekWorkload} chooseDay={this.props.chooseDay} />
                                : <Loader />
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BookingDayChooser;