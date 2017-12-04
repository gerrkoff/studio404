import { combineReducers } from 'redux'
import account from './account'
import loginPopup from "./loginPopup";
import userBookings from "./userBookings";
import booking from "./booking";

const rootReducer = combineReducers({
    account,
    loginPopup,
    userBookings,
    booking
})

export default rootReducer