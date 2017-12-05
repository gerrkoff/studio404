import UserService from "../modules/UserService";
import { UserBookings } from "./ActionCreators";
import { errorHandler } from "../modules/Http";

export const loadBookings = () => {
    return (dispatch) => {

        dispatch(UserBookings.loading());
        UserService.GetUserBookings()
            .fail((data) => dispatch(errorHandler(data)))
            .done((bookings) => {
                dispatch(UserBookings.loadedSuccess(bookings));
            });
    };
}