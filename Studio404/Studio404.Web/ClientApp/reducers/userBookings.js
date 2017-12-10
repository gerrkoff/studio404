const initialState = {
    bookings: [],
    isLoading: false,
    error: false
}

const userBookings = (state = initialState, action) => {
    switch (action.type) {
        case "USER_BOOKINGS_LOADING":
            return {...state,
                isLoading: true,
                error: false
            };

        case "USER_BOOKINGS_LOADED_SUCCESS":
            return {...state,
                isLoading: false,
                bookings: action.bookings
            };

        case "USER_BOOKINGS_LOADED_ERROR":
            return {...state,
                isLoading: false,
                error: true
            };

        default:
            return state;
    }
}
  
export default userBookings