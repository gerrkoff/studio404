import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import UserTitle from '../../components/user/UserTitle'
import ConfirmPhonePopupContainer from '../../containers/ConfirmPhonePopupContainer'
import ChangePassPopupContainer from '../../containers/ChangePassPopupContainer'
import Labels from '../../modules/Labels'
import css from '../../styles/userProfile.css'

class UserSettings extends Component {
    render () {
        return (
            <div>
                <UserTitle title={Labels.settings} />
                <Row>
                    <Col md="12">
                        <div className={ css.setting }>
                            <div className={ css.changePhone }>
                                <ConfirmPhonePopupContainer />
                            </div>
                            {this.props.phoneConfirmed &&
                                <span className={ css.currentPhone }>
                                    {Labels.settings_currentPhone(this.props.phone)}
                                </span>
                            }
                        </div>
                        <div className={ css.setting }>
                            <ChangePassPopupContainer />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserSettings
