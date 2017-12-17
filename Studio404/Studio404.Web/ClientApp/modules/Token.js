const tokenKey = 'accessToken'

const Token = {
    Save: (token) => sessionStorage.setItem(tokenKey, token),
    Load: () => sessionStorage.getItem(tokenKey),
    Clear: () => sessionStorage.removeItem(tokenKey)
}

export default Token
