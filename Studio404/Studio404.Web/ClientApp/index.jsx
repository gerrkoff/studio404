import 'bootstrap/dist/css/bootstrap.css';
import "./modules/Polyfill";

import ReactDOM from "react-dom";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppMaterial from "./components/root/AppMaterial";
import NotFound from "./components/root/NotFound";
import Home from "./components/home/Home";
import Booking from "./components/booking/Booking";
import User from "./containers/UserContainer";
import rootReducer from './reducers'

let store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <AppMaterial>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/booking" component={Booking} />
                    <Route path="/my" component={User} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </AppMaterial>
        </Router>
    </Provider>,
    document.getElementById("app")
);