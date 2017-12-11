const initialState = {
    userLoggedIn: false,
    username: "",
    phoneConfirmed: false
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case "CURRENT_USER_LOADED":
            return {...state,
                userLoggedIn: action.currentUser.userLoggedIn,
                username: action.currentUser.username,
                phoneConfirmed: action.currentUser.phoneConfirmed,
            };

        case "CURRENT_USER_LOGOFF":
            return initialState;

        default:
            return state;
    }
}
  
export default account