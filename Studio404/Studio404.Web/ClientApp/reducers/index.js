import { combineReducers } from 'redux'
import account from './account'
import loginPopup from "./loginPopup";
import userBookings from "./userBookings";
import booking from "./booking";
import message from "./message";
import confirmDialog from "./confirmDialog";

const rootReducer = combineReducers({
    account,
    loginPopup,
    userBookings,
    booking,
    message,
    confirmDialog
})

export default rootReducer