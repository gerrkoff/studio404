import Labels from '../modules/Labels'

const initialState = {
    step: 0,
    step1: {
        username: '',
        usernameError: '',
        valid: false,
        processing: false
    },
    step2: {
        token: '',
        tokenError: Labels.fieldIsRequired,
        newPassword: '',
        newPasswordError: Labels.fieldIsRequired,
        newPasswordConfirm: '',
        newPasswordConfirmError: Labels.fieldIsRequired,
        valid: false,
        processing: false
    }
}

const resetPassword = (state = initialState, action) => {
    console.log(action)
    let newState = {}
    switch (action.type) {
        case 'RESET_PASS_STEP_BACK':
            newState = {
                ...state,
                step: 0,
                step2: {
                    token: '',
                    newPassword: '',
                    newPasswordConfirm: ''
                }
            }
            validateStep2(newState.step2)
            return newState

        case 'RESET_PASS_STEP1_UPDATE':
            newState = {
                ...state,
                step1: {
                    ...state.step1,
                    [action.fieldName]: action.fieldValue
                }
            }
            validateStep1(newState.step1)
            return newState

        case 'RESET_PASS_STEP1_PROCESSING':
            return {
                ...state,
                step1: {
                    ...state.step1,
                    processing: true
                }
            }

        case 'RESET_PASS_STEP1_SUCCESS':
            return {
                ...state,
                step1: {
                    ...state.step1,
                    processing: false
                },
                step: 1
            }

        case 'RESET_PASS_STEP1_ERROR':
            return {
                ...state,
                step1: {
                    ...state.step1,
                    processing: false,
                    usernameError: action.usernameError,
                    valid: action.usernameError === ''
                }
            }

        case 'RESET_PASS_STEP2_UPDATE':
            newState = {
                ...state,
                step2: {
                    ...state.step2,
                    [action.fieldName]: action.fieldValue
                }
            }
            validateStep2(newState.step2)
            return newState

        case 'RESET_PASS_STEP2_PROCESSING':
            return {
                ...state,
                step2: {
                    ...state.step2,
                    processing: true
                }
            }

        case 'RESET_PASS_STEP2_SUCCESS':
            return {
                ...state,
                step2: {
                    ...state.step2,
                    processing: false
                },
                step: 2
            }

        case 'RESET_PASS_STEP2_ERROR':
            return {
                ...state,
                step2: {
                    ...state.step2,
                    processing: false,
                    tokenError: action.tokenError,
                    valid: action.tokenError === ''
                }
            }

        default:
            return state
    }
}

export default resetPassword

function validateStep2 (info) {
    let isValid = true

    if (info.newPassword === '') {
        isValid = false
        info.newPasswordError = Labels.fieldIsRequired
    }
    else if (info.newPassword.length < 5) {
        isValid = false
        info.newPasswordError = Labels.passwordCreateRule
    }
    else {
        info.newPasswordError = ''
    }

    if (info.newPasswordConfirm === '') {
        isValid = false
        info.newPasswordConfirmError = Labels.fieldIsRequired
    }
    else if (info.newPasswordConfirm !== info.newPassword) {
        isValid = false
        info.newPasswordConfirmError = Labels.passwordConfirmFail
    }
    else {
        info.newPasswordConfirmError = ''
    }

    if (info.token === '') {
        isValid = false
        info.tokenError = Labels.fieldIsRequired
    }
    else {
        info.tokenError = ''
    }

    info.valid = isValid
}

function validateStep1 (info) {
    let isValid = true

    if (info.username === '') {
        isValid = false
        info.usernameError = Labels.fieldIsRequired
    }
    else if (info.username.length > 30 || /[^a-zA-Z0-9_]/.test(info.username)) {
        isValid = false
        info.usernameError = Labels.usernameCreateRule
    }
    else {
        info.usernameError = ''
    }

    info.valid = isValid
}
