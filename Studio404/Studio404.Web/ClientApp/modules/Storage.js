const tokenKey = 'accessToken'
export const Token = {
    Save: (token) => localStorage.setItem(tokenKey, token),
    Load: () => localStorage.getItem(tokenKey),
    Clear: () => localStorage.removeItem(tokenKey)
}

const showBookingHelpKey = 'showBookingHelp'
export const ShowBookingHelp = {
    Save: (value) => localStorage.setItem(showBookingHelpKey, value),
    Load: () => localStorage.getItem(showBookingHelpKey),
    Clear: () => localStorage.removeItem(showBookingHelpKey)
}
