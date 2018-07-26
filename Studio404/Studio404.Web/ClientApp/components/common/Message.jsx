import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

class Message extends Component {
    render () {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.text}
                autoHideDuration={4000}
                onRequestClose={this.props.hide}
                action={this.props.actionText}
                onActionClick={this.props.actionClick} />
        )
    }
}

export default Message
