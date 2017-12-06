import UserService from "../modules/UserService";
import { UserBookings } from "./ActionCreators";
import { show } from "./MessageActions";
import { errorHandler } from "../modules/Http";

export const loadBookings = () => {
    return (dispatch) => {

        dispatch(UserBookings.loading());
        UserService.GetUserBookings()
            .fail((data) => {
                dispatch(UserBookings.loadedError());
                dispatch(errorHandler(data));
            })
            .done((bookings) => {
                dispatch(UserBookings.loadedSuccess(bookings));
            });
    };
}

export const rejectBooking = (id) => {
    return show(`Booking ${id} rejected!`);
    /*
    return (dispatch) => {

        dispatch(UserBookings.loading());
        UserService.GetUserBookings()
            .fail((data) => {
                dispatch(UserBookings.loadedError());
                dispatch(errorHandler(data));
            })
            .done((bookings) => {
                dispatch(UserBookings.loadedSuccess(bookings));
            });
    };
    */
}