import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DateService from '../../modules/DateService'
import HourSelector from '../../components/booking/HourSelector'
import Loader from '../../components/common/Loader'
import ErrorLabel from '../common/ErrorLabel'
import Labels from '../../modules/Labels'
import ConfirmPhonePopupContainer from '../../containers/ConfirmPhonePopupContainer'
import LoginPopupContainer from '../../containers/LoginPopupContainer'
import css from '../../styles/booking.css'
import { muiTheme } from '../../modules/MaterialTheme'
import ConstIntervalsPopover from './ConstIntervalsPopover'

class TimeBooking extends Component {
    constructor (props) {
        super(props)
        this.props.loadDayHours(this.props.chosenDate)
    }

    render () {
        return (
            <div className={ css.timeForm }>
                <Row>
                    <Col md="6">
                        <div className={css.timeFormElement}>
                            <h5 className={css.timeFormDateLabel}
                                style={{color: muiTheme.palette.primary2Color}}>

                                {DateService.toDateString(this.props.chosenDate)}
                            </h5>
                        </div>
                        <div className={css.hourSelectBlock}>
                            <div>
                                <HourSelector
                                    dayHours={this.props.dayHours}
                                    hours={this.props.bookingHours}
                                    error={this.props.bookingHoursError}
                                    disabled={this.props.dayHoursIsLoading || this.props.dayHoursError}
                                    updateHours={this.props.updateHours}
                                />
                            </div>
                            {this.props.dayHoursError && <ErrorLabel align="left" text={Labels.errorLoadCommon} />}
                        </div>
                    </Col>
                    <Col md="6">
                        <div className={css.timeFormElement}>
                            {this.renderInfo()}
                        </div>
                        <div className={css.timeFormSubmitContainer}>
                            <RaisedButton
                                label={Labels.booking_book}
                                primary={true}
                                onClick={() => this.props.saveBooking(this.props.chosenDate, this.props.bookingHours, this.props.promoCode)}
                                disabled={!this.props.bookingIsValid || !this.props.userLoggedIn || !this.props.phoneConfirmed} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    renderInfo () {
        if (!this.props.userLoggedIn) {
            return (
                <div>
                    <p className={css.timeFormInfo}>{Labels.booking_userNotLoggedIn}</p>
                    <LoginPopupContainer />
                </div>
            )
        }

        if (!this.props.phoneConfirmed) {
            return (
                <div>
                    <p className={css.timeFormInfo}>{Labels.booking_phoneNotConfirmed}</p>
                    <ConfirmPhonePopupContainer />
                </div>
            )
        }

        if (this.props.bookingHours.length === 0) {
            return <p className={css.timeFormInfo}>{Labels.booking_defaultInfo}</p>
        }

        if (!this.props.bookingIsValid) {
            return <p className={css.timeFormInfo}>{Labels.booking_hoursInvalid}</p>
        }

        return (
            <div>
                <p className={css.timeFormInfo}>{Labels.booking_choiceInfo(this.props.bookingHours[0], this.props.bookingHours[this.props.bookingHours.length - 1])}</p>
                {this.renderCostInfo()}
                <div>
                    <TextField
                        hintText="Enter promo code"
                        value={this.props.promoCode}
                        onChange={e => this.props.inputPromoCode(e.target.value)}
                    />
                </div>
            </div>
        )
    }

    renderCostInfo () {
        let cost = <span />

        if (this.props.hoursCostIsLoading) {
            cost = (
                <div className={css.hoursCostLoader}>
                    <Loader />
                </div>
            )
        }
        else if (!this.props.hoursCostError) {
            cost = (
                <span>
                    <span>{this.props.hoursCost}</span>
                    {this.props.hoursCostIntervals && this.props.hoursCostIntervals.length > 1 &&
                        <ConstIntervalsPopover className={css.costHelp} intervals={this.props.hoursCostIntervals} />
                    }
                </span>
            )
        }

        return (
            <div>
                <span>{Labels.booking_hoursCost}: </span>
                {cost}
            </div>
        )
    }
}

export default TimeBooking
