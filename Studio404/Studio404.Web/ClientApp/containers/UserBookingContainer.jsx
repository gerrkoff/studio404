import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBookings from "../components/user/UserBookings";
import { loadBookings } from "../actions/UserBookingsActions";

const mapStateToProps = (state) => {
    return {
        bookings: state.userBookings.bookings,
        isLoading: state.userBookings.isLoading,
        error: state.userBookings.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookings: () => dispatch(loadBookings())
    }
}

const UserBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBookings);

export default UserBookingContainer