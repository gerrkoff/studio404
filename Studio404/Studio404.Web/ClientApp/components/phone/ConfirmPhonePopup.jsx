import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Loader from "../../components/common/Loader";
import ErrorLabel from "../common/ErrorLabel";

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

                    <Row>
                        <Col md="6">
                            <TextField
                                hintText="Enter phone"
                                floatingLabelText="Phone"
                                value={this.props.phone}
                                onChange={(e) => this.props.updatePhone(e.target.value)} />
                        </Col>
                        <Col md="6">
                            <div style={{ display: "table", height: "100%" }}>
                                <div style={{ display: "table-cell", verticalAlign: "middle", paddingTop: "23px" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <RaisedButton
                                            label="Send"
                                            secondary={true}
                                            onClick={() => this.props.sendPhoneConfirmation(this.props.phone)} />
                                    </div>                                    
                                    <div style={{ display: "inline-block", padding: 10 }}>
                                        {this.props.codeIsSending === true && <Loader />}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <TextField
                                hintText="Enter code"
                                floatingLabelText="Code"
                                value={this.props.code}
                                onChange={(e) => this.props.updateCode(e.target.value)} />
                        </Col>
                        <Col md="6">
                            <div style={{ display: "table", height: "100%" }}>
                                <div style={{ display: "table-cell", verticalAlign: "middle", paddingTop: "23px" }}>
                                    <RaisedButton
                                        label="Confirm"
                                        secondary={true}
                                        onClick={() => this.props.confirmPhone(this.props.phone, this.props.code)} />
                                    {this.props.confirmPhoneIsSending === true && <Loader />}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmPhonePopup;