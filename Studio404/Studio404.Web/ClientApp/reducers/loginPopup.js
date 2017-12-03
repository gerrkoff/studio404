const initialState = {
  open: false,
  registration: false
}

const loginPopup = (state = initialState, action) => {
  switch (action.type) {

    case "OPEN_LOGIN_POPUP":
      return Object.assign({}, state, {
        open: true
      });

    case "CLOSE_LOGIN_POPUP":
      return Object.assign({}, state, {
        open: false
      });

    default:
      return state;
  }
}
  
export default loginPopup