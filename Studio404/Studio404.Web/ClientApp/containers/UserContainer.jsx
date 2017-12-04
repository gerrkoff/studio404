import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from "../components/user/User";

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.account.userLoggedIn
    }
}

const UserContainer = connect(
    mapStateToProps
)(User);

export default UserContainer