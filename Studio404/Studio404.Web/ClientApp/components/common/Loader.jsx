import React, { Component } from 'react';
import { muiTheme } from '../../modules/MaterialTheme';

console.log(muiTheme);

class Loader extends Component {
    render() {
        const style = {
            fontSize: this.props.size ? this.props.size + "px" : "15px",
            color: muiTheme.palette.primary1Color
        }
        return (
            <i
                style={style}
                className="fa fa-circle-o-notch fa-spin">
            </i>
        );
    }
}

export default Loader;