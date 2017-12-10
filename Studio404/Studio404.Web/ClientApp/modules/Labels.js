const Labels = {

    welcome: (user) => `Welcome, ${user}!`,

    logout: "Logged out",
    bookingSaved: "Booking saved successfully!",
    smsSent: "Sms was sent!",
    phoneConfirmed: "Phone confirmed!",
    loginError: "Login error",
    registerError: "Register error",
    defaultError: "Something went wrong...",
    bookingCanceled: "Booking canceled!",

    //validation
    bookingHoursIncorrectInput: "Incorrect input",
    fieldIsRequired: "This field is required",
    loginWrongUser: "Wrong username...",
    loginWrongPass: "...or password",
    userAlreadyRegistered: "This username already registered",
    passwordCreateRule: "Password must be 5 length minimum",
    passwordConfirmFail: "Passwords are not equal",
    phoneRule: "Phone must be like 8 (xxx) xxx-xx-xx",
    phoneAlreadyConfirmed: "This phone is already confirmed",
    phoneConfirmationCodeRule: "Code must be 6 digit",
    phoneConfirmationCodeInvalid: "Invalid code"
}

export default Labels;