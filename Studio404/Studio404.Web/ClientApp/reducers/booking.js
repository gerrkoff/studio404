import DateService from "../modules/DateService";
import Labels from "../modules/Labels";

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
            return {...state,
                weekStartDate: action.date
            };

        case "WEEK_WORKLOAD_LOADING":
            return {...state,
                weekWorkloadIsLoading: true,
                weekWorkloadError: false
            };

        case "WEEK_WORKLOAD_LOADED_SUCCESS":
            return {...state,
                weekWorkloadIsLoading: false,
                weekWorkload: action.weekWorkload
            };

        case "WEEK_WORKLOAD_LOADED_ERROR":
            return {...state,
                weekWorkloadIsLoading: false,
                weekWorkloadError: true
            };

        case "CHOOSE_DATE":
            return {...state,
                chosenDate: action.date
            };

        case "DAY_HOURS_LOADING":
            return {...state,
                dayHoursIsLoading: true,
                dayHoursError: false
            };

        case "DAY_HOURS_LOADED_SUCCESS":
            return {...state,
                dayHoursIsLoading: false,
                dayHours: action.dayHours
            };

        case "DAY_HOURS_LOADED_ERROR":
            return {...state,
                dayHoursIsLoading: false,
                dayHoursError: true
            };

        case "UPDATE_HOURS":
            let validRes = validateHours(action.hours);
            return {...state,
                bookingHours: action.hours,
                bookingHoursError: validRes.error,
                bookingIsValid: validRes.isValid
            };
        
        case "BOOKING_SAVED":
            return {...state,
                chosenDate: null,
                bookingHours: [],
                bookingHoursError: "",
                bookingIsValid: false
            };

        default:
            return state;
    }
}

const validateHours = (hours) => {
    let isValid = true;
    let error = "";

    if(hours.length === 0) {
        isValid = false;
    }
    else if(hours.length > 1) {
        hours.sortNumbers();
        isValid = hours[hours.length-1] - hours[0] === hours.length - 1;
        error = !isValid ? Labels.bookingHoursIncorrectInput : "";
    }

    return { isValid, error };
}

export default booking