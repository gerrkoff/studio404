import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import UserTitle from "../../components/user/UserTitle";
import ConfirmPhonePopupContainer from "../../containers/ConfirmPhonePopupContainer";
import ChangePassPopupContainer from "../../containers/ChangePassPopupContainer";
import Labels from "../../modules/Labels";

class UserSettings extends Component {
    render() {
        return (
            <div>
                <UserTitle title={Labels.settings} />
                <Row>
                    <Col md="12">
                        <div style={{ padding: 10 }}>
                            <div style={{ display: "inline-block" }}>
                                <ConfirmPhonePopupContainer />
                            </div>
                            {this.props.phoneConfirmed &&
                                <span style={{ color: "gray", fontSize: "12px", fontWeight: "bold", paddingLeft: "15px" }}>
                                    {Labels.settings_currentPhone(this.props.phone)}
                                </span>
                            }
                        </div>
                        <div style={{ padding: 10 }}>
                            <ChangePassPopupContainer />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserSettings;