import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmPhonePopup from "../components/phone/ConfirmPhonePopup";
import { openConfirmPhonePopup, closeConfirmPhonePopup, sendPhoneConfirmation, confirmPhone, updatePhone, updateCode } from "../actions/ConfirmPhonePopupActions";

const mapStateToProps = (state) => {
    return {
        ...state.phoneConfirmPopup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {        
        openPopup: () => dispatch(openConfirmPhonePopup()),
        closePopup: () => dispatch(closeConfirmPhonePopup()),
        updatePhone: (phone) => dispatch(updatePhone(phone)),
        updateCode: (code) => dispatch(updateCode(code)),
        sendPhoneConfirmation: (phone) => dispatch(sendPhoneConfirmation(phone)),
        confirmPhone: (phone, code) => dispatch(confirmPhone(phone, code))
    }
}

const ConfirmPhonePopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmPhonePopup);

export default ConfirmPhonePopupContainer