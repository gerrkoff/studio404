import { Http, errorHandler } from '../modules/Http'
import { showDefaultError } from './MessageActions'
import { Token } from '../modules/Storage'
import { loadCurrentUser } from './AccountActions'

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

    processSuccess: () => {
        return {
            type: 'EXT_LOGIN_PROCESS_SUCCESS'
        }
    }
}

export const externalLoginProcess = (history, returnUrl) => {
    return (dispatch) => {
        dispatch(ExternalLogin.processing())
        Http.Post('api/external/process')
            .fail((data) => {
                dispatch(ExternalLogin.processError())
                dispatch(errorHandler(data))
            })
            .done(data => {
                switch (data.result) {
                    case 1:
                        dispatch(ExternalLogin.processSuccess())
                        Token.Save(data.token)
                        dispatch(loadCurrentUser(true))
                        history.push(returnUrl)
                        break

                    default:
                        dispatch(ExternalLogin.processError())
                        dispatch(showDefaultError())
                        break
                }
            })
    }
}
