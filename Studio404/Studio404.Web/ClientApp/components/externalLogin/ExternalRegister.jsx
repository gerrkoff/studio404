import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Labels from "../../modules/Labels";
import css from "../../styles/externalLogin.css";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ExternalRegister extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <label className={ css.text }>Success</label>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <TextField
                            hintText="Enter username"
                            floatingLabelText="Username"
                            value={this.props.username}
                            onChange={(e) => this.props.updateUsername(e.target.value)}
                            errorText={this.props.usernameError} />
                    </Col>
                    <Col md="6">
                        <RaisedButton
                            label="Register"
                            primary={true}
                            onClick={this.props.register}
                            disabled={this.props.registerLoading || this.props.usernameInvalid}
                            className={ css.button } />

                        {this.props.registerLoading &&
                            <span className={ css.registrationLoader }>
                                <Loader />
                            </span>
                        }
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