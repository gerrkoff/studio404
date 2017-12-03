import { combineReducers } from 'redux'
import account from './account'
import loginPopup from "./loginPopup";

const rootReducer = combineReducers({
    account,
    loginPopup
})

export default rootReducer