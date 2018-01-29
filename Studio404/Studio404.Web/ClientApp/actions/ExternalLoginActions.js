import { Http, errorHandler } from '../modules/Http'
import { showDefaultError } from './MessageActions'
import { Token } from '../modules/Storage'
import { loadCurrentUser } from './AccountActions'
import Labels from '../modules/Labels'

const ExternalLogin = {
    processing: () => {
        return {
            type: 'EXT_LOGIN_PROCESSING'
        }
    },

    processError: () => {
        return {
            type: 'EXT_LOGIN_PROCESS_ERROR'
        }
    },

    processNeedRegistration: (provider) => {
        return {
            type: 'EXT_LOGIN_PROCESS_NEED_REGISTRATION',
            provider
        }
    },

    registerLoading: () => {
        return {
            type: 'EXT_LOGIN_REGISTER_LOADING'
        }
    },

    registerError: () => {
        return {
            type: 'EXT_LOGIN_REGISTER_ERROR'
        }
    },

    registerUsernameAlreadyExists: () => {
        return {
            type: 'EXT_LOGIN_REGISTER_USERNAME_ALREADY_EXISTS'
        }
    },

    updateUsername: (username, invalid, error) => {
        return {
            type: 'EXT_LOGIN_UPDATE_USERNAME',
            username,
            invalid,
            error
        }
    }
}

export const externalLoginProcess = (history) => {
    return (dispatch) => {
        dispatch(ExternalLogin.processing())
        Http.Post('external/process')
            .fail((data) => {
                dispatch(ExternalLogin.processError())
                dispatch(errorHandler(data))
            })
            .done(data => {
                switch (data.result) {
                    case 1:
                        userLoggedIn(dispatch, data, history)
                        break

                    case 2:
                        dispatch(ExternalLogin.processNeedRegistration(data.provider))
                        break

                    default:
                        dispatch(ExternalLogin.processError())
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}

export const externalLoginRegister = (username, history) => {
    return (dispatch) => {
        dispatch(ExternalLogin.registerLoading())
        Http.Post('external/register', { username: username })
            .fail((data) => {
                dispatch(ExternalLogin.registerError())
                dispatch(errorHandler(data))
            })
            .done(data => {
                switch (data.result) {
                    case 1:
                        userLoggedIn(dispatch, data, history)
                        break

                    case 2:
                        dispatch(ExternalLogin.registerUsernameAlreadyExists())
                        break

                    default:
                        dispatch(ExternalLogin.registerError())
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}

export const updateUsername = (username) => {
    return (dispatch) => {
        let validationResult = validateUsername(username)
        dispatch(ExternalLogin.updateUsername(username, validationResult.invalid, validationResult.error))
    }
}

function validateUsername (username) {
    let result = {
        invalid: false,
        error: ''
    }

    if (username === '') {
        result.invalid = true
        result.error = Labels.fieldIsRequired
    }
    else if (username.length > 30 || /[^a-zA-Z0-9_]/.test(username)) {
        result.invalid = true
        result.error = Labels.usernameCreateRule
    }
    else {
        result.error = ''
    }

    return result
}

function userLoggedIn (dispatch, data, history) {
    Token.Save(data.token)
    dispatch(loadCurrentUser(true))
    history.push('/')
}
