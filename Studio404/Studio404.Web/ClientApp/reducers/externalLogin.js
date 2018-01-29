import Labels from '../modules/Labels'

const initialState = {
    processStage: 0,
    username: '',
    usernameInvalid: false,
    usernameError: '',
    registerLoading: false,
    registerError: false,
    providerName: ''
}

const externalLogin = (state = initialState, action) => {
    switch (action.type) {
        case 'EXT_LOGIN_PROCESSING':
            return {...state,
                processStage: 0
            }

        case 'EXT_LOGIN_PROCESS_NEED_REGISTRATION':
            return {...state,
                processStage: 1,
                providerName: action.provider
            }

        case 'EXT_LOGIN_PROCESS_ERROR':
            return {...state,
                processStage: 2
            }

        case 'EXT_LOGIN_REGISTER_LOADING':
            return {...state,
                registerLoading: true,
                registerError: false
            }

        case 'EXT_LOGIN_REGISTER_ERROR':
            return {...state,
                registerLoading: false,
                registerError: true
            }

        case 'EXT_LOGIN_REGISTER_USERNAME_ALREADY_EXISTS':
            return {...state,
                registerLoading: false,
                registerError: false,
                usernameError: Labels.userAlreadyRegistered,
                usernameInvalid: true
            }

        case 'EXT_LOGIN_UPDATE_USERNAME':
            return {...state,
                username: action.username,
                usernameInvalid: action.invalid,
                usernameError: action.error
            }

        default:
            return state
    }
}

export default externalLogin
