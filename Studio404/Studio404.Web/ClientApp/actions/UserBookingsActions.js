import UserService from "../modules/UserService";
import BookingService from "../modules/BookingService";
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

export const cancelBooking = (id) => {
    return (dispatch) => {

        BookingService.CancelBooking(id)
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(show(`Booking canceled!`));
                dispatch(loadBookings());
            });
    };
}