import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import Labels from '../../modules/Labels'

class ResetPassword extends Component {
    render () {
        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={this.props.step} orientation="vertical">
                    <Step>
                        <StepLabel>{Labels.resetPass_step1}</StepLabel>
                        <StepContent>{this.renderStep1()}</StepContent>
                    </Step>
                    <Step>
                        <StepLabel>{Labels.resetPass_step2}</StepLabel>
                        <StepContent>{this.renderStep2()}</StepContent>
                    </Step>
                    <Step>
                        <StepLabel>{Labels.resetPass_step3}</StepLabel>
                        <StepContent>{this.renderStep3()}</StepContent>
                    </Step>
                </Stepper>
            </div>
        )
    }

    renderStep1 () {
        return (
            <div>
                <TextField
                    hintText={Labels.loginForm_userEnter}
                    floatingLabelText={Labels.loginForm_user}
                    value={this.props.step1.username}
                    onChange={e => this.props.updateStep1Info('username', e.target.value)}
                    errorText={this.props.step1.usernameError} />
                <br />
                <RaisedButton
                    label={Labels.resetPass_sendToken}
                    primary={true}
                    onClick={() => this.props.sendResetPassToken(this.props.step1.username)}
                    disabled={!this.props.step1.valid || this.props.step1.processing} />
            </div>
        )
    }

    renderStep2 () {
        return (
            <div>
                <TextField
                    hintText={Labels.resetPass_tokenEnter}
                    floatingLabelText={Labels.resetPass_token}
                    value={this.props.step2.token}
                    onChange={e => this.props.updateStep2Info('token', e.target.value)}
                    errorText={this.props.step2.tokenError} />
                <br />
                <TextField
                    hintText={Labels.changePass_newPassEnter}
                    floatingLabelText={Labels.changePass_newPass}
                    type="password"
                    value={this.props.step2.newPassword}
                    onChange={e => this.props.updateStep2Info('newPassword', e.target.value)}
                    errorText={this.props.step2.newPasswordError} />
                <br />
                <TextField
                    hintText={Labels.changePass_newPassConfirmEnter}
                    floatingLabelText={Labels.changePass_newPassConfirm}
                    type="password"
                    value={this.props.step2.newPasswordConfirm}
                    onChange={e => this.props.updateStep2Info('newPasswordConfirm', e.target.value)}
                    errorText={this.props.step2.newPasswordConfirmError} />
                <br />
                <RaisedButton
                    label={Labels.resetPassword}
                    primary={true}
                    onClick={() => this.props.resetPass({
                        userId: this.props.username,
                        token: this.props.token,
                        newPassword: this.props.newPassword
                    })}
                    disabled={!this.props.step2.valid || this.props.step2.processing} />
                <FlatButton
                    label={Labels.back}
                    onClick={() => this.props.stepBack()} />
            </div>
        )
    }

    renderStep3 () {
        return (
            <div>{Labels.resetPass_finish}</div>
        )
    }
}

export default ResetPassword
