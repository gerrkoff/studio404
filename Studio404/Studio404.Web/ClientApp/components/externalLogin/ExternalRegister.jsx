import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Labels from "../../modules/Labels";
import css from "../../styles/externalLogin.css";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from "../../components/common/Loader";
import ErrorLabel from "../common/ErrorLabel";

class ExternalRegister extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col md="12" className={ css.center }>
                        <label className={ css.text }>{Labels.extlogin_successAuth(this.props.provider)}</label>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className={ css.center }>
                        <div>
                            <TextField
                                hintText={Labels.loginForm_userEnter}
                                floatingLabelText={Labels.loginForm_user}
                                value={this.props.username}
                                onChange={(e) => this.props.updateUsername(e.target.value)}
                                errorText={this.props.usernameError}
                                className={css.left} />
                        </div>
                        <div className={ this.props.usernameInvalid ? "" : css.buttonContainer }>
                            <RaisedButton
                                label={Labels.loginPopup_register}
                                primary={true}
                                onClick={() => this.props.externalLoginRegister(this.props.username)}
                                disabled={this.props.registerLoading || this.props.usernameInvalid} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        {this.props.registerError && <ErrorLabel align="left" text={Labels.defaultError} />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ExternalRegister;