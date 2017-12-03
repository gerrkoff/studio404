const initialState = {
  userLoggedIn: false,
  username: ""
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER_LOADED":
      return Object.assign({}, state, {
        userLoggedIn: true,
        username: action.username
      });

    default:
      return state;
  }
}
  
export default login