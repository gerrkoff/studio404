import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import LoaderContent from "../../components/common/LoaderContent";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";
import css from "../../styles/externalLogin.css";

class ExternalLogin extends Component {

    constructor(props) {
        super(props);

        let queryParsed = queryString.parse(this.props.location.search);
        this.returnUrl = queryParsed.returnUrl;

        this.props.externalLoginProcess(this.props.history, this.returnUrl);
    }

    render() {
        if (!this.props.loading)
            return (
                <div className={css.center}>
                    {this.props.error
                        ? <ErrorLabel text={Labels.defaultError} />
                        : <label className={css.text}>{Labels.redirectNotify}</label>
                    }
                </div>
            );
        else
            return (
                <div className={css.loader}>
                    <LoaderContent />
                </div>
            );
    }
}

export default withRouter(ExternalLogin);