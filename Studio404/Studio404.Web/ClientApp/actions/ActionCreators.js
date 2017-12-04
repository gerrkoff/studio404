export const Account = {
    userLoaded: (currentUser) => {
        return {
            type: "CURRENT_USER_LOADED",
            currentUser
        }
    }
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