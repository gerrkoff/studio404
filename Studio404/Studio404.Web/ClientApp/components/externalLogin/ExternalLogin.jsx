import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import queryString from 'query-string';
import LoaderContent from "../../components/common/LoaderContent";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import css from "../../styles/externalLogin.css";
import ExternalRegister from "./ExternalRegister";

class ExternalLogin extends Component {

    constructor(props) {
        super(props);

        let queryParsed = queryString.parse(this.props.location.search);
        console.log(queryParsed.returnUrl);
        this.returnUrl = queryParsed.returnUrl;

        this.props.externalLoginProcess(this.props.history, this.returnUrl);
    }

    render() {
        if (this.props.processStage === 1)
            return (
                <div>
                    <ExternalRegister
                        externalLoginRegister={(username) => this.props.externalLoginRegister(username, this.props.history, this.returnUrl)}
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
        
        if (this.props.processStage === 2)
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

export default withRouter(ExternalLogin);