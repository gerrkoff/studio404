import AccountService from "../modules/AccountService";
import { Account } from "./ActionCreators";

export const loadCurrentUser = () => {
    return (dispatch) => {

        AccountService.GetCurrentUser()
            .done((currentUser) => {
                dispatch(Account.userLoaded(currentUser));
            });
    };
}
  
export const logoff = () => {
    return (dispatch) => {

        AccountService.Logoff()
            .done(() => {
                dispatch(loadCurrentUser());
            });
    };
}