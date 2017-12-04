const initialState = {
    open: false,
    text: ""
}

const message = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW":
            return {...state,
                open: true,
                text: action.text
            };

        case "HIDE":
            return {...state,
                open: false,
                text: ""
            };

        default:
            return state;
    }
}
  
export default message