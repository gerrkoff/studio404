import { connect } from 'react-redux'
import UserBookings from '../components/user/UserBookings'
import { loadBookings, cancelBooking, resendBookingCode, payBooking } from '../actions/UserBookingsActions'
import { show } from '../actions/ConfirmDialogActions'
import Labels from '../modules/Labels'

const mapStateToProps = (state) => {
    return {
        ...state.userBookings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookings: () => dispatch(loadBookings()),
        cancelBooking: (id) => dispatch(show(
            Labels.userBookings_cancelQuestion,
            Labels.userBookings_cancel,
            () => dispatch(cancelBooking(id)))),
        resendBookingCode: (id) => dispatch(show(
            Labels.userBookings_resendQuestion,
            Labels.userBookings_resend,
            () => dispatch(resendBookingCode(id)))),
        payBooking: (id) => dispatch(show(
            Labels.userBookings_payBooking,
            Labels.userBookings_pay,
            () => dispatch(payBooking(id))))
    }
}

const UserBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBookings)

export default UserBookingContainer
