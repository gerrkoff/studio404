export const Account = {
    userLoaded: (currentUser) => {
        return {
            type: "CURRENT_USER_LOADED",
            currentUser
        }
    },

    logoff: () => {
        return {
            type: "LOGOFF"
        }
    }
}

export const Message = {
    show: (text) => {
        return {
            type: "MESSAGE_SHOW",
            text
        }
    },

    hide: () => {
        return {
            type: "MESSAGE_HIDE"
        }
    },
}

export const ConfirmDialog = {
    show: (text, actionText, action) => {
        return {
            type: "CONFIRM_SHOW",
            text,
            actionText,
            action
        }
    },

    hide: () => {
        return {
            type: "CONFIRM_HIDE"
        }
    },
}

export const UserBookings = {
    loading: () => {
        return {
            type: "LOADING"
        }
    },

    loadedSuccess: (bookings) => {
        return {
            type: "LOADED_SUCCESS",
            bookings
        }
    },

    loadedError: () => {
        return {
            type: "LOADED_ERROR"
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
    },

    resetRegister: () => {
        return {
            type: "RESET_REGISTER"
        }
    },

    loginErrorWrongUserPassword: () => {
        return {
            type: "LOGIN_ERROR_WRONG_USER_PASSWORD"
        }
    },

    registerErrorUserExists: () => {
        return {
            type: "REGISTER_ERROR_WRONG_USER_PASSWORD"
        }
    }
}

export const Booking = {
    changeWeekStartDate: (date) => {
        return {
            type: "CHANGE_WEEK_START_DATE",
            date
        }
    },

    weekWorkloadLoading: () => {
        return {
            type: "WEEK_WORKLOAD_LOADING"
        }
    },

    weekWorkloadLoadedSuccess: (weekWorkload) => {
        return {
            type: "WEEK_WORKLOAD_LOADED_SUCCESS",
            weekWorkload
        }
    },

    weekWorkloadLoadedError: () => {
        return {
            type: "WEEK_WORKLOAD_LOADED_ERROR"
        }
    },

    chooseDay: (date) => {
        return {
            type: "CHOOSE_DATE",
            date
        }
    },

    dayHoursLoading: () => {
        return {
            type: "DAY_HOURS_LOADING"
        }
    },

    dayHoursLoadedSuccess: (dayHours) => {
        return {
            type: "DAY_HOURS_LOADED_SUCCESS",
            dayHours
        }
    },

    dayHoursLoadedError: () => {
        return {
            type: "DAY_HOURS_LOADED_ERROR"
        }
    },

    updateHours: (hours) => {
        return {
            type: "UPDATE_HOURS",
            hours
        }
    },

    bookingSaved: () => {
        return {
            type: "BOOKING_SAVED"
        }
    }
}

export const ConfirmPhonePopup = {
    open: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_OPEN"
        }
    },

    close: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_CLOSE"
        }
    },

    updatePhone: (phone) => {
        return {
            type: "PHONE_CONFIRM_POPUP_UPDATE_PHONE",
            phone
        }
    },

    updateCode: (code) => {
        return {
            type: "PHONE_CONFIRM_POPUP_UPDATE_CODE",
            code
        }
    },

    sendLoading: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_SEND_CODE_LOADING"
        }
    },

    sendSuccess: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_SEND_CODE_SUCCESS"
        }
    },

    sendError: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_SEND_CODE_ERROR"
        }
    },

    confirmLoading: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_SEND_CONFIRM_LOADING"
        }
    },

    confirmSuccess: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_SEND_CONFIRM_SUCCESS"
        }
    },

    confirmError: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_SEND_CONFIRM_ERROR"
        }
    },

    invalidPhone: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_INVALID_PHONE"
        }
    },

    invalidCode: () => {
        return {
            type: "PHONE_CONFIRM_POPUP_INVALID_CODE"
        }
    }
}