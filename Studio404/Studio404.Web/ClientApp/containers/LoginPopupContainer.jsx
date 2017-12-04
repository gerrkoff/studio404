import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, openLoginPopup, closeLoginPopup, register, toggleRegistration, updateLoginInfo } from "../actions/LoginPopupActions";
import LoginPopup from "../components/login/LoginPopup";

const mapStateToProps = (state) => {
  return {
    registration: state.loginPopup.registration,
    open: state.loginPopup.open,
    loginInfo: state.loginPopup.loginInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (registerInfo) => dispatch(register(registerInfo)),
    login: (loginInfo) => dispatch(login(loginInfo)),
    openPopup: () => dispatch(openLoginPopup()),
    closePopup: () => dispatch(closeLoginPopup()),
    toggleRegistration: (registration) => dispatch(toggleRegistration(registration)),
    updateLoginInfo: (fieldName, fieldValue) => dispatch(updateLoginInfo(fieldName, fieldValue))
  }
}

const LoginPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPopup)

export default LoginPopupContainer