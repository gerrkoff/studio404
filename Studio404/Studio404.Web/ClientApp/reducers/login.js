const initialState = {
  userLoggedIn: false,
  username: ""
}

const test = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER_LOADED":
      return {
        userLoggedIn: true,
        username: action.username
      };

    default:
      return state;
  }
}
  
export default test