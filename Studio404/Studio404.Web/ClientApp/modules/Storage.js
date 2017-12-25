const tokenKey = 'accessToken'
export const Token = {
    Save: (token) => sessionStorage.setItem(tokenKey, token),
    Load: () => sessionStorage.getItem(tokenKey),
    Clear: () => sessionStorage.removeItem(tokenKey)
}

const showBookingHelpKey = 'showBookingHelp'
export const ShowBookingHelp = {
    Save: (value) => sessionStorage.setItem(showBookingHelpKey, value),
    Load: () => sessionStorage.getItem(showBookingHelpKey),
    Clear: () => sessionStorage.removeItem(showBookingHelpKey)
}
