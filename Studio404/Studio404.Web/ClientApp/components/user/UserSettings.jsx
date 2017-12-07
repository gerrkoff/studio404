import React, { Component } from 'react';
import UserTitle from "../../components/user/UserTitle";
import ConfirmPhonePopupContainer from "../../containers/ConfirmPhonePopupContainer";

class UserSettings extends Component {
    render() {
        return (
            <div>
                <UserTitle title="Settings" />
                <ConfirmPhonePopupContainer />
            </div>
        );
    }
}

export default UserSettings;