const initialState = {
    bookings: [],
    isLoading: false,
    error: false
}

const userBookings = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });

        case "LOADED_SUCCESS":
            return Object.assign({}, state, {
                isLoading: false,
                bookings: action.bookings
            });

        case "LOADED_ERROR":
            return Object.assign({}, state, {
                isLoading: false,
                error: true
            });

        default:
            return state;
    }
}
  
export default userBookings