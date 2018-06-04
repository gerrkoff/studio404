import React from 'react'
import PopoverUi from 'material-ui/Popover'

export default class Popover extends React.Component {
    render () {
        return (
            <PopoverUi
                open={this.props.open}
                anchorEl={this.props.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.props.handleRequestClose}
            >
                {this.props.children}
            </PopoverUi>
        )
    }
}
