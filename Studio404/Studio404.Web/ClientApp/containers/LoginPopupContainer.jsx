import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, openLoginPopup, closeLoginPopup, register } from "../actions/AccountActions";
import LoginPopup from "../components/login/LoginPopup";

const mapStateToProps = (state) => {
  return {
    //username: state.account.username,
    open: state.account.loginPopup.open
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