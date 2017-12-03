import 'bootstrap/dist/css/bootstrap.css';
import "./modules/Polyfill";
import ReactDOM from "react-dom";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AppMaterial from "./containers/root/AppMaterial";
import Home from "./containers/home/Home";
import Booking from "./containers/booking/Booking";
import NotFound from "./containers/root/NotFound";
import User from "./containers/user/User";

ReactDOM.render(
    <Router>
        <AppMaterial>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/booking" component={Booking} />
                <Route path="/my" component={User} />
                <Route path="*" component={NotFound} />
            </Switch>
        </AppMaterial>
    </Router>,
    document.getElementById("app")
);