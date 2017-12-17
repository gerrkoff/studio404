import { Http, errorHandler } from '../modules/Http'
import { showDefaultError, show } from './MessageActions'
import { loadCurrentUser } from './AccountActions'
import Labels from '../modules/Labels'
import Token from '../modules/Token'

const ConfirmPhonePopup = {
    open: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_OPEN'
        }
    },

    close: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_CLOSE'
        }
    },

    updatePhone: (phone) => {
        return {
            type: 'PHONE_CONFIRM_POPUP_UPDATE_PHONE',
            phone
        }
    },

    updateCode: (code) => {
        return {
            type: 'PHONE_CONFIRM_POPUP_UPDATE_CODE',
            code
        }
    },

    sendLoading: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_SEND_CODE_LOADING'
        }
    },

    sendSuccess: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_SEND_CODE_SUCCESS'
        }
    },

    sendError: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_SEND_CODE_ERROR'
        }
    },

    confirmLoading: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_SEND_CONFIRM_LOADING'
        }
    },

    confirmSuccess: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_SEND_CONFIRM_SUCCESS'
        }
    },

    confirmError: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_SEND_CONFIRM_ERROR'
        }
    },

    phoneAlreadyConfirmed: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_PHONE_ALREADY_CONFIRMED'
        }
    },

    invalidCode: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_INVALID_CODE'
        }
    },

    reenterPhone: () => {
        return {
            type: 'PHONE_CONFIRM_POPUP_REENTER_PHONE'
        }
    }
}

export const sendPhoneConfirmation = (phone) => {
    return (dispatch) => {
        dispatch(ConfirmPhonePopup.sendLoading())
        Http.Post('api/account/SendPhoneConfirmation', { phone })
            .fail((data) => {
                dispatch(ConfirmPhonePopup.sendError())
                dispatch(errorHandler(data))
            })
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(ConfirmPhonePopup.sendSuccess())
                        dispatch(show(Labels.smsSent))
                        break

                    case 2:
                        dispatch(ConfirmPhonePopup.phoneAlreadyConfirmed())
                        break

                    default:
                        dispatch(ConfirmPhonePopup.sendError())
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}

export const confirmPhone = (phone, code) => {
    return (dispatch) => {
        dispatch(ConfirmPhonePopup.confirmLoading())
        Http.Post('api/account/ConfirmPhone', { phone, code })
            .fail((data) => {
                dispatch(ConfirmPhonePopup.confirmError())
                dispatch(errorHandler(data))
            })
            .done((data) => {
                switch (data.result) {
                    case 1:
                        dispatch(ConfirmPhonePopup.confirmSuccess())
                        dispatch(ConfirmPhonePopup.close())
                        dispatch(show(Labels.phoneConfirmed))
                        Token.Save(data.token)
                        dispatch(loadCurrentUser())
                        break

                    case 2:
                        dispatch(ConfirmPhonePopup.invalidCode())
                        break

                    default:
                        dispatch(ConfirmPhonePopup.confirmError())
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}

export const openConfirmPhonePopup = () => ConfirmPhonePopup.open()

export const closeConfirmPhonePopup = () => ConfirmPhonePopup.close()

export const updatePhone = (phone) => ConfirmPhonePopup.updatePhone(phone)

export const updateCode = (code) => ConfirmPhonePopup.updateCode(code)

export const reenterPhone = (code) => ConfirmPhonePopup.reenterPhone()
