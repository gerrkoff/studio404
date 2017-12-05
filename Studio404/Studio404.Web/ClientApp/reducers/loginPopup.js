const fieldIsRequired = "This field is required"

const initialState = {
    open: false,
    registration: false,
    loginInfo: {
        username: "",
        usernameError: "",
        password: "",
        passwordError: "",
        isValid: false
    },
    registerInfo: {
        username: "",
        usernameError: fieldIsRequired,
        password: "",
        passwordError: fieldIsRequired,
        passwordConfirm: "",
        passwordConfirmError: fieldIsRequired,
        isValid: false
    },
}

const loginPopup = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {

        case "OPEN_LOGIN_POPUP":
            return {...state,
                open: true
            };

        case "CLOSE_LOGIN_POPUP":
            newState = {...state,
                open: false,
                loginInfo: {...state.loginInfo,
                    password: ""
                },
                registerInfo: {...state.registerInfo,
                    password: "",
                    passwordConfirm: ""
                }
            };

            newState.loginInfo.isValid = validateLoginInfo(newState.loginInfo);

            return newState;

        case "REGISTRATION_TOGGLE":
            return {...state,
                registration: action.registration
            };

        case "UPDATE_LOGIN_INFO":
            newState = updateField(state, "loginInfo", action.fieldName, action.fieldValue);
            validateLoginInfo(newState.loginInfo);
            return newState;

        case "UPDATE_REGISTER_INFO":
            newState = updateField(state, "registerInfo", action.fieldName, action.fieldValue);
            validateRegisterInfo(newState.registerInfo);
            return newState;

        case "RESET_REGISTER":
            return {...state,
                registerInfo: initialState.registerInfo
            };
        
        case "LOGIN_ERROR_WRONG_USER_PASSWORD":
            return {...state,
                loginInfo: {...state.loginInfo,
                    usernameError: "Wrong username...",
                    passwordError: "...or password"
                }
            };
        
        case "REGISTER_ERROR_WRONG_USER_PASSWORD":
            return {...state,
                registerInfo: {...state.registerInfo,
                    usernameError: "This username already registered"
                }
            };

        default:
            return state;
    }
}

const validateLoginInfo = (loginInfo) => {
    loginInfo.usernameError = "";
    loginInfo.passwordError = "";
    loginInfo.isValid = loginInfo.password !== "" && loginInfo.username !== "";
}

const validateRegisterInfo = (registerInfo) => {
    let isValid = true;

    if (registerInfo.username === "") {
        isValid = false;
        registerInfo.usernameError = fieldIsRequired;
    }
    else {
        registerInfo.usernameError = "";
    }

    if (registerInfo.password === "") {
        isValid = false;
        registerInfo.passwordError = fieldIsRequired;
    }
    else if (registerInfo.password.length < 5) {
        isValid = false;
        registerInfo.passwordError = "Password must be 5 length minimum";
    }
    else {
        registerInfo.passwordError = "";
    }

    if (registerInfo.passwordConfirm === "") {
        isValid = false;
        registerInfo.passwordConfirmError = fieldIsRequired;
    }
    else if (registerInfo.passwordConfirm !== registerInfo.password) {
        isValid = false;
        registerInfo.passwordConfirmError = "Passwords are not equal";
    }
    else {
        registerInfo.passwordConfirmError = "";
    }

    registerInfo.isValid = isValid;
}

const updateField = (state, formName, fieldName, fieldValue) => {
    return {...state,
        [formName]: {...state[formName],
            [fieldName]: fieldValue
        }
    };
}

export default loginPopup