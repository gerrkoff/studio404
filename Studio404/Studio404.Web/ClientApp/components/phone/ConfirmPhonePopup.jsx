import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Loader from "../../components/common/Loader";
import ErrorLabel from "../common/ErrorLabel";

class ConfirmPhonePopup extends Component {

    constructor(props) {
        super(props);
        this.renderPart = this.renderPart.bind(this);
    }
    

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

                    {this.props.codeSendSuccess
                        ? this.renderPart(
                            "Code was successfully sent. Enter it in the field below",
                            "Enter code",
                            "Code",
                            "",
                            this.props.code,
                            this.props.updateCode,
                            "Confirm",
                            this.props.confirmPhone,
                            this.props.confirmPhoneIsSending,
                            this.props.confirmPhoneSendError,
                            "Error occured while confirming")
                        : this.renderPart(
                            "We send you a code just to confirm that it is you phone",
                            "Enter phone",
                            "Phone",
                            "",
                            this.props.phone,
                            this.props.updatePhone,
                            "Send code",
                            this.props.sendPhoneConfirmation,
                            this.props.codeIsSending,
                            this.props.codeSendError,
                            "Error occured while sending code")
                    }
                </Dialog>
            </div>
        );
    }

    renderPart(label, fieldHint, fieldLabel, fieldError, value, updateValueFunc, btnLabel, btnFunc, flagLoading, flagError, errorText) {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <label style={{paddingTop: 10}}>{label}</label>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <TextField
                            hintText={fieldHint}
                            floatingLabelText={fieldLabel}
                            value={value}
                            onChange={(e) => updateValueFunc(e.target.value)} />
                    </Col>
                    <Col md="6">
                        <div style={{ display: "table", height: "100%" }}>
                            <div style={{ display: "table-cell", verticalAlign: "middle", paddingTop: "23px" }}>
                                <RaisedButton
                                    label={btnLabel}
                                    secondary={true}
                                    onClick={() => btnFunc(value)} />
                                {flagLoading &&
                                    <div style={{ display: "inline-block", padding: 10 }}>
                                        <Loader />
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {flagError && <ErrorLabel align="left" text={errorText} />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ConfirmPhonePopup;