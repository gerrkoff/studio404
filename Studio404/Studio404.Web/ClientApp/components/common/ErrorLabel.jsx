import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ErrorLabel extends Component {
    render() {
        return (
            <h6 
                style={{
                    textAlign: "center",
                    color: this.props.muiTheme.palette.disabledColor,
                    fontSize: "12px",
                    fontWeight: "bold"
                }}
            >
                {this.props.text}
            </h6>
        );
    }
}

export default muiThemeable()(ErrorLabel)