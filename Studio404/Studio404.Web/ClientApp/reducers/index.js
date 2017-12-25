import { combineReducers } from 'redux'
import account from './account'
import loginPopup from './loginPopup'
import userBookings from './userBookings'
import booking from './booking'
import message from './message'
import confirmDialog from './confirmDialog'
import phoneConfirmPopup from './phoneConfirmPopup'
import changePassPopup from './changePassPopup'
import info from './info'

const rootReducer = combineReducers({
    account,
    loginPopup,
    userBookings,
    booking,
    message,
    confirmDialog,
    phoneConfirmPopup,
    changePassPopup,
    info
})

export default rootReducer
