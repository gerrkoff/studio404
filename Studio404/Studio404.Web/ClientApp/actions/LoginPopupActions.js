import { Http, errorHandler } from '../modules/Http'
import { loadCurrentUser } from './AccountActions'
import { showDefaultError, show } from './MessageActions'
import Labels from '../modules/Labels'
import Token from '../modules/Token'

const LoginPopup = {
    open: () => {
        return {
            type: 'OPEN_LOGIN_POPUP'
        }
    },

    close: () => {
        return {
            type: 'CLOSE_LOGIN_POPUP'
        }
    },

    toggleRegistration: (registration) => {
        return {
            type: 'REGISTRATION_TOGGLE',
            registration
        }
    },

    updateLoginInfo: (fieldName, fieldValue) => {
        return {
            type: 'UPDATE_LOGIN_INFO',
            fieldName,
            fieldValue
        }
    },

    updateRegisterInfo: (fieldName, fieldValue) => {
        return {
            type: 'UPDATE_REGISTER_INFO',
            fieldName,
            fieldValue
        }
    },

    resetRegister: () => {
        return {
            type: 'RESET_REGISTER'
        }
    },

    loginErrorWrongUserPassword: () => {
        return {
            type: 'LOGIN_ERROR_WRONG_USER_PASSWORD'
        }
    },

    registerErrorUserExists: () => {
        return {
            type: 'REGISTER_ERROR_WRONG_USER_PASSWORD'
        }
    }
}

export const login = (loginInfo) => {
    return (dispatch) => {
        Http.Post('api/account/login', loginInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done((data) => {
                switch (data.result) {
                    case 1:
                        Token.Save(data.token)
                        dispatch(loadCurrentUser(true))
                        dispatch(closeLoginPopup())
                        break

                    case 2:
                        dispatch(loginErrorWrongUserPassword())
                        dispatch(show(Labels.loginError))
                        break

                    default:
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}

export const register = (registerInfo) => {
    return (dispatch) => {
        Http.Post('api/account/register', registerInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done((data) => {
                switch (data.result) {
                    case 1:
                        Token.Save(data.token)
                        dispatch(loadCurrentUser(true))
                        dispatch(closeLoginPopup())
                        dispatch(toggleRegistration(false))
                        dispatch(LoginPopup.resetRegister())
                        break

                    case 2:
                        dispatch(registerErrorUserExists())
                        dispatch(show(Labels.registerError))
                        break

                    default:
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}

export const openLoginPopup = () => LoginPopup.open()

export const closeLoginPopup = () => LoginPopup.close()

export const toggleRegistration = (registration) => LoginPopup.toggleRegistration(registration)

export const updateLoginInfo = (fieldName, fieldValue) => LoginPopup.updateLoginInfo(fieldName, fieldValue)

export const updateRegisterInfo = (fieldName, fieldValue) => LoginPopup.updateRegisterInfo(fieldName, fieldValue)

export const loginErrorWrongUserPassword = () => LoginPopup.loginErrorWrongUserPassword()

export const registerErrorUserExists = () => LoginPopup.registerErrorUserExists()
