import { Http, errorHandler } from '../modules/Http'

const Info = {
    infoLoaded: (info) => {
        return {
            type: 'INFO_LOADED',
            info
        }
    }
}

export const loadInfo = () => {
    return (dispatch) => {
        Http.Get('api/misc/info')
            .fail((data) => dispatch(errorHandler(data)))
            .done((info) => dispatch(Info.infoLoaded(info)))
    }
}
