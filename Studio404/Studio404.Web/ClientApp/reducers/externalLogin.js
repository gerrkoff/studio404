const initialState = {
    processStage: 0
}

const externalLogin = (state = initialState, action) => {
    switch (action.type) {
        case 'EXT_LOGIN_PROCESSING':
            return {...state,
                processStage: 0
            }

        case 'EXT_LOGIN_PROCESS_SUCCESS':
            return {...state,
                processStage: 1
            }

        case 'EXT_LOGIN_PROCESS_NEED_REGISTRATION':
            return {...state,
                processStage: 2
            }

        case 'EXT_LOGIN_PROCESS_ERROR':
            return {...state,
                processStage: 3
            }

        default:
            return state
    }
}

export default externalLogin
