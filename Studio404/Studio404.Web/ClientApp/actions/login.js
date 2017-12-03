const userLoaded = (username) => {
  return {
    type: "CURRENT_USER_LOADED",
    username: username
  }
}

export const loadCurrentUser = () => {
  return userLoaded("Lera");
}