import { ConfirmPhonePopup } from "./ActionCreators";
import { showDefaultError, show } from "./MessageActions";
import { Http, errorHandler } from "../modules/Http";

export const sendPhoneConfirmation = (phone) => {
    return (dispatch) => {

        dispatch(ConfirmPhonePopup.sendLoading());
        Http.Post("api/account/SendPhoneConfirmation", { phone })
            .fail((data) => dispatch(errorHandler(data)))
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(ConfirmPhonePopup.sendSuccess());
                        break;

                    case 2:
                        dispatch(ConfirmPhonePopup.sendError());
                        break;

                    default:
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
            .fail((data) => dispatch(errorHandler(data)))
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(ConfirmPhonePopup.confirmSuccess());
                        break;

                    case 2:
                        dispatch(ConfirmPhonePopup.confirmError());
                        break;

                    default:
                        dispatch(showDefaultError());
                        break;
                }
            });
    }
}

export const openConfirmPhonePopup = () => ConfirmPhonePopup.open();

export const closeConfirmPhonePopup = () => ConfirmPhonePopup.close();