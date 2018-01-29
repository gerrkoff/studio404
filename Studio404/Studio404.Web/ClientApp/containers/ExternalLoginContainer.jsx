import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExternalLogin from "../components/externalLogin/ExternalLogin";
import { externalLoginProcess, updateUsername } from "../actions/ExternalLoginActions";

const mapStateToProps = (state) => {
    return {
        ...state.externalLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        externalLoginProcess: () => dispatch(externalLoginProcess()),
        updateUsername: (username) => dispatch(updateUsername(username))
    }
}

const ExternalLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExternalLogin);

export default ExternalLoginContainer