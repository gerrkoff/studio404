const initialState = {
    username: '',
    usernameError: '',
    usernameValid: false,
    tokenSendProcessing: false,
    tokenSendSuccess: false,
    token: '',
    tokenError: '',
    newPassword: '',
    newPasswordError: '',
    newPasswordConfirm: '',
    newPasswordConfirmError: '',
    resetPasswordProcessing: false,
    resetPasswordSuccess: false,
    restFormValid: false
}

const resetPassword = (state = initialState, action) => {
    console.log(action)
    let newState = {}
    switch (action.type) {
        case 'RESET_PASS_UPDATE':
            newState = {
                ...state,
                [action.fieldName]: action.fieldValue
            }
            validate(newState)
            return newState

        case 'RESET_PASS_SEND_TOKEN_PROCESSING':
            return {
                ...state,
                tokenSendProcessing: true,
                tokenSendSuccess: false
            }

        case 'RESET_PASS_SEND_TOKEN_PROCESS_SUCCESS':
            return {
                ...state,
                tokenSendProcessing: false,
                tokenSendSuccess: true
            }

        case 'RESET_PASS_SEND_TOKEN_PROCESS_ERROR':
            return {
                ...state,
                tokenSendProcessing: false,
                tokenSendSuccess: false,
                usernameError: action.usernameError,
                usernameValid: false
            }

        case 'RESET_PASS_PROCESSING':
            return {
                ...state,
                resetPasswordProcessing: true,
                resetPasswordSuccess: false
            }

        case 'RESET_PASS_SUCCESS':
            return {
                ...state,
                resetPasswordProcessing: false,
                resetPasswordSuccess: true
            }

        case 'RESET_PASS_ERROR':
            return {
                ...state,
                resetPasswordProcessing: false,
                resetPasswordSuccess: false,
                usernameError: action.usernameError,
                tokenError: action.usernameError
            }

        default:
            return state
    }
}

export default resetPassword

function validate (state) {
}
