const Labels = {

    welcome: (user) => `Welcome, ${user}!`,
    error: (code, text) => `Error: ${code} | ${text}`,
    hoursSelector_valueText: (title, count) => `from ${title}, ${count} hours`,
    phone_smsSent: (phone) => `Code was successfully sent on ${phone}`,

    //messages
    logout: "Logged out",
    bookingSaved: "Booking saved successfully!",
    smsSent: "Sms was sent!",
    phoneConfirmed: "Phone confirmed!",
    loginError: "Login error",
    registerError: "Register error",
    defaultError: "Something went wrong...",
    bookingCanceled: "Booking canceled!",
    resend_success: "Booking code was sent successfully!",
    resend_error: "Booking code sending failed!",

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
    phoneConfirmationCodeInvalid: "Invalid code", 

    //errors
    errorLoadCommon: "Error occured while loading data. Try to reload.",
    errorLoginNeed: "Login to see this page",

    //labels
    hoursSelector_label: "Select hours",
    cancel: "Cancel",
    loginForm_user: "Username",
    loginForm_userEnter: "Enter username",
    loginForm_pass: "Password",
    loginForm_passEnter: "Enter password",
    loginForm_passConfirm: "Password Confirmation",
    loginForm_passConfirmEnter: "Confirm password",
    loginPopup_login: "Login",
    loginPopup_register: "Register",
    loginPopup_toogleRegister: "Registration",
    phone_confirm: "Confirm phone",
    phone_title: "Phone",
    phone_phoneEnter: "Enter phone",
    phone_phone: "Phone",
    phone_codeEnter: "Enter code",
    phone_code: "Code",
    phone_sendCode: "Send code",
    phone_confirmError:"Error occured while confirming",
    phone_sendError:"Error occured while sending code",
    phone_enterPhoneText: "We will send you a code just to confirm that it is you phone",
    booking: "Booking",
    bookings: "Bookings",
    settings: "Settings",
    userBookings_title: "My bookings",
    userBookings_date: "Date",
    userBookings_time: "Time",
    userBookings_status: "Status",
    userBookings_actions: "Actions",
    userBookings_cancelQuestion: "Are you sure you want to cancel booking?",
    userBookings_cancel: "Cancel booking",
    userBookings_resendQuestion: "Are you sure you want to resend booking code?",
    userBookings_resend: "Resend booking code"
}

export default Labels;