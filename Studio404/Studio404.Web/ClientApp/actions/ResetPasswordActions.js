// import { Http, errorHandler } from '../modules/Http'
// import { show, showDefaultError } from './MessageActions'

const ResetPassword = {
    stepBack: () => {
        return {
            type: 'RESET_PASS_STEP_BACK'
        }
    },

    updateStep1Info: (fieldName, fieldValue) => {
        return {
            type: 'RESET_PASS_STEP1_UPDATE',
            fieldName,
            fieldValue
        }
    },

    updateStep2Info: (fieldName, fieldValue) => {
        return {
            type: 'RESET_PASS_STEP2_UPDATE',
            fieldName,
            fieldValue
        }
    },

    step1Processing: () => {
        return {
            type: 'RESET_PASS_STEP1_PROCESSING'
        }
    },

    step1Success: () => {
        return {
            type: 'RESET_PASS_STEP1_SUCCESS'
        }
    },

    step1Error: (usernameError) => {
        return {
            type: 'RESET_PASS_STEP1_ERROR',
            usernameError
        }
    },

    step2Processing: () => {
        return {
            type: 'RESET_PASS_STEP2_PROCESSING'
        }
    },

    step2Success: () => {
        return {
            type: 'RESET_PASS_STEP2_SUCCESS'
        }
    },

    step2Error: (tokenError) => {
        return {
            type: 'RESET_PASS_STEP2_ERROR',
            tokenError
        }
    }
}

export const sendResetPassToken = (userId) => {
    return ResetPassword.step1Success()
    /*
    return (dispatch) => {
        dispatch(ResetPassword.tokenSendProcessing())
        Http.Post('api/account/sendpassresettoken', userId)
            .fail(data => dispatch(errorHandler(data)))
            .done(result => {
                switch (result) {
                    case 1:
                        dispatch(closeChangePassPopup())
                        dispatch(show(Labels.changePassword_success))
                        break

                    case 2:
                        dispatch(ChangePassPopup.changePassErrorWrongPassword())
                        break

                    default:
                        dispatch(showDefaultError())
                        break
                }
            })
    }
    */
}

export const resetPass = (info) => {
    return ResetPassword.step2Success()
    /*
    return (dispatch) => {
        dispatch(ResetPassword.tokenSendProcessing())
        Http.Post('api/account/sendpassresettoken', userId)
            .fail(data => dispatch(errorHandler(data)))
            .done(result => {
                switch (result) {
                    case 1:
                        dispatch(closeChangePassPopup())
                        dispatch(show(Labels.changePassword_success))
                        break

                    case 2:
                        dispatch(ChangePassPopup.changePassErrorWrongPassword())
                        break

                    default:
                        dispatch(showDefaultError())
                        break
                }
            })
    }
    */
}

export const updateStep1Info = (fieldName, fieldValue) => ResetPassword.updateStep1Info(fieldName, fieldValue)
export const updateStep2Info = (fieldName, fieldValue) => ResetPassword.updateStep2Info(fieldName, fieldValue)
export const stepBack = () => ResetPassword.stepBack()
