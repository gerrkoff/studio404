import Labels from '../modules/Labels'

const initialState = {
    open: false,
    info: {
        currentPassword: '',
        currentPasswordError: Labels.fieldIsRequired,
        newPassword: '',
        newPasswordError: Labels.fieldIsRequired,
        newPasswordConfirm: '',
        newPasswordConfirmError: Labels.fieldIsRequired,
        isValid: false
    }
}

const changePassPopup = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case 'CHANGE_PASS_POPUP_OPEN':
            return {
                ...state,
                open: true
            }

        case 'CHANGE_PASS_POPUP_CLOSE':
            return initialState

        case 'CHANGE_PASS_POPUP_UPDATE':
            newState = {
                ...state,
                info: {
                    ...state.info,
                    [action.fieldName]: action.fieldValue
                }
            }
            validateInfo(newState.info)
            return newState

        case 'CHANGE_PASS_ERROR_WRONG_CUR_PASSWORD':
            return {
                ...state,
                info: {
                    ...state.info,
                    currentPasswordError: Labels.currentPasswordInvalid
                }
            }

        default:
            return state
    }
}

function validateInfo (info) {
    let isValid = true

    if (info.currentPassword === '') {
        isValid = false
        info.currentPasswordError = Labels.fieldIsRequired
    }
    else {
        info.currentPasswordError = ''
    }

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

    info.isValid = isValid
}

export default changePassPopup
