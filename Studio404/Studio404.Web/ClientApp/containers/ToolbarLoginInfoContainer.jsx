import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCurrentUser } from "../actions/login";
import ToolbarLoginInfo from "../components/toolbar/ToolbarLoginInfo";

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    userLoggedIn: state.login.userLoggedIn
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentUser: () => dispatch(loadCurrentUser())
  }
}
  
const ToolbarLoginInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarLoginInfo)
  
export default ToolbarLoginInfoContainer