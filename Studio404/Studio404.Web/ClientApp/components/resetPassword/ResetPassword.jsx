import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import Labels from '../../modules/Labels'

class ResetPassword extends Component {
    render () {
        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={this.props.step}>
                    <Step>
                        <StepLabel>Select campaign settings</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad group</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                    </Step>
                </Stepper>
                {this.getStepContent(this.props.step)}
            </div>
        )
    }

    getStepContent (stepIndex) {
        switch (stepIndex) {
            case 1:
                return this.renderStep1()
            case 2:
                return this.renderStep2()
            case 3:
                return this.renderStep3()
            default:
                return ''
        }
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
                    label='Send code'
                    secondary={true}
                    onClick={() => this.props.sendResetPassToken(this.props.username)}
                    disabled={!this.props.step1.valid || this.props.step1.processing} />
            </div>
        )
    }

    renderStep2 () {
        return (
            <div>
                <RaisedButton
                    label='Back'
                    primary={true}
                    onClick={() => this.props.stepBack()} />
                <br />
                <TextField
                    hintText='Enter token'
                    floatingLabelText='Token'
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
                    label='Reset Password'
                    primary={true}
                    onClick={() => this.props.resetPass({
                        userId: this.props.username,
                        token: this.props.token,
                        newPassword: this.props.newPassword
                    })}
                    disabled={!this.props.step2.valid || this.props.step2.processing} />
            </div>
        )
    }

    renderStep3 () {
        return (
            <div>
                Finish
            </div>
        )
    }
}

export default ResetPassword
