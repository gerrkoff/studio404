const initialState = {
  userLoggedIn: false,
  username: ""
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER_LOADED":
      return Object.assign({}, state, {
        userLoggedIn: action.currentUser.userLoggedIn,
        username: action.currentUser.username
      });

    default:
      return state;
  }
}
  
export default account