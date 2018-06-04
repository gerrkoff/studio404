import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Labels from '../../modules/Labels'

class ConfirmDialog extends Component {
    render () {
        const actions = [
            <FlatButton
                label={Labels.cancel}
                primary={true}
                key='cancel'
                onClick={this.props.hide}
            />,
            <FlatButton
                label={this.props.actionText}
                primary={true}
                key='confirm'
                onClick={() => {
                    this.props.action()
                    this.props.hide()
                }}
            />
        ]

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.hide} >

                {this.props.text}
            </Dialog>
        )
    }
}

export default ConfirmDialog
