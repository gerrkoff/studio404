import Labels from '../modules/Labels'

const initialState = {
    open: false,
    registration: false,
    loginInfo: {
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
        isValid: false
    },
    registerInfo: {
        username: '',
        usernameError: Labels.fieldIsRequired,
        password: '',
        passwordError: Labels.fieldIsRequired,
        passwordConfirm: '',
        passwordConfirmError: Labels.fieldIsRequired,
        isValid: false
    }
}

const loginPopup = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case 'OPEN_LOGIN_POPUP':
            return {...state,
                open: true
            }

        case 'CLOSE_LOGIN_POPUP':
            newState = {...state,
                open: false,
                loginInfo: {...state.loginInfo,
                    password: ''
                },
                registerInfo: {...state.registerInfo,
                    password: '',
                    passwordConfirm: ''
                }
            }
            newState.loginInfo.isValid = validateLoginInfo(newState.loginInfo)
            return newState

        case 'REGISTRATION_TOGGLE':
            return {...state,
                registration: action.registration
            }

        case 'UPDATE_LOGIN_INFO':
            newState = updateField(state, 'loginInfo', action.fieldName, action.fieldValue)
            validateLoginInfo(newState.loginInfo)
            return newState

        case 'UPDATE_REGISTER_INFO':
            newState = updateField(state, 'registerInfo', action.fieldName, action.fieldValue)
            validateRegisterInfo(newState.registerInfo)
            return newState

        case 'RESET_REGISTER':
            return {...state,
                registerInfo: initialState.registerInfo
            }

        case 'LOGIN_ERROR_WRONG_USER_PASSWORD':
            return {...state,
                loginInfo: {...state.loginInfo,
                    usernameError: Labels.loginWrongUser,
                    passwordError: Labels.loginWrongPass
                }
            }

        case 'REGISTER_ERROR_WRONG_USER_PASSWORD':
            return {...state,
                registerInfo: {...state.registerInfo,
                    usernameError: Labels.userAlreadyRegistered
                }
            }

        default:
            return state
    }
}

const validateLoginInfo = (loginInfo) => {
    loginInfo.usernameError = ''
    loginInfo.passwordError = ''
    loginInfo.isValid = loginInfo.password !== '' && loginInfo.username !== ''
}

const validateRegisterInfo = (registerInfo) => {
    let isValid = true

    if (registerInfo.username === '') {
        isValid = false
        registerInfo.usernameError = Labels.fieldIsRequired
    }
    else if (registerInfo.username.length > 30 || /[^a-zA-Z0-9_]/.test(registerInfo.username)) {
        isValid = false
        registerInfo.usernameError = Labels.usernameCreateRule
    }
    else {
        registerInfo.usernameError = ''
    }

    if (registerInfo.password === '') {
        isValid = false
        registerInfo.passwordError = Labels.fieldIsRequired
    }
    else if (registerInfo.password.length < 5) {
        isValid = false
        registerInfo.passwordError = Labels.passwordCreateRule
    }
    else {
        registerInfo.passwordError = ''
    }

    if (registerInfo.passwordConfirm === '') {
        isValid = false
        registerInfo.passwordConfirmError = Labels.fieldIsRequired
    }
    else if (registerInfo.passwordConfirm !== registerInfo.password) {
        isValid = false
        registerInfo.passwordConfirmError = Labels.passwordConfirmFail
    }
    else {
        registerInfo.passwordConfirmError = ''
    }

    registerInfo.isValid = isValid
}

const updateField = (state, formName, fieldName, fieldValue) => {
    return {...state,
        [formName]: {...state[formName],
            [fieldName]: fieldValue
        }
    }
}

export default loginPopup
