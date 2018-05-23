import React, { Component } from 'react';

class Loader extends Component {
    render() {
        const style = {
            fontSize: this.props.size ? this.props.size + "px" : "15px"
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