import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, NavLink } from 'reactstrap'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import LoginForm from '../../components/login/LoginForm'
import RegisterForm from '../../components/login/RegisterForm'
import Labels from '../../modules/Labels'
import css from '../../styles/popup.css'
import { muiTheme } from '../../modules/MaterialTheme'

class LoginPopup extends Component {
    constructor (props) {
        super(props)
        this.externalLogin = this.externalLogin.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
    }

    render () {
        const actions = [
            <FlatButton
                label={Labels.cancel}
                primary={true}
                onClick={this.props.closePopup}
                key='cancel'
            />,
            <FlatButton
                label={this.props.registration === true ? Labels.loginPopup_register : Labels.loginPopup_login}
                primary={true}
                key='enter'
                onClick={
                    this.props.registration === true
                        ? () => this.props.register(this.props.registerInfo)
                        : () => this.props.login(this.props.loginInfo)
                }
                disabled={
                    this.props.registration === true
                        ? !this.props.registerInfo.isValid
                        : !this.props.loginInfo.isValid
                }
            />
        ]

        return (
            <div>
                {
                    this.props.toolbarLoginBtn
                        ? <NavLink className={ css.toolbarLogin } onClick={this.props.openPopup} style={{color: muiTheme.palette.alternateTextColor}}>{Labels.loginPopup_login}</NavLink>
                        : <FlatButton label={Labels.loginPopup_login} secondary={true} onClick={this.props.openPopup} />
                }
                <Dialog
                    title={this.props.registration === true ? Labels.loginPopup_register_title : Labels.loginPopup_login_title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closePopup}
                    contentClassName={ css.popup }
                    autoScrollBodyContent={true}>

                    <Row>
                        <Col md="8" sm="8">
                            {this.props.registration === true
                                ? <RegisterForm updateRegisterInfo={this.props.updateRegisterInfo} registerInfo={this.props.registerInfo} />
                                : <LoginForm updateLoginInfo={this.props.updateLoginInfo} loginInfo={this.props.loginInfo} />
                            }
                            <br />
                            <Toggle
                                label={Labels.loginPopup_toogleRegister}
                                labelPosition="right"
                                toggled={this.props.registration}
                                onToggle={(event, isChecked) => this.props.toggleRegistration(isChecked)} />
                            <br />
                            <FlatButton label={Labels.resetPassword} secondary={true} onClick={this.resetPassword} />
                        </Col>
                        <Col md="4" sm="4">
                            <br /><FlatButton label="VKontakte" secondary={true} onClick={() => this.externalLogin('Vkontakte')} />
                            <br /><FlatButton label="Facebook" secondary={true} onClick={() => this.externalLogin('Facebook')} />
                            <br /><FlatButton label="Twitter" secondary={true} onClick={() => this.externalLogin('Twitter')} />
                            <br /><FlatButton label="Google" secondary={true} onClick={() => this.externalLogin('Google')} />
                        </Col>
                    </Row>
                </Dialog>
            </div>
        )
    }

    externalLogin (provider) {
        let returnUrl = encodeURI(this.props.history.location.pathname)
        let redirectUrl = `/externallogin/${provider}?returnUrl=${returnUrl}`
        location.replace(redirectUrl)
    }

    resetPassword () {
        this.props.history.push('/resetpass')
        this.props.closePopup()
    }
}

export default withRouter(LoginPopup)
