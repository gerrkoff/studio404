const initialState = {
    userLoggedIn: false,
    username: '',
    phoneConfirmed: false,
    phone: ''
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case 'CURRENT_USER_LOADED':
            return {...state, ...action.currentUser}

        case 'CURRENT_USER_LOGOFF':
            return initialState

        default:
            return state
    }
}

export default account
