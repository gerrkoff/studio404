const tokenKey = 'accessToken'
export const Token = {
    Save: (token) => sessionStorage.setItem(tokenKey, token),
    Load: () => sessionStorage.getItem(tokenKey),
    Clear: () => sessionStorage.removeItem(tokenKey)
}
