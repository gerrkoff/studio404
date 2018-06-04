import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExternalLogin from '../components/externalLogin/ExternalLogin'
import { externalLoginProcess } from '../actions/ExternalLoginActions'

const mapStateToProps = (state) => {
    return {
        ...state.externalLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        externalLoginProcess: (history, returnUrl) => dispatch(externalLoginProcess(history, returnUrl))
    }
}

const ExternalLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExternalLogin)

export default ExternalLoginContainer
