import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Loader from "../../components/common/Loader";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import cssPopup from "../../styles/popup.css";
import css from "../../styles/popupPhone.css";

class ConfirmPhonePopup extends Component {

    constructor(props) {
        super(props);
        this.renderPart = this.renderPart.bind(this);
    }
    

    render() {
        const actions = [
            <FlatButton
                label={Labels.cancel}
                primary={true}
                onClick={this.props.closePopup}
            />
        ];

        return (
            <div>
                <FlatButton label={this.props.phoneConfirmed ? Labels.phone_change : Labels.phone_confirm} secondary={true} onClick={this.props.openPopup} />
                <Dialog
                    title={Labels.phone_title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closePopup}
                    contentClassName={cssPopup.popup }
                    autoScrollBodyContent={true}>

                    {this.props.codeSendSuccess
                        ? this.renderPart(
                            Labels.phone_smsSent(this.props.phone),
                            Labels.phone_codeEnter,
                            Labels.phone_code,
                            this.props.codeError,
                            this.props.codeIsValid,
                            this.props.code,
                            this.props.updateCode,
                            Labels.phone_confirm_code,
                            () => this.props.confirmPhone(this.props.phoneReal, this.props.code),
                            this.props.confirmPhoneIsSending,
                            this.props.confirmPhoneSendError,
                            Labels.phone_confirmError,
                            true)
                        : this.renderPart(
                            Labels.phone_enterPhoneText,
                            Labels.phone_phoneEnter,
                            Labels.phone_phone,
                            this.props.phoneError,
                            this.props.phoneIsValid,
                            this.props.phone,
                            this.props.updatePhone,
                            Labels.phone_sendCode,
                            () => this.props.sendPhoneConfirmation(this.props.phoneReal),
                            this.props.codeIsSending,
                            this.props.codeSendError,
                            Labels.phone_sendError,
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
                        <label className={ css.text }>{label}</label>
                    </Col>
                </Row>
                <Row className={'align-items-center'}>
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
                            disabled={flagLoading || !fieldValid} />

                        {flagLoading &&
                            <span className={ css.loader }>
                                <Loader size={20}/>
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
                        {flagCodePart && <FlatButton label={Labels.phone_resendCode} secondary={true} onClick={this.props.reenterPhone} />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ConfirmPhonePopup;