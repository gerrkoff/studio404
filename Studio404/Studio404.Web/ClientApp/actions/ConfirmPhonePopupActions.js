import { ConfirmPhonePopup } from "./ActionCreators";
import { showDefaultError, show } from "./MessageActions";
import { Http, errorHandler } from "../modules/Http";

export const sendPhoneConfirmation = (phone) => {
    return (dispatch) => {

        dispatch(ConfirmPhonePopup.sendLoading());
        Http.Post("api/account/SendPhoneConfirmation", { phone })
            .fail((data) => {
                dispatch(ConfirmPhonePopup.sendError());
                dispatch(errorHandler(data));
            })
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(ConfirmPhonePopup.sendSuccess());
                        dispatch(show("Sms was sent!"));
                        break;

                    case 2:
                        dispatch(ConfirmPhonePopup.invalidPhone());
                        break;

                    default:
                        dispatch(ConfirmPhonePopup.sendError());
                        dispatch(showDefaultError());
                        break;
                }
            });
    }
}

export const confirmPhone = (phone, code) => {
    return (dispatch) => {

        dispatch(ConfirmPhonePopup.confirmLoading());
        Http.Post("api/account/ConfirmPhone", { phone, code })
            .fail((data) => {
                dispatch(ConfirmPhonePopup.confirmError());
                dispatch(errorHandler(data));
            })
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(ConfirmPhonePopup.confirmSuccess());
                        dispatch(ConfirmPhonePopup.close());
                        dispatch(show("Phone confirmed!"));
                        break;

                    case 2:
                        dispatch(ConfirmPhonePopup.invalidCode());
                        break;

                    default:
                        dispatch(ConfirmPhonePopup.confirmError());
                        dispatch(showDefaultError());
                        break;
                }
            });
    }
}

export const openConfirmPhonePopup = () => ConfirmPhonePopup.open();

export const closeConfirmPhonePopup = () => ConfirmPhonePopup.close();

export const updatePhone = (phone) => ConfirmPhonePopup.updatePhone(phone);

export const updateCode = (code) => ConfirmPhonePopup.updateCode(code);

export const reenterPhone = (code) => ConfirmPhonePopup.reenterPhone();