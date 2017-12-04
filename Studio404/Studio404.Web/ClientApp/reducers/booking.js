import DateService from "../modules/DateService";

const initialState = {
    weekStartDate: DateService.getMonday(new Date()),
    weekWorkloadIsLoading: false,
    weekWorkload: [],
    weekWorkloadError: false,
    chosenDate: null,
    dayHoursIsLoading: false,
    dayHours: [],
    dayHoursError: false,
    bookingHours: [],
    bookingHoursError: "",
    bookingIsValid: false
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
                dayHoursIsLoading: true,
                dayHoursError: false
            });

        case "DAY_HOURS_LOADED_SUCCESS":
            return Object.assign({}, state, {
                dayHoursIsLoading: false,
                dayHours: action.dayHours
            });

        case "DAY_HOURS_LOADED_ERROR":
            return Object.assign({}, state, {
                dayHoursIsLoading: false,
                dayHoursError: true
            });

        case "UPDATE_HOURS":
            let isValid = validateHours(action.hours);
            let error = !isValid ? "Incorrect input" : "";
            
            return Object.assign({}, state, {
                bookingHours: action.hours,
                bookingHoursError: error,
                bookingIsValid: isValid
            });
        
        case "BOOKING_SAVED":
            return Object.assign({}, state, {
                chosenDate: null,
                bookingHours: [],
                bookingHoursError: "",
                bookingIsValid: false
            });

        default:
            return state;
    }
}

const validateHours = (hours) => {
    if(hours.length < 2) return true;
    hours.sortNumbers();
    return hours[hours.length-1] - hours[0] === hours.length - 1;
}

export default booking