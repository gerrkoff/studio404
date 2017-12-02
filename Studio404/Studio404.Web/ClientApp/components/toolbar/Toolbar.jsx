import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {withRouter} from "react-router-dom";
import ToolbarLoginInfo from "./ToolbarLoginInfo";

class Toolbar extends Component {

    constructor(props) {
        super(props);
        this.moveToHome = this.moveToHome.bind(this);
        this.moveToBooking = this.moveToBooking.bind(this);
    }
    
    moveToHome() {
        this.props.history.push("/");
    }

    moveToBooking() {
        this.props.history.push("/booking");
    }

    render() {
        return (
            <div>
                <MuiToolbar>
                    <ToolbarGroup>
                        <ToolbarTitle
                            text="404 studio"
                            style={{cursor: "pointer"}}
                            onClick={this.moveToHome} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label="Booking" primary={true} onClick={this.moveToBooking} />
                        <ToolbarSeparator />
                        <div style={{width: "30px"}}/>
                        <ToolbarLoginInfo />
                    </ToolbarGroup>
                </MuiToolbar>
            </div>
        );
    }
}

export default withRouter(Toolbar);