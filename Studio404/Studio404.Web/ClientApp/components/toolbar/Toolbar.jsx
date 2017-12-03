import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {withRouter} from "react-router-dom";
//import ToolbarLoginInfo from "./ToolbarLoginInfo";
import ToolbarLoginInfoContainer from "../../containers/ToolbarLoginInfoContainer";

class Toolbar extends Component {

    constructor(props) {
        super(props);
        this.goTo = this.goTo.bind(this);
    }
    
    goTo(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <MuiToolbar>
                    <ToolbarGroup>
                        <ToolbarTitle
                            text="404 studio"
                            style={{cursor: "pointer"}}
                            onClick={() => this.moveToHome("/")} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label="Booking" primary={true} onClick={() => this.moveToHome("/booking")} />
                        <ToolbarSeparator />
                        <div style={{width: "30px"}}/>
                        <ToolbarLoginInfoContainer />
                    </ToolbarGroup>
                </MuiToolbar>
            </div>
        );
    }
}

export default withRouter(Toolbar);