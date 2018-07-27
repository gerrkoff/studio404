// import { Http, errorHandler } from '../modules/Http'
// import { show, showDefaultError } from './MessageActions'

const ResetPassword = {
    updateResetPassInfo: (fieldName, fieldValue) => {
        return {
            type: 'RESET_PASS_UPDATE',
            fieldName,
            fieldValue
        }
    },

    tokenSendProcessing: () => {
        return {
            type: 'RESET_PASS_SEND_TOKEN_PROCESSING'
        }
    },

    tokenSendProcessSuccess: () => {
        return {
            type: 'RESET_PASS_SEND_TOKEN_PROCESS_SUCCESS'
        }
    },

    tokenSendProcessError: (usernameError) => {
        return {
            type: 'RESET_PASS_SEND_TOKEN_PROCESS_ERROR',
            usernameError
        }
    },

    resetPassProcessing: () => {
        return {
            type: 'RESET_PASS_PROCESSING'
        }
    },

    resetPassProcessSuccess: () => {
        return {
            type: 'RESET_PASS_SUCCESS'
        }
    },

    resetPassProcessError: (usernameError, tokenError) => {
        return {
            type: 'RESET_PASS_ERROR',
            usernameError,
            tokenError
        }
    }
}

export const sendResetPassToken = (userId) => {
    return ResetPassword.tokenSendProcessing()
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
    return ResetPassword.resetPassProcessing()
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

export const updateResetPassInfo = (fieldName, fieldValue) => ResetPassword.updateResetPassInfo(fieldName, fieldValue)
