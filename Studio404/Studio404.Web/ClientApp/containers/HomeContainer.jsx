import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/home/Home';
import { loadInfo } from '../actions/InfoActions';

const mapStateToProps = (state) => {
    return {
        info: {...state.info}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadInfo: () => dispatch(loadInfo())
    }
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer