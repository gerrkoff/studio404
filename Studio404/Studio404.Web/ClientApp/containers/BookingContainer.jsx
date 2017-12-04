import React, { Component } from 'react';
import { connect } from 'react-redux';
import Booking from "../components/booking/Booking";
import { changeWeekStartDate, loadWeekWorkload, chooseDay, loadDayHours, updateHours, saveBooking } from "../actions/BookingActions";

const mapStateToProps = (state) => {
    return {
        weekStartDate: state.booking.weekStartDate,
        weekWorkloadIsLoading: state.booking.weekWorkloadIsLoading,
        weekWorkload: state.booking.weekWorkload,
        weekWorkloadError: state.booking.weekWorkloadError,
        chosenDate: state.booking.chosenDate,
        dayHoursIsLoading: state.booking.dayHoursIsLoading,
        dayHours: state.booking.dayHours,
        dayHoursError: state.booking.dayHoursError,
        bookingHours: state.booking.bookingHours,
        bookingHoursError: state.booking.bookingHoursError,
        bookingIsValid: state.booking.bookingIsValid,
        userLoggedIn: state.account.userLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeWeekStartDate: (date) => dispatch(changeWeekStartDate(date)),
        loadWeekWorkload: (date) => dispatch(loadWeekWorkload(date)),
        chooseDay: (date) => dispatch(chooseDay(date)),
        loadDayHours: (date) => dispatch(loadDayHours(date)),
        updateHours: (hours) => dispatch(updateHours(hours)),
        saveBooking: (date, hours, weekStartDate) => dispatch(saveBooking(date, hours, weekStartDate))
    }
}

const BookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Booking);

export default BookingContainer