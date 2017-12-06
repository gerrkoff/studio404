const initialState = {
    open: false,
    text: "",
    actionText: "_",
    action: null
}

const confirmDialog = (state = initialState, action) => {
    switch (action.type) {
        case "CONFIRM_SHOW":
            return {...state,
                open: true,
                text: action.text,
                actionText: action.actionText,
                action: action.action
            };

        case "CONFIRM_HIDE":
            return {...state,
                open: false,
                text: "",
                actionText: "_",
                action: null
            };

        default:
            return state;
    }
}
  
export default confirmDialog