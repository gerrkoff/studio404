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
        externalLoginProcess: () => dispatch(externalLoginProcess()),
        externalLoginRegister: (username) => dispatch(externalLoginRegister(username)),
        updateUsername: (username) => dispatch(updateUsername(username))
    }
}

const ExternalLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExternalLogin);

export default ExternalLoginContainer