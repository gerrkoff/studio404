const initialState = {
    open: false,
    registration: false,
    loginInfo: {
        username: "",
        password: "",
        isValid: false
    },
    registerInfo: {
        username: "",
        password: "",
        passwordConfirm: "",
        isValid: false
    },
}

const loginPopup = (state = initialState, action) => {
    switch (action.type) {

        case "OPEN_LOGIN_POPUP":
            return Object.assign({}, state, {
                open: true
            });

        case "CLOSE_LOGIN_POPUP":
            return Object.assign({}, state, {
                open: false
            });

        case "REGISTRATION_TOGGLE":
            return Object.assign({}, state, {
                registration: action.registration
            });

        case "UPDATE_LOGIN_INFO":
            return Object.assign({}, state, {
                loginInfo: Object.assign({}, state.loginInfo, {
                    [action.fieldName]: action.fieldValue
                })
            });

        case "UPDATE_REGISTER_INFO":
            return Object.assign({}, state, {
                registerInfo: Object.assign({}, state.registerInfo, {
                    [action.fieldName]: action.fieldValue
                })
            });

        default:
            return state;
    }
}
  
export default loginPopup