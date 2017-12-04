import { combineReducers } from 'redux'
import account from './account'
import loginPopup from "./loginPopup";
import userBookings from "./userBookings";
import booking from "./booking";
import message from "./message";

const rootReducer = combineReducers({
    account,
    loginPopup,
    userBookings,
    booking,
    message
})

export default rootReducer