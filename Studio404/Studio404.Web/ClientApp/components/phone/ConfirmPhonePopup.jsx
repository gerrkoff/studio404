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
                            `Code was successfully sent on ${this.props.phone}. Enter it in the field below`,
                            "Enter code",
                            "Code",
                            this.props.codeError,
                            this.props.codeIsValid,
                            this.props.code,
                            this.props.updateCode,
                            "Confirm",
                            () => this.props.confirmPhone(this.props.phoneReal, this.props.code),
                            this.props.confirmPhoneIsSending,
                            this.props.confirmPhoneSendError,
                            "Error occured while confirming",
                            true)
                        : this.renderPart(
                            "We will send you a code just to confirm that it is you phone",
                            "Enter phone",
                            "Phone",
                            this.props.phoneError,
                            this.props.phoneIsValid,
                            this.props.phone,
                            this.props.updatePhone,
                            "Send code",
                            () => this.props.sendPhoneConfirmation(this.props.phoneReal),
                            this.props.codeIsSending,
                            this.props.codeSendError,
                            "Error occured while sending code",
                            false)
                    }
                </Dialog>
            </div>
        );
    }

    renderPart(label, fieldHint, fieldLabel, fieldError, fieldValid, value, updateValueFunc, btnLabel, btnFunc, flagLoading, flagError, errorText, flagCodePart) {
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
                            onChange={(e) => updateValueFunc(e.target.value)}
                            errorText={fieldError} />
                    </Col>
                    <Col md="6">
                        <RaisedButton
                            label={btnLabel}
                            secondary={true}
                            onClick={btnFunc}
                            disabled={flagLoading || !fieldValid}
                            style={{ paddingTop: 28 }} />

                        {flagLoading &&
                            <span style={{ position: "relative", paddingLeft: 15, top: "5px" }}>
                                <Loader />
                            </span>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {flagError && <ErrorLabel align="left" text={errorText} />}
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {flagCodePart && <FlatButton label="Resend code" secondary={true} onClick={this.props.reenterPhone} />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ConfirmPhonePopup;