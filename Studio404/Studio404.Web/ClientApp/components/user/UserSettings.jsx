import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import UserTitle from "../../components/user/UserTitle";
import ConfirmPhonePopupContainer from "../../containers/ConfirmPhonePopupContainer";

class UserSettings extends Component {
    render() {
        return (
            <div>
                <UserTitle title="Settings" />
                <Row>
                    <Col md="12">
                        <div style={{ padding: 10 }}>
                            <ConfirmPhonePopupContainer />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserSettings;