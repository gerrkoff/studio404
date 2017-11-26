import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from "./App";
import { muiTheme } from "../../modules/MaterialTheme";

class AppMaterial extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <App children={this.props.children}/>
            </MuiThemeProvider>
        );
    }
}

export default AppMaterial;