import BookingService from "../modules/BookingService";
import DateService from "../modules/DateService";
import { Booking } from "./ActionCreators";

export const loadWeekWorkload = (date) => {
    return (dispatch) => {

        dispatch(Booking.weekWorkloadLoading());
        BookingService.GetWeekWorkload(date)
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
        BookingService.GetDayWorkload(date)
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
        BookingService.MakeBooking(date, hours[0], hours[hours.length-1])
            .done(() => {
                dispatch(Booking.bookingSaved());
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

export const chooseDay = (date) => Booking.chooseDay(date);

export const updateHours = (hours) => Booking.updateHours(hours);