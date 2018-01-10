import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import FaIconButton from "../common/FaIconButton";
import WeekWorkload from "./WeekWorkload";
import LoaderContent from "../common/LoaderContent";
import ErrorLabel from "../common/ErrorLabel";
import BookingHelp from "./BookingHelp";
import Labels from "../../modules/Labels";
import css from "../../styles/booking.css";

class BookingDayChooser extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <BookingHelp 
                            showHelp={this.props.showHelp}
                            toggleHelp={this.props.toggleHelp} />
                    </Col>
                </Row>
                {this.props.showHelp && <br/>}
                <Row>
                    <Col md="12">
                        <div className={ css.center }>
                            <FaIconButton icon="arrow-left" size="sm" onClick={this.props.previousWeek} className={ css.weekChooseButton } alt={true}/>
                            <span className={ css.weekLabel }>
                                {this.props.weekLabel}
                            </span>
                            <FaIconButton icon="arrow-right" size="sm" onClick={this.props.nextWeek} className={ css.weekChooseButton } alt={true}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div className={css.center}>
                            {this.props.weekWorkloadIsLoading === true
                                ? <LoaderContent />                                
                                : this.props.weekWorkloadError === true
                                    ? <ErrorLabel text={Labels.errorLoadCommon} />
                                    : <WeekWorkload workload={this.props.weekWorkload} chooseDay={this.props.chooseDay} />
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BookingDayChooser;