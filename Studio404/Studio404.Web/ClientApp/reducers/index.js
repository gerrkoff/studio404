import { combineReducers } from 'redux'
import account from './account'
import loginPopup from "./loginPopup";
import userBookings from "./userBookings";

const rootReducer = combineReducers({
    account,
    loginPopup,
    userBookings
})

export default rootReducer