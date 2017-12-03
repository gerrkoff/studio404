import AccountService from "../modules/AccountService";

const userLoaded = (username) => {
  return {
    type: "CURRENT_USER_LOADED",
    username
  }
}

export function loadCurrentUser() {
  return (dispatch) => {
    AccountService.GetCurrentUser()
          .done((username) => {
              dispatch(userLoaded(username));
          });
  };
}