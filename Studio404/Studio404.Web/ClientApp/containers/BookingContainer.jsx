import React, { Component } from 'react';
import { connect } from 'react-redux';
import Booking from "../components/booking/Booking";
import { changeWeekStartDate, loadWeekWorkload, chooseDay, loadDayHours, updateHours, saveBooking } from "../actions/BookingActions";

const mapStateToProps = (state) => {
    return {
        ...state.booking,
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