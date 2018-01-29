import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import LoaderContent from "../../components/common/LoaderContent";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import css from "../../styles/externalLogin.css";
import ExternalRegister from "./ExternalRegister";

class ExternalLogin extends Component {

    constructor(props) {
        super(props);
        this.props.externalLoginProcess();
    }

    render() {
        if (this.props.processStage === 1)
            return (
                <Row>
                    <Col md="12"><ErrorLabel text={Labels.redirectNotify}/></Col>
                </Row>
            );
        
        if (this.props.processStage === 2)
            return (
                <div>
                    <ExternalRegister
                        externalLoginRegister={this.props.externalLoginRegister}
                        updateUsername={this.props.updateUsername}
                        username={this.props.username}
                        usernameInvalid={this.props.usernameInvalid}
                        usernameError={this.props.usernameError}
                        registerLoading={this.props.registerLoading}
                        registerError={this.props.registerError}
                        provider={this.props.providerName}
                    />
                </div>
            );
        
        if (this.props.processStage === 3)
            return (
                <Row>
                    <Col md="12"><ErrorLabel text={Labels.defaultError}/></Col>
                </Row>
            );
        
        return (
            <div className={ css.loader }>
                <LoaderContent />
            </div>
        );
    }
}

export default ExternalLogin;