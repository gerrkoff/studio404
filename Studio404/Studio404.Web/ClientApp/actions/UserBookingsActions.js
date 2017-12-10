import { Http, errorHandler } from "../modules/Http";
import { show } from "./MessageActions";

const UserBookings = {
    loading: () => {
        return {
            type: "USER_BOOKINGS_LOADING"
        }
    },

    loadedSuccess: (bookings) => {
        return {
            type: "USER_BOOKINGS_LOADED_SUCCESS",
            bookings
        }
    },

    loadedError: () => {
        return {
            type: "USER_BOOKINGS_LOADED_ERROR"
        }
    }
}

export const loadBookings = () => {
    return (dispatch) => {

        dispatch(UserBookings.loading());
        Http.Get("api/user/bookings")
            .fail((data) => {
                dispatch(UserBookings.loadedError());
                dispatch(errorHandler(data));
            })
            .done(data => data.forEach(x => x.date = new Date(x.date)))
            .done((bookings) => {
                dispatch(UserBookings.loadedSuccess(bookings));
            });
    };
}

export const cancelBooking = (id) => {
    return (dispatch) => {

        Http.Post("/api/booking/cancel", { id })
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(show(`Booking canceled!`));
                dispatch(loadBookings());
            });
    };
}