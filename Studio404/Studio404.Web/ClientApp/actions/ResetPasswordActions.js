import { Http, errorHandler } from '../modules/Http'
import { showDefaultError } from './MessageActions'
import Labels from '../modules/Labels'

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
    return (dispatch) => {
        dispatch(ResetPassword.step1Processing())
        Http.Post('api/account/sendpassresettoken', {userId})
            .fail(data => {
                dispatch(errorHandler(data))
                dispatch(ResetPassword.step1Error(''))
            })
            .done(result => {
                switch (result) {
                    case 1:
                        dispatch(ResetPassword.step1Success())
                        break

                    case 2:
                        dispatch(ResetPassword.step1Error(Labels.resetPass_invalidUser))
                        break

                    default:
                        dispatch(showDefaultError())
                        dispatch(ResetPassword.step1Error(''))
                        break
                }
            })
    }
}

export const resetPass = (info) => {
    return (dispatch) => {
        dispatch(ResetPassword.step2Processing())
        Http.Post('api/account/resetpassword', info)
            .fail(data => {
                dispatch(errorHandler(data))
                dispatch(ResetPassword.step2Error(''))
            })
            .done(result => {
                switch (result) {
                    case 1:
                        dispatch(ResetPassword.step2Success())
                        break

                    case 2:
                        dispatch(ResetPassword.step2Error(Labels.resetPass_invalidToken))
                        break

                    default:
                        dispatch(showDefaultError())
                        dispatch(ResetPassword.step2Error(''))
                        break
                }
            })
    }
}

export const updateStep1Info = (fieldName, fieldValue) => ResetPassword.updateStep1Info(fieldName, fieldValue)
export const updateStep2Info = (fieldName, fieldValue) => ResetPassword.updateStep2Info(fieldName, fieldValue)
export const stepBack = () => ResetPassword.stepBack()
