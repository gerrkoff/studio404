import React, { Component } from 'react'
import FontIcon from 'material-ui/FontIcon'
import { grey900, grey200 } from 'material-ui/styles/colors'
import { muiTheme } from '../../modules/MaterialTheme'
import { fade } from 'material-ui/utils/colorManipulator'
/*
const mainColor = grey900
const hoverColor = grey600
const mainColorAlt = grey500
const hoverColorAlt = grey600
*/
const disabledColor = grey200

class FaIconButton extends Component {
    constructor (props) {
        super(props)

        this.colors = this.generateColor(this.props)
        this.styles = {
            cursor: 'pointer',
            fontSize: '17px'
        }

        this.additionalClass = this.props.className ? ' ' + this.props.className : ''
    }

    generateColor (props) {
        let colors = {
            main: disabledColor,
            hover: disabledColor
        }

        if (props.disabled) {
            return colors
        }

        let color = !props.color || props.color === ''
            ? 'clr_primary'
            : props.color

        switch (color) {
            case 'clr_primary':
                colors.main = muiTheme.palette.primary1Color
                break
            case 'clr_secondary':
                colors.main = muiTheme.palette.accent1Color
                break
            case 'clr_black':
                colors.main = grey900
                break
            default:
                colors.main = color
        }

        colors.hover = fade(colors.main, 0.6)

        return colors
    }

    render () {
        return (
            <FontIcon
                className={'fa fa-' + this.props.icon + this.additionalClass}
                style={this.styles}
                onClick={this.props.disabled ? null : this.props.onClick}
                color={this.colors.main}
                hoverColor={this.colors.hover} />
        )
    }
}

export default FaIconButton
