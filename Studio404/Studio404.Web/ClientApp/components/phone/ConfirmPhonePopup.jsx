import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class ConfirmPhonePopup extends Component {

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closePopup}
            />
        ];

        return (
            <div>
                <RaisedButton label="Confirm phone" primary={true} onClick={this.props.openPopup} />
                <Dialog
                    title="Phone"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closePopup}
                    contentStyle={{ width: '100%', maxWidth: '600px' }}
                    autoScrollBodyContent={true}>

                    <h4>Hello World!</h4>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmPhonePopup;