import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from "react-dom";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AppMaterial from "./containers/root/AppMaterial";
import Home from "./containers/home/Home";
import Booking from "./containers/booking/Booking";
import NotFound from "./containers/root/NotFound";

ReactDOM.render(
    <Router>
        <AppMaterial>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/booking" component={Booking} />
                <Route path="*" component={NotFound} />
            </Switch>
        </AppMaterial>
    </Router>,
    document.getElementById("app")
);