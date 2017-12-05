import AccountService from "../modules/AccountService";
import { LoginPopup } from "./ActionCreators";
import { loadCurrentUser } from "./AccountActions";
import { showDefaultError, show } from "./MessageActions";
import { errorHandler } from "../modules/Http";

export const login = (loginInfo) => {
    return (dispatch) => {

        AccountService.Login(loginInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(closeLoginPopup());
                        dispatch(loadCurrentUser("Logged in"));
                        break;
                
                    case 2:
                        dispatch(loginErrorWrongUserPassword());
                        dispatch(show("Login error"));
                        break;

                    default:
                        dispatch(showDefaultError());
                        break;
                }
            });
    };
}

export const register = (registerInfo) => {
    return (dispatch) => {

        AccountService.Register(registerInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(toggleRegistration(false));
                        dispatch(LoginPopup.resetRegister());
                        dispatch(closeLoginPopup());
                        dispatch(loadCurrentUser("Registered"));
                        break;
                
                    case 2:
                        dispatch(registerErrorUserExists());
                        dispatch(show("Register login"));
                        break;

                    default:
                        dispatch(showDefaultError());
                        break;
                }
            });
    };
}

export const openLoginPopup = () => LoginPopup.open();

export const closeLoginPopup = () => LoginPopup.close();

export const toggleRegistration = (registration) => LoginPopup.toggleRegistration(registration);

export const updateLoginInfo = (fieldName, fieldValue) => LoginPopup.updateLoginInfo(fieldName, fieldValue);

export const updateRegisterInfo = (fieldName, fieldValue) => LoginPopup.updateRegisterInfo(fieldName, fieldValue);

export const loginErrorWrongUserPassword = () => LoginPopup.loginErrorWrongUserPassword();

export const registerErrorUserExists = () => LoginPopup.registerErrorUserExists();