import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, openLoginPopup, closeLoginPopup, register } from "../actions/LoginPopupActions";
import LoginPopup from "../components/login/LoginPopup";

const mapStateToProps = (state) => {
  return {
    open: state.loginPopup.open
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (registerInfo) => dispatch(register(registerInfo)),
    login: (loginInfo) => dispatch(login(loginInfo)),
    openPopup: () => dispatch(openLoginPopup()),
    closePopup: () => dispatch(closeLoginPopup())
  }
}

const LoginPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPopup)

export default LoginPopupContainer