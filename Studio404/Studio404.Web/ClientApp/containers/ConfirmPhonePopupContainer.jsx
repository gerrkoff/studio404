import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmPhonePopup from "../components/phone/ConfirmPhonePopup";
import { openConfirmPhonePopup, closeConfirmPhonePopup, sendPhoneConfirmation, confirmPhone } from "../actions/ConfirmPhonePopupActions";

const mapStateToProps = (state) => {
    return {
        ...state.phoneConfirmPopup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {        
        openPopup: () => dispatch(openConfirmPhonePopup()),
        closePopup: () => dispatch(closeConfirmPhonePopup()),
        sendPhoneConfirmation: (phone) => dispatch(sendPhoneConfirmation(phone)),
        confirmPhone: (phone, code) => dispatch(confirmPhone(phone, code))
    }
}

const ConfirmPhonePopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmPhonePopup);

export default ConfirmPhonePopupContainer