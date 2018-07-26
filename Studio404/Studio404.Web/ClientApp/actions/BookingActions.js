import { Http, errorHandler } from '../modules/Http'
import { showAction } from './MessageActions'
import DateService from '../modules/DateService'
import Labels from '../modules/Labels'
import { ShowBookingHelp } from '../modules/Storage'
import HourCostService from '../modules/HourCostService'

const Booking = {
    changeWeekStartDate: (date) => {
        return {
            type: 'CHANGE_WEEK_START_DATE',
            date
        }
    },

    weekWorkloadLoading: () => {
        return {
            type: 'WEEK_WORKLOAD_LOADING'
        }
    },

    weekWorkloadLoadedSuccess: (weekWorkload) => {
        return {
            type: 'WEEK_WORKLOAD_LOADED_SUCCESS',
            weekWorkload
        }
    },

    weekWorkloadLoadedError: () => {
        return {
            type: 'WEEK_WORKLOAD_LOADED_ERROR'
        }
    },

    chooseDay: (date) => {
        return {
            type: 'CHOOSE_DATE',
            date
        }
    },

    dayHoursLoading: () => {
        return {
            type: 'DAY_HOURS_LOADING'
        }
    },

    dayHoursLoadedSuccess: (dayHours) => {
        return {
            type: 'DAY_HOURS_LOADED_SUCCESS',
            dayHours
        }
    },

    dayHoursLoadedError: () => {
        return {
            type: 'DAY_HOURS_LOADED_ERROR'
        }
    },

    updateHours: (hours, isValid, error) => {
        return {
            type: 'UPDATE_HOURS',
            hours,
            isValid,
            error
        }
    },

    bookingSaved: () => {
        return {
            type: 'BOOKING_SAVED'
        }
    },

    toggleHelp: (showHelp) => {
        return {
            type: 'BOOKING_TOGGLE_HELP',
            showHelp
        }
    },

    hoursCostLoading: () => {
        return {
            type: 'HOURS_COST_LOADING'
        }
    },

    hoursCostLoadedSuccess: (hoursCostIntervals) => {
        return {
            type: 'HOURS_COST_LOADED_SUCCESS',
            hoursCostIntervals: HourCostService.adjustHourCostIntervals(hoursCostIntervals)
        }
    },

    hoursCostLoadedError: () => {
        return {
            type: 'HOURS_COST_LOADED_ERROR'
        }
    }
}

export const loadWeekWorkload = (date) => {
    return (dispatch) => {
        dispatch(Booking.weekWorkloadLoading())
        Http.Get('api/booking/workload', {weekStartDate: date.toISOString()})
            .fail((data) => {
                dispatch(Booking.weekWorkloadLoadedError())
                dispatch(errorHandler(data))
            })
            .done(data => data.forEach(x => {
                x.date = new Date(x.date)
            }))
            .done(data => {
                data = data.map(x => {
                    return {
                        date: x.date,
                        title: DateService.toWeekdayWithDate(x.date),
                        labels: DateService.convertHoursToLabels(x.freeHours)
                    }
                })
                dispatch(Booking.weekWorkloadLoadedSuccess(data))
            })
    }
}

export const loadDayHours = (date) => {
    return (dispatch) => {
        dispatch(Booking.dayHoursLoading())
        Http.Get('api/booking/hours', {date: date.toISOString()})
            .fail((data) => {
                dispatch(Booking.dayHoursLoadedError())
                dispatch(errorHandler(data))
            })
            .done(data => {
                let dayHours = data.map(x => {
                    return {
                        value: x.hour,
                        title: DateService.convertHourToLabel(x.hour),
                        disabled: !x.available
                    }
                })
                dispatch(Booking.dayHoursLoadedSuccess(dayHours))
            })
    }
}

export const saveBooking = (date, hours, weekStartDate) => {
    return (dispatch) => {
        hours.sortNumbers()
        Http.Post('/api/booking/make', createBookingInfo(date, hours))
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(Booking.bookingSaved())
                dispatch(showAction(Labels.bookingSaved, Labels.pay, () => alert(123)))
                dispatch(loadWeekWorkload(weekStartDate))
            })
    }
}

export const loadHoursCost = (date, hours) => {
    return (dispatch) => {
        dispatch(Booking.hoursCostLoading())
        Http.Post('api/booking/cost', createBookingInfo(date, hours))
            .fail((data) => {
                dispatch(Booking.hoursCostLoadedError())
                dispatch(errorHandler(data))
            })
            .done(data => {
                dispatch(Booking.hoursCostLoadedSuccess(data))
            })
    }
}

export const changeWeekStartDate = (date) => {
    return (dispatch) => {
        dispatch(Booking.changeWeekStartDate(date))
        dispatch(loadWeekWorkload(date))
    }
}

export const chooseDay = (date) => {
    return (dispatch) => {
        dispatch(Booking.chooseDay(date))
        dispatch(loadDayHours(date))
        dispatch(updateHours(date, []))
    }
}

export const updateHours = (date, hours) => {
    return (dispatch) => {
        let validateResult = validateHours(hours)
        dispatch(Booking.updateHours(hours, validateResult.isValid, validateResult.error))

        if (validateResult.isValid) {
            dispatch(loadHoursCost(date, hours))
        }
    }
}

export const toggleHelp = (showHelp) => {
    ShowBookingHelp.Save(showHelp)
    return Booking.toggleHelp(showHelp)
}

function createBookingInfo (date, hours) {
    return {
        date: date.toISOString(),
        from: hours[0],
        to: hours[hours.length - 1]
    }
}

function validateHours (hours) {
    let isValid = true
    let error = ''

    if (hours.length === 0) {
        isValid = false
    }
    else if (hours.length > 1) {
        hours.sortNumbers()
        isValid = hours[hours.length - 1] - hours[0] === hours.length - 1
        error = !isValid ? Labels.bookingHoursIncorrectInput : ''
    }

    return { isValid, error }
}
