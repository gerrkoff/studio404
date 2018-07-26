import { connect } from 'react-redux'
import Booking from '../components/booking/Booking'
import { changeWeekStartDate, loadWeekWorkload, chooseDay, loadDayHours, updateHours, saveBooking, toggleHelp, inputPromoCode, loadHoursCost } from '../actions/BookingActions'

const mapStateToProps = (state) => {
    return {
        ...state.booking,
        userLoggedIn: state.account.userLoggedIn,
        phoneConfirmed: state.account.phoneConfirmed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeWeekStartDate: (date) => dispatch(changeWeekStartDate(date)),
        loadWeekWorkload: (date) => dispatch(loadWeekWorkload(date)),
        chooseDay: (date) => dispatch(chooseDay(date)),
        loadDayHours: (date) => dispatch(loadDayHours(date)),
        updateHours: (date, hours, promoCode) => dispatch(updateHours(date, hours, promoCode)),
        saveBooking: (date, hours, promoCode, weekStartDate) => dispatch(saveBooking(date, hours, promoCode, weekStartDate)),
        toggleHelp: (showHelp) => dispatch(toggleHelp(showHelp)),
        inputPromoCode: (promoCode) => dispatch(inputPromoCode(promoCode)),
        loadHoursCost: (date, hours, promoCode) => dispatch(loadHoursCost(date, hours, promoCode))
    }
}

const BookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Booking)

export default BookingContainer
