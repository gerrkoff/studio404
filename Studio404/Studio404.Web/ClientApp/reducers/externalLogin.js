const initialState = {
    loading: true,
    error: false
}

const externalLogin = (state = initialState, action) => {
    switch (action.type) {
        case 'EXT_LOGIN_PROCESSING':
            return {...state,
                loading: true,
                error: false
            }

        case 'EXT_LOGIN_PROCESS_SUCCESS':
            return {...state,
                loading: false,
                error: false
            }

        case 'EXT_LOGIN_PROCESS_ERROR':
            return {...state,
                loading: false,
                error: true
            }

        default:
            return state
    }
}

export default externalLogin
