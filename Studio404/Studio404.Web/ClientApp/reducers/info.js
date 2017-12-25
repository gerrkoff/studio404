const initialState = {
    infoLoaded: false,
    version: ''
}

const info = (state = initialState, action) => {
    switch (action.type) {
        case 'INFO_LOADED':
            return {...state,
                ...action.info,
                infoLoaded: true
            }

        default:
            return state
    }
}

export default info
