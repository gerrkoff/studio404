import AccountService from "../modules/AccountService";
import { Account, Message } from "./ActionCreators";
import { errorHandler } from "../modules/Http";

export const loadCurrentUser = (onLoadMessage) => {
    return (dispatch) => {

        AccountService.GetCurrentUser()
            .fail((data) => dispatch(errorHandler(data)))
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
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(Account.logoff());
                dispatch(Message.show("Logged out"));
            });
    };
}