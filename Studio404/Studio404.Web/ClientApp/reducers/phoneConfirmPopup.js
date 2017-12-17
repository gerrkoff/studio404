import Labels from '../modules/Labels'

const initialState = {
    open: false,
    phone: phoneProcess('', '').phone,
    phoneReal: '',
    phoneIsValid: false,
    phoneError: '',
    code: '',
    codeIsValid: false,
    codeError: '',
    codeIsSending: false,
    codeSendError: false,
    codeSendSuccess: false,
    confirmPhoneIsSending: false,
    confirmPhoneSendError: false,
    confirmPhoneSendSuccess: false
}

const phoneConfirmPopup = (state = initialState, action) => {
    switch (action.type) {
        case 'PHONE_CONFIRM_POPUP_OPEN':
            return {...state,
                open: true
            }

        case 'PHONE_CONFIRM_POPUP_CLOSE':
            return initialState

        case 'PHONE_CONFIRM_POPUP_UPDATE_PHONE':
            let result = phoneProcess(state.phone, action.phone)

            return {
                ...state,
                phone: result.phone,
                phoneReal: result.phoneReal,
                phoneIsValid: result.isValid,
                phoneError: result.error
            }

        case 'PHONE_CONFIRM_POPUP_UPDATE_CODE':
            let code = action.code.replace(/\D/g, '')
            let codeValidationResult = codeValidate(code)

            return {
                ...state,
                code: code,
                codeError: codeValidationResult.error,
                codeIsValid: codeValidationResult.isValid
            }

        case 'PHONE_CONFIRM_POPUP_SEND_CODE_LOADING':
            return {
                ...state,
                codeIsSending: true,
                codeSendError: false,
                codeSendSuccess: false
            }

        case 'PHONE_CONFIRM_POPUP_SEND_CODE_SUCCESS':
            return {
                ...state,
                codeIsSending: false,
                codeSendError: false,
                codeSendSuccess: true
            }

        case 'PHONE_CONFIRM_POPUP_SEND_CODE_ERROR':
            return {
                ...state,
                codeIsSending: false,
                codeSendError: true,
                codeSendSuccess: false
            }

        case 'PHONE_CONFIRM_POPUP_SEND_CONFIRM_LOADING':
            return {
                ...state,
                confirmPhoneIsSending: true,
                confirmPhoneSendError: false,
                confirmPhoneSendSuccess: false
            }

        case 'PHONE_CONFIRM_POPUP_SEND_CONFIRM_SUCCESS':
            return {
                ...state,
                confirmPhoneIsSending: false,
                confirmPhoneSendError: false,
                confirmPhoneSendSuccess: true
            }

        case 'PHONE_CONFIRM_POPUP_SEND_CONFIRM_ERROR':
            return {
                ...state,
                confirmPhoneIsSending: false,
                confirmPhoneSendError: true,
                confirmPhoneSendSuccess: false,
                codeError: ''
            }

        case 'PHONE_CONFIRM_POPUP_PHONE_ALREADY_CONFIRMED':
            return {
                ...state,
                codeIsSending: false,
                codeSendSuccess: false,
                phoneIsValid: false,
                phoneError: Labels.phoneAlreadyConfirmed
            }

        case 'PHONE_CONFIRM_POPUP_INVALID_CODE':
            return {
                ...state,
                confirmPhoneIsSending: false,
                confirmPhoneSendSuccess: false,
                codeIsValid: false,
                codeError: Labels.phoneConfirmationCodeInvalid
            }

        case 'PHONE_CONFIRM_POPUP_REENTER_PHONE':
            return {
                ...state,
                codeSendSuccess: false,
                code: '',
                codeError: '',
                codeSendError: false
            }

        default:
            return state
    }
}

export default phoneConfirmPopup

function phoneProcess (phoneOld, phone) {
    if (phone.length > 0 && phone[0] !== '8') {
        let digit = phone[0]
        phone = phone.substring(1)
        phone += digit
    }

    let phoneReal = phone.replace(/\D/g, '')
    phoneReal = phoneReal.substring(1)

    if (phone.length > 0 && phone.length < phoneOld.length && /\D$/.test(phoneOld)) {
        phoneReal = phoneReal.substring(0, phoneReal.length - 1)
    }

    let isValid = phoneReal.length === 10
    let error = isValid || phoneReal.length === 0 ? '' : Labels.phoneRule

    phone = '8 ('
    for (let i = 0; i < phoneReal.length; i++) {
        if (!phoneReal[i]) {
            break
        }
        phone += phoneReal[i] + postFix(i)
    }

    return { phone, phoneReal, isValid, error }
}

function postFix (i) {
    switch (i) {
        case 2: return ') '
        case 5: return '-'
        case 7: return '-'
        default: return ''
    }
}

function codeValidate (code) {
    let result = {
        isValid: false,
        error: ''
    }

    if (code.length === 6) {
        result.isValid = true
    }
    else if (code.length > 0) {
        result.error = Labels.phoneConfirmationCodeRule
    }

    return result
}
