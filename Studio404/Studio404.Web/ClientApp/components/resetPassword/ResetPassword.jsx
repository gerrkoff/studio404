import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Labels from '../../modules/Labels'

class ResetPassword extends Component {
    render () {
        return (
            <div>
                <TextField
                    hintText={Labels.loginForm_userEnter}
                    floatingLabelText={Labels.loginForm_user}
                    value={this.props.username}
                    onChange={e => this.props.updateResetPassInfo('username', e.target.value)}
                    errorText={this.props.usernameError} />
                <br />
                <RaisedButton
                    label='Send code'
                    primary={false}
                    onClick={() => this.props.sendResetPassToken(this.props.username)} />
                <br />
                <TextField
                    hintText='Enter token'
                    floatingLabelText='Token'
                    value={this.props.token}
                    onChange={e => this.props.updateResetPassInfo('token', e.target.value)}
                    errorText={this.props.tokenError} />
                <br />
                <TextField
                    hintText={Labels.changePass_newPassEnter}
                    floatingLabelText={Labels.changePass_newPass}
                    type="password"
                    value={this.props.newPassword}
                    onChange={e => this.props.updateResetPassInfo('newPassword', e.target.value)}
                    errorText={this.props.newPasswordError} />
                <br />
                <TextField
                    hintText={Labels.changePass_newPassConfirmEnter}
                    floatingLabelText={Labels.changePass_newPassConfirm}
                    type="password"
                    value={this.props.newPasswordConfirm}
                    onChange={e => this.props.updateResetPassInfo('newPasswordConfirm', e.target.value)}
                    errorText={this.props.newPasswordConfirmError} />
                <br />
                <RaisedButton
                    label='Reset Password'
                    primary={true}
                    onClick={() => this.props.resetPass({
                        userId: this.props.username,
                        token: this.props.token,
                        newPassword: this.props.newPassword
                    })} />
            </div>
        )
    }
}

export default ResetPassword
