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
        externalLoginProcess: (history) => dispatch(externalLoginProcess(history)),
        externalLoginRegister: (username, history) => dispatch(externalLoginRegister(username, history)),
        updateUsername: (username) => dispatch(updateUsername(username))
    }
}

const ExternalLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExternalLogin);

export default ExternalLoginContainer