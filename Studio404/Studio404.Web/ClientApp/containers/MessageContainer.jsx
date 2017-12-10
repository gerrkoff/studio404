import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from "../components/common/Message";
import { hide } from "../actions/MessageActions";

const mapStateToProps = (state) => {
    return {
        ...state.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => dispatch(hide())
    }
}

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);

export default MessageContainer