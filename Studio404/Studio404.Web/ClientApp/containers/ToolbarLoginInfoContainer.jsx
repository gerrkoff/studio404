import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test } from "../actions/login";
import ToolbarLoginInfo from "../components/toolbar/ToolbarLoginInfo";

const mapStateToProps = (state) => {
    return {
      msg: state.test
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      test: () => {
        dispatch(test("123"));
      }
    }
  }
  
  const ToolbarLoginInfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ToolbarLoginInfo)
  
  export default ToolbarLoginInfoContainer