import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import css from '../../styles/errorLabel.css'

class ErrorLabel extends Component {
    render () {
        return (
            <h6 className={css.error}
                style={{
                    textAlign: this.props.align ? this.props.align : 'center',
                    color: this.props.muiTheme.palette.disabledColor
                }}>
                {this.props.text}
            </h6>
        )
    }
}

export default muiThemeable()(ErrorLabel)
