import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolbarLoginInfo from "../components/toolbar/ToolbarLoginInfo";
import { loadCurrentUser, logoff } from "../actions/AccountActions";

const mapStateToProps = (state) => {
    return {
        ...state.account
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
)(ToolbarLoginInfo);

export default ToolbarLoginInfoContainer