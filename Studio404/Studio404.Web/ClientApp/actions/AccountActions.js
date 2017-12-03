import AccountService from "../modules/AccountService";

const userLoaded = (currentUser) => {
  return {
    type: "CURRENT_USER_LOADED",
    currentUser
  }
}

export function loadCurrentUser() {
  return (dispatch) => {
    AccountService.GetCurrentUser()
          .done((currentUser) => {
              dispatch(userLoaded(currentUser));
          });
  };
}