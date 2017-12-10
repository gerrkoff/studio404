import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBookings from "../components/user/UserBookings";
import { loadBookings, cancelBooking } from "../actions/UserBookingsActions";
import { show } from "../actions/ConfirmDialogActions";

const mapStateToProps = (state) => {
    return {
        ...state.userBookings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookings: () => dispatch(loadBookings()),
        cancelBooking: (id) => dispatch(show(
            "Are you sure you want to cancel booking?",
            "Cancel booking",
            () => dispatch(cancelBooking(id))))
    }
}

const UserBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBookings);

export default UserBookingContainer