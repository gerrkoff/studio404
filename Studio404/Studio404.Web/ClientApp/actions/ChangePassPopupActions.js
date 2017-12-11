import { Http, errorHandler } from "../modules/Http";
import { showDefaultError, show } from "./MessageActions";
import Labels from "../modules/Labels";

const ChangePassPopup = {
    open: () => {
        return {
            type: "CHANGE_PASS_POPUP_OPEN"
        }
    },

    close: () => {
        return {
            type: "CHANGE_PASS_POPUP_CLOSE"
        }
    },

    updateChangePassInfo: (fieldName, fieldValue) => {
        return {
            type: "CHANGE_PASS_POPUP_UPDATE",
            fieldName,
            fieldValue
        }
    },

    changePassErrorWrongPassword: () => {
        return {
            type: "CHANGE_PASS_ERROR_WRONG_CUR_PASSWORD"
        }
    }
}

export const changePassword = (changePassInfo) => {
    return (dispatch) => {

        Http.Post("api/account/changepass", changePassInfo)
            .fail((data) => dispatch(errorHandler(data)))
            .done((result) => {
                switch (result) {
                    case 1:
                        dispatch(closeChangePassPopup());
                        dispatch(show(Labels.changePassword_success));
                        break;
                
                    case 2:
                        dispatch(ChangePassPopup.changePassErrorWrongPassword());
                        break;

                    default:
                        dispatch(showDefaultError());
                        break;
                }
            });
    };
}

export const openChangePassPopup = () => ChangePassPopup.open();

export const closeChangePassPopup = () => ChangePassPopup.close();