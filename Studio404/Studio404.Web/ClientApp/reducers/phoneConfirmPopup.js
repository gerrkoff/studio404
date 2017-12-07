const phoneProcess = (phone) => {
    let isValid = phone && phone.length > 3;
    return { phone, isValid };
}

const initialState = {
    open: false,
    phone: phoneProcess("").phone,
    phoneIsValid: false,
    phoneError: "",
    code: "",
    codeError: "",
    codeIsSending: false,
    codeSendError: false,
    codeSendSuccess: false,
    confirmPhoneIsSending: false,
    confirmPhoneSendError: false,
    confirmPhoneSendSuccess: false
}

const phoneConfirmPopup = (state = initialState, action) => {
    switch (action.type) {

        case "PHONE_CONFIRM_POPUP_OPEN":
            return {...state,
                open: true
            };

        case "PHONE_CONFIRM_POPUP_CLOSE":
            return initialState;

        case "PHONE_CONFIRM_POPUP_UPDATE_PHONE":
            let result = phoneProcess(action.phone);

            return {
                ...state,
                phone: result.phone,
                phoneIsValid: result.isValid
            };

        case "PHONE_CONFIRM_POPUP_UPDATE_CODE":
            return {
                ...state,
                code: action.code
            };

        case "PHONE_CONFIRM_POPUP_SEND_CODE_LOADING":
            return {
                ...state,
                codeIsSending: true,
                codeSendError: false,
                codeSendSuccess: false
            };

        case "PHONE_CONFIRM_POPUP_SEND_CODE_SUCCESS":
            return {
                ...state,
                codeIsSending: false,
                codeSendError: false,
                codeSendSuccess: true
            };

        case "PHONE_CONFIRM_POPUP_SEND_CODE_ERROR":
            return {
                ...state,
                codeIsSending: false,
                codeSendError: true,
                codeSendSuccess: false
            };

        case "PHONE_CONFIRM_POPUP_SEND_CONFIRM_LOADING":
            return {
                ...state,
                confirmPhoneIsSending: true,
                confirmPhoneSendError: false,
                confirmPhoneSendSuccess: false
            };

        case "PHONE_CONFIRM_POPUP_SEND_CONFIRM_SUCCESS":
            return {
                ...state,
                confirmPhoneIsSending: false,
                confirmPhoneSendError: false,
                confirmPhoneSendSuccess: true
            };

        case "PHONE_CONFIRM_POPUP_SEND_CONFIRM_ERROR":
            return {
                ...state,
                confirmPhoneIsSending: false,
                confirmPhoneSendError: true,
                confirmPhoneSendSuccess: false
            };

        case "PHONE_CONFIRM_POPUP_INVALID_PHONE":
            return {
                ...state,
                phoneError: "Sms was not delivered to this phone number"
            };
        
        case "PHONE_CONFIRM_POPUP_INVALID_CODE":
            return {
                ...state,
                codeError: "Invalid code"
            };

        default:
            return state;
    }
}

export default phoneConfirmPopup