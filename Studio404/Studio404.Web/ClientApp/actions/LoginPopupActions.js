import AccountService from "../modules/AccountService";
import { LoginPopup } from "./ActionCreators";
import { loadCurrentUser } from "./AccountActions";
import { errorHandler } from "../modules/Http";

export const login = (loginInfo) => {
    return (dispatch) => {

        AccountService.Login(loginInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(closeLoginPopup());
                dispatch(loadCurrentUser("Logged in"));
            });
    };
}

export const register = (registerInfo) => {
    return (dispatch) => {

        AccountService.Register(registerInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done(() => {
                dispatch(toggleRegistration(false));
                dispatch(LoginPopup.resetRegister());
                dispatch(closeLoginPopup());
                dispatch(loadCurrentUser("Registered"));
            });
    };
}

export const openLoginPopup = () => LoginPopup.open();

export const closeLoginPopup = () => LoginPopup.close();

export const toggleRegistration = (registration) => LoginPopup.toggleRegistration(registration);

export const updateLoginInfo = (fieldName, fieldValue) => LoginPopup.updateLoginInfo(fieldName, fieldValue);

export const updateRegisterInfo = (fieldName, fieldValue) => LoginPopup.updateRegisterInfo(fieldName, fieldValue);