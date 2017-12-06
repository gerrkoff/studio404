import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBookings from "../components/user/UserBookings";
import { loadBookings, rejectBooking } from "../actions/UserBookingsActions";
import { show } from "../actions/ConfirmDialogActions";

const mapStateToProps = (state) => {
    return {
        bookings: state.userBookings.bookings,
        isLoading: state.userBookings.isLoading,
        error: state.userBookings.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookings: () => dispatch(loadBookings()),
        rejectBooking: (id) => dispatch(show(
            "Are you sure you want to reject booking?",
            "Reject booking",
            () => dispatch(rejectBooking(id))))
    }
}

const UserBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBookings);

export default UserBookingContainer