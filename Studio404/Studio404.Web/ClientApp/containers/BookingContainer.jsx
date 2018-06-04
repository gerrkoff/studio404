import React, { Component } from 'react'
import { connect } from 'react-redux'
import Booking from '../components/booking/Booking'
import { changeWeekStartDate, loadWeekWorkload, chooseDay, loadDayHours, updateHours, saveBooking, toggleHelp } from '../actions/BookingActions'

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
        updateHours: (date, hours) => dispatch(updateHours(date, hours)),
        saveBooking: (date, hours, weekStartDate) => dispatch(saveBooking(date, hours, weekStartDate)),
        toggleHelp: (showHelp) => dispatch(toggleHelp(showHelp))
    }
}

const BookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Booking)

export default BookingContainer
