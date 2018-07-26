const initialState = {
    open: false,
    text: '',
    actionText: '',
    actionClick: null
}

const message = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE_SHOW':
            return {...state,
                open: true,
                text: action.text,
                actionText: '',
                actionClick: null
            }

        case 'MESSAGE_HIDE':
            return {...state,
                open: false,
                text: '',
                actionText: '',
                actionClick: null
            }

        case 'MESSAGE_SHOW_ACTION':
            return {...state,
                open: true,
                text: action.text,
                actionText: action.actionText,
                actionClick: action.actionClick
            }

        default:
            return state
    }
}

export default message
