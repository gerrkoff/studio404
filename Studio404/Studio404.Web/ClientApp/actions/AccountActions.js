import AccountService from "../modules/AccountService";
import { Account, Message } from "./ActionCreators";

export const loadCurrentUser = (onLoadMessage) => {
    return (dispatch) => {

        AccountService.GetCurrentUser()
            .done((currentUser) => {
                dispatch(Account.userLoaded(currentUser));
                if(onLoadMessage)
                    dispatch(Message.show(onLoadMessage));
            });
    };
}
  
export const logoff = () => {
    return (dispatch) => {

        AccountService.Logoff()
            .done(() => {
                dispatch(Account.logoff());
                dispatch(Message.show("Logged out"));
            });
    };
}