import { combineReducers } from 'redux'
import account from './account'
import loginPopup from './loginPopup'
import userBookings from './userBookings'
import booking from './booking'
import message from './message'
import confirmDialog from './confirmDialog'
import phoneConfirmPopup from './phoneConfirmPopup'
import changePassPopup from './changePassPopup'

const rootReducer = combineReducers({
    account,
    loginPopup,
    userBookings,
    booking,
    message,
    confirmDialog,
    phoneConfirmPopup,
    changePassPopup
})

export default rootReducer
