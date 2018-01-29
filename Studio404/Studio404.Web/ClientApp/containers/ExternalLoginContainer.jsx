import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExternalLogin from "../components/externalLogin/ExternalLogin";

const mapStateToProps = (state) => {
    return {
        ...state.externalLogin
    }
}

const ExternalLoginContainer = connect(
    mapStateToProps
)(ExternalLogin);

export default ExternalLoginContainer