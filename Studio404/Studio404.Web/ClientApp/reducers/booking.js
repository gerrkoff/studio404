import DateService from '../modules/DateService'
import { ShowBookingHelp } from '../modules/Storage'

const showBookingHelp = ShowBookingHelp.Load()

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
    bookingHoursError: '',
    bookingIsValid: false,
    showHelp: showBookingHelp === null || showBookingHelp === 'true',
    hoursCostIsLoading: false,
    hoursCost: '',
    hoursCostIntervals: [],
    hoursCostError: false
}

const booking = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_WEEK_START_DATE':
            return {...state,
                weekStartDate: action.date
            }

        case 'WEEK_WORKLOAD_LOADING':
            return {...state,
                weekWorkloadIsLoading: true,
                weekWorkloadError: false
            }

        case 'WEEK_WORKLOAD_LOADED_SUCCESS':
            return {...state,
                weekWorkloadIsLoading: false,
                weekWorkload: action.weekWorkload
            }

        case 'WEEK_WORKLOAD_LOADED_ERROR':
            return {...state,
                weekWorkloadIsLoading: false,
                weekWorkloadError: true
            }

        case 'CHOOSE_DATE':
            return {...state,
                chosenDate: action.date
            }

        case 'DAY_HOURS_LOADING':
            return {...state,
                dayHoursIsLoading: true,
                dayHoursError: false
            }

        case 'DAY_HOURS_LOADED_SUCCESS':
            return {...state,
                dayHoursIsLoading: false,
                dayHours: action.dayHours
            }

        case 'DAY_HOURS_LOADED_ERROR':
            return {...state,
                dayHoursIsLoading: false,
                dayHoursError: true
            }

        case 'UPDATE_HOURS':
            return {...state,
                bookingHours: action.hours,
                bookingHoursError: action.error,
                bookingIsValid: action.isValid
            }

        case 'BOOKING_SAVED':
            return {...state,
                chosenDate: null,
                bookingHours: [],
                bookingHoursError: '',
                bookingIsValid: false
            }

        case 'BOOKING_TOGGLE_HELP':
            return {...state,
                showHelp: action.showHelp
            }

        case 'HOURS_COST_LOADING':
            return {
                ...state,
                hoursCostIsLoading: true,
                hoursCostError: false
            }

        case 'HOURS_COST_LOADED_SUCCESS':
            return {
                ...state,
                hoursCostIsLoading: false,
                hoursCost: action.hoursCostIntervals.totalCost,
                hoursCostIntervals: action.hoursCostIntervals.intervalCosts
            }

        case 'HOURS_COST_LOADED_ERROR':
            return {
                ...state,
                hoursCostIsLoading: false,
                hoursCostError: true
            }

        default:
            return state
    }
}

export default booking
