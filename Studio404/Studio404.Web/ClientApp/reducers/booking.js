const initialState = {
    weekStartDate: new Date(),
    weekWorkloadIsLoading: false,
    weekWorkload: [],
    weekWorkloadError: false,
    chosenDate: null,
    bookingInfo: {
        dayHours: [],
        dayHoursIsLoading: false,
        dayHoursError: false,
        isValid: true,
        hours: [],
        hoursError: ""
    }
}

const booking = (state = initialState, action) => {
    switch (action.type) {

        case "CHANGE_WEEK_START_DATE":
            return Object.assign({}, state, {
                weekStartDate: action.date
            });

        case "WEEK_WORKLOAD_LOADING":
            return Object.assign({}, state, {
                weekWorkloadIsLoading: true,
                weekWorkloadError: false
            });

        case "WEEK_WORKLOAD_LOADED_SUCCESS":
            return Object.assign({}, state, {
                weekWorkloadIsLoading: false,
                weekWorkload: action.weekWorkload
            });

        case "WEEK_WORKLOAD_LOADED_ERROR":
            return Object.assign({}, state, {
                weekWorkloadIsLoading: false,
                weekWorkloadError: true
            });

        case "CHOOSE_DATE":
            return Object.assign({}, state, {
                chosenDate: action.date
            });

        case "DAY_HOURS_LOADING":
            return Object.assign({}, state, {
                bookingInfo: Object.assign({}, state.bookingInfo, {
                    dayHoursIsLoading: true,
                    dayHoursError: false
                })
            });

        case "DAY_HOURS_LOADED_SUCCESS":
            return Object.assign({}, state, {
                bookingInfo: Object.assign({}, state.bookingInfo, {
                    dayHoursIsLoading: false,
                    dayHours: action.dayHours
                })
            });

        case "DAY_HOURS_LOADED_ERROR":
            return Object.assign({}, state, {
                bookingInfo: Object.assign({}, state.bookingInfo, {
                    dayHoursIsLoading: false,
                    dayHoursError: true
                })
            });

        case "UPDATE_HOURS":
            return Object.assign({}, state, {
                bookingInfo: Object.assign({}, state.bookingInfo, {
                    hours: action.hours
                })
            });

        default:
            return state;
    }
}
  
export default booking