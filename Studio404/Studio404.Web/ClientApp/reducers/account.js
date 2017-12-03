const initialState = {
  userLoggedIn: false,
  username: "",
  loginPopup: {
    open: false,
    registration: false
  }
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER_LOADED":
      return Object.assign({}, state, {
        userLoggedIn: action.currentUser.userLoggedIn,
        username: action.currentUser.username
      });

    case "OPEN_LOGIN_POPUP":
      return Object.assign({}, state, {
        loginPopup: {
          open: true
        }
      });

    case "CLOSE_LOGIN_POPUP":
      return Object.assign({}, state, {
        loginPopup: {
          open: false
        }
      });

    default:
      return state;
  }
}
  
export default account