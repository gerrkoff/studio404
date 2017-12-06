import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmDialog from "../components/common/ConfirmDialog";
import { hide } from "../actions/ConfirmDialogActions";

const mapStateToProps = (state) => {
    return {
        open: state.confirmDialog.open,
        text: state.confirmDialog.text,
        actionText: state.confirmDialog.actionText,
        action: state.confirmDialog.action
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => dispatch(hide())
    }
}

const ConfirmDialogContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDialog);

export default ConfirmDialogContainer