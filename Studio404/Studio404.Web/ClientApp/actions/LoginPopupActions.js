import AccountService from "../modules/AccountService";
import { LoginPopup } from "./ActionCreators";
import { loadCurrentUser } from "./AccountActions";

export const login = (loginInfo) => {
    return (dispatch) => {

        AccountService.Login(loginInfo)
            .done(() => {
                dispatch(closeLoginPopup());
                dispatch(loadCurrentUser("Logged in"));
            });
    };
}

export const register = (registerInfo) => {
    return (dispatch) => {

        AccountService.Register(registerInfo)
            .done(() => {
                dispatch(toggleRegistration(false));
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