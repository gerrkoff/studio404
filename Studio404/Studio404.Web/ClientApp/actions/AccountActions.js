import AccountService from "../modules/AccountService";
import { Account, Message } from "./ActionCreators";
import { errorHandler } from "../modules/Http";

export const loadCurrentUser = (showWelcomeMessage) => {
    return (dispatch) => {

        AccountService.GetCurrentUser()
            .fail((data) => dispatch(errorHandler(data)))
            .done((currentUser) => {
                dispatch(Account.userLoaded(currentUser));

                if(showWelcomeMessage && currentUser.userLoggedIn)
                    dispatch(Message.show(`Welcome, ${currentUser.username}!`));
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