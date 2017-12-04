import AccountService from "../modules/AccountService";
import { loadCurrentUser } from "./AccountActions";

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

export const toggleRegistration = (registration) => {
    return {
      type: "REGISTRATION_TOGGLE",
      registration
    }
  }

export const updateLoginInfo = (fieldName, fieldValue) => {
    return {
      type: "UPDATE_LOGIN_INFO",
      fieldName,
      fieldValue
    }
  }