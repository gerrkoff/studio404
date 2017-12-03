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

export const login = (loginInfo) => {
    return (dispatch) => {
      AccountService.Login(loginInfo)
            .done(() => {
              dispatch(closeLoginPopup());
              dispatch(loadCurrentUser());
            });
    };
  }

export const register = (registerInfo) => {
  return (dispatch) => {
    AccountService.Register(registerInfo)
          .done(() => {
            dispatch(closeLoginPopup());
            dispatch(loadCurrentUser());
          });
  };
}

export const openLoginPopup = () => {
    return {
      type: "OPEN_LOGIN_POPUP"
    }
  }

export const closeLoginPopup = () => {
    return {
      type: "CLOSE_LOGIN_POPUP"
    }
  }

export const userLoaded = (currentUser) => {
    return {
      type: "CURRENT_USER_LOADED",
      currentUser
    }
  }