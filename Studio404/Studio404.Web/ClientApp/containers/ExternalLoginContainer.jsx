import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExternalLogin from "../components/externalLogin/ExternalLogin";
import { externalLoginProcess, updateUsername, externalLoginRegister } from "../actions/ExternalLoginActions";

const mapStateToProps = (state) => {
    return {
        ...state.externalLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        externalLoginProcess: (history, returnUrl) => dispatch(externalLoginProcess(history, returnUrl)),
        externalLoginRegister: (username, history, returnUrl) => dispatch(externalLoginRegister(username, history, returnUrl)),
        updateUsername: (username) => dispatch(updateUsername(username))
    }
}

const ExternalLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExternalLogin);

export default ExternalLoginContainer