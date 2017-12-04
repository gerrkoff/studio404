import UserService from "../modules/UserService";
import { UserBookings } from "./ActionCreators";

export const loadBookings = () => {
    return (dispatch) => {

        dispatch(UserBookings.loading());
        UserService.GetUserBookings()
            .done((bookings) => {
                dispatch(UserBookings.loadedSuccess(bookings));
            });
    };
}