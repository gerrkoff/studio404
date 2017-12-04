export const Account = {
    userLoaded: (currentUser) => {
        return {
            type: "CURRENT_USER_LOADED",
            currentUser
        }
    }
}

export const LoginPopup = {
    open: () => {
        return {
            type: "OPEN_LOGIN_POPUP"
        }
    },

    close: () => {
        return {
            type: "CLOSE_LOGIN_POPUP"
        }
    },

    toggleRegistration: (registration) => {
        return {
            type: "REGISTRATION_TOGGLE",
            registration
        }
    },

    updateLoginInfo: (fieldName, fieldValue) => {
        return {
            type: "UPDATE_LOGIN_INFO",
            fieldName,
            fieldValue
        }
    },

    updateRegisterInfo: (fieldName, fieldValue) => {
        return {
            type: "UPDATE_REGISTER_INFO",
            fieldName,
            fieldValue
        }
    }
}