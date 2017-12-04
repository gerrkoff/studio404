const initialState = {
    open: false,
    text: ""
}

const message = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW":
            return Object.assign({}, state, {
                open: true,
                text: action.text
            });

        case "HIDE":
            return Object.assign({}, state, {
                open: false,
                text: ""
            });

        default:
            return state;
    }
}
  
export default message