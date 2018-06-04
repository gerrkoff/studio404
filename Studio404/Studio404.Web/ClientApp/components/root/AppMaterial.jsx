import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'
import { muiTheme } from '../../modules/MaterialTheme'

class AppMaterial extends Component {
    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <App>
                    {this.props.children}
                </App>
            </MuiThemeProvider>
        )
    }
}

export default AppMaterial
