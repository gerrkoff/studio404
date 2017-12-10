import { Http, errorHandler } from "../modules/Http";
import { show } from "./MessageActions";
import DateService from "../modules/DateService";

const Booking = {
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

export const loadWeekWorkload = (date) => {
    return (dispatch) => {

        dispatch(Booking.weekWorkloadLoading());
        Http.Get("api/booking/workload", {weekStartDate: date.toISOString()})
            .fail((data) => {
                dispatch(Booking.weekWorkloadLoadedError());
                dispatch(errorHandler(data));
            })
            .done(data => data.forEach(x => x.date = new Date(x.date)))
            .done(data => {
                data = data.map(x => {
                    return {
                        date: x.date,
                        title: DateService.getDayOfWeekLabel(x.date),
                        labels: DateService.convertHoursToLabels(x.freeHours)
                    }
                });
                dispatch(Booking.weekWorkloadLoadedSuccess(data));
            });
    };
}

export const loadDayHours = (date) => {
    return (dispatch) => {

        dispatch(Booking.dayHoursLoading());
        Http.Get("api/booking/hours", {date: date.toISOString()})
            .fail((data) => {
                dispatch(Booking.dayHoursLoadedError());
                dispatch(errorHandler(data))
            })
            .done(data => {
                let dayHours = data.map(x => {
                    return {
                        value: x.hour,
                        title: DateService.convertHourToLabel(x.hour),
                        disabled: !x.available
                    };
                });
                dispatch(Booking.dayHoursLoadedSuccess(dayHours));
            });
    };
}

export const saveBooking = (date, hours, weekStartDate) => {
    return (dispatch) => {
        
        hours.sortNumbers();
        Http.Post("/api/booking/make", {
                    date: date.toISOString(),
                    from: hours[0],
                    to: hours[hours.length-1]
                })
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(Booking.bookingSaved());
                dispatch(show("Booking saved successfully!"));
                dispatch(loadWeekWorkload(weekStartDate));
            });
    };
}

export const changeWeekStartDate = (date) => {
    return (dispatch) => {
        
        dispatch(Booking.changeWeekStartDate(date));
        dispatch(loadWeekWorkload(date));
    }
}

export const chooseDay = (date) => {
    return (dispatch) => {
        
        dispatch(Booking.chooseDay(date));
        dispatch(loadDayHours(date));
        dispatch(updateHours([]));
    }
}

export const updateHours = (hours) => Booking.updateHours(hours);