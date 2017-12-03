import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCurrentUser, logoff } from "../actions/AccountActions";
import ToolbarLoginInfo from "../components/toolbar/ToolbarLoginInfo";

const mapStateToProps = (state) => {
  return {
    username: state.account.username,
    userLoggedIn: state.account.userLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentUser: () => dispatch(loadCurrentUser()),
    logoff: () => dispatch(logoff())
  }
}

const ToolbarLoginInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarLoginInfo)

export default ToolbarLoginInfoContainer