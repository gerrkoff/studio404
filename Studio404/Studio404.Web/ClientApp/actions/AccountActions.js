import { Http, errorHandler } from "../modules/Http";
import { show } from "./MessageActions";
import Labels from "../modules/Labels";

const Account = {
    userLoaded: (currentUser) => {
        return {
            type: "CURRENT_USER_LOADED",
            currentUser
        }
    },

    logoff: () => {
        return {
            type: "CURRENT_USER_LOGOFF"
        }
    }
}

export const loadCurrentUser = (showWelcomeMessage) => {
    return (dispatch) => {

        Http.Get("api/account/current")
            .fail((data) => dispatch(errorHandler(data)))
            .done((currentUser) => {
                dispatch(Account.userLoaded(currentUser));

                if(showWelcomeMessage && currentUser.userLoggedIn)
                    dispatch(show(Labels.welcome(currentUser.username)));
            });
    };
}
  
export const logoff = () => {
    return (dispatch) => {

        Http.Post("api/account/logoff")
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(Account.logoff());
                dispatch(show(Labels.logout));
            });
    };
}