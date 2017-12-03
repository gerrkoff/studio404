import AccountService from "../modules/AccountService";

export const loadCurrentUser = () => {
    return (dispatch) => {
      AccountService.GetCurrentUser()
            .done((currentUser) => {
                dispatch(userLoaded(currentUser));
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

export const userLoaded = (currentUser) => {
    return {
      type: "CURRENT_USER_LOADED",
      currentUser
    }
  }