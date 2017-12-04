import AccountService from "../modules/AccountService";
import { LoginPopup } from "./ActionCreators";
import { loadCurrentUser } from "./AccountActions";

export const login = (loginInfo) => {
    return (dispatch) => {

        AccountService.Login(loginInfo)
            .done(() => {
                dispatch(toggleRegistration(false));
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
    return LoginPopup.open();
}

export const closeLoginPopup = () => {
    return LoginPopup.close();
}

export const toggleRegistration = (registration) => {
    return LoginPopup.toggleRegistration(registration);
}

export const updateLoginInfo = (fieldName, fieldValue) => {
    return LoginPopup.updateLoginInfo(fieldName, fieldValue);
}

export const updateRegisterInfo = (fieldName, fieldValue) => {
    return LoginPopup.updateRegisterInfo(fieldName, fieldValue);
}