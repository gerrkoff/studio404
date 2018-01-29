import React, { Component } from 'react';
import LoaderContent from "../../components/common/LoaderContent";
import css from "../../styles/externalLogin.css";

class ExternalLogin extends Component {

    constructor(props) {
        super(props);
        this.props.externalLoginProcess();
    }

    render() {
        if (this.props.processStage === 1)
            return (
                <div>
                    Success
                </div>
            );
        
        if (this.props.processStage === 2)
            return (
                <div>
                    Register
                </div>
            );
        
        if (this.props.processStage === 3)
            return (
                <div>
                    Error
                </div>
            );
        
        return (
            <div className={ css.loader }>
                <LoaderContent />
            </div>
        );
    }
}

export default ExternalLogin;