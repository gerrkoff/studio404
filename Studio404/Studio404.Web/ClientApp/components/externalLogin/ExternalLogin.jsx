import React, { Component } from 'react';

class ExternalLogin extends Component {

    constructor(props) {
        super(props);
        this.props.externalLoginProcess();
    }
    

    render() {
        return (
            <div>
                {
                    this.props.processStage === 0
                        ? "Processing"
                        : this.props.processStage === 1
                            ? "Success"
                            : this.props.processStage === 2
                                ? "Register"
                                : "Error"
                }
            </div>
        );
    }
}

export default ExternalLogin;