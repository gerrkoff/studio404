import DateService from './DateService'

const Labels = {

    welcome: (user) => `Добро пожаловать, ${user}!`,
    error: (code, text) => `Ошибка: ${code} | ${text}`,
    hoursSelector_valueText: (title, count) => `с ${title}, ${count} час(а)`,
    phone_smsSent: (phone) => `Код успешно выслан на ${phone}`,
    booking_choiceInfo: (from, to) => `Выбрано время: ${DateService.convertHourIntervalToLabel(from, to)}`,
    settings_currentPhone: (phone) => `Ваш телефон: ${phone}`,

    // messages
    logout: 'Вы вышли',
    bookingSaved: 'Бронирование прошло успешно!',
    smsSent: 'Смс отправлено!',
    phoneConfirmed: 'Телефон подтвержден!',
    loginError: 'Ошибка при входе',
    registerError: 'Ошибка при регистрации',
    defaultError: 'Что-то пошло не так...',
    bookingCanceled: 'Бронь отменена!',
    resend_success: 'Код отправлен!',
    resend_error: 'Ошибка, код не отправлен!',
    changePassword_success: 'Пароль изменен!',
    redirectNotify: 'Перенаправляем...',

    // validation
    bookingHoursIncorrectInput: 'Некорретный ввод',
    fieldIsRequired: 'Обязательное поле',
    loginWrongUser: 'Неправильное имя пользователя...',
    loginWrongPass: '...или пароль',
    userAlreadyRegistered: 'Это имя уже зарегистрировано',
    usernameCreateRule: 'Имя должно быть не длиннее 30 символов и содержать только английские буквы, цифры или "_"',
    passwordCreateRule: 'Пароль должен быть содержать минимум 5 символов',
    passwordConfirmFail: 'Пароли не совпадают',
    phoneRule: 'Телефон должен быть вида 8 (xxx) xxx-xx-xx',
    phoneAlreadyConfirmed: 'Этот телефон уже подтвержден',
    phoneConfirmationCodeRule: 'Введите 6 цифр',
    phoneConfirmationCodeInvalid: 'Неверный код',
    currentPasswordInvalid: 'Неверный текущий пароль',

    // errors
    errorLoadCommon: 'Ошибка при загрузке данных. Попробуйте повторить позже.',
    errorLoginNeed: 'Войдите, чтобы видеть эту страницу',

    // labels
    hoursSelector_label: 'Выберите часы',
    cancel: 'Отмена',
    loginForm_user: 'Имя пользователя',
    loginForm_userEnter: 'Введите имя пользователя',
    loginForm_pass: 'Пароль',
    loginForm_passEnter: 'Введите пароль',
    loginForm_passConfirm: 'Подтверждение пароля',
    loginForm_passConfirmEnter: 'Подтвердите пароль',
    loginPopup_login: 'Войти',
    loginPopup_login_title: 'Вход',
    loginPopup_register: 'Зарегистрироваться',
    loginPopup_register_title: 'Регистрация',
    loginPopup_toogleRegister: 'В первый раз?',
    phone_confirm: 'Указать телефон',
    phone_change: 'Изменить телефон',
    phone_confirm_code: 'Подтвердить',
    phone_title: 'Телефон',
    phone_phoneEnter: 'Введите телефон',
    phone_phone: 'Телефон',
    phone_codeEnter: 'Введите код',
    phone_code: 'Код',
    phone_sendCode: 'Послать код',
    phone_resendCode: 'Послать код заново',
    phone_confirmError: 'Произошла ошибка при подтверждении',
    phone_sendError: 'Произошла ошибка при отпраке кода',
    phone_enterPhoneText: 'Мы вышлем вам код для подтверждения телефона',
    booking: 'Бронирование',
    bookings: 'Мои брони',
    settings: 'Настройки',
    userBookings_title: 'Мои брони',
    userBookings_date: 'Дата',
    userBookings_time: 'Время',
    userBookings_cost: 'Стоимость',
    userBookings_status: 'Статус',
    userBookings_actions: 'Действия',
    userBookings_cancelQuestion: 'Вы уверены, что хотите отменить бронь?',
    userBookings_cancel: 'Отменить бронь',
    userBookings_resendQuestion: 'Вы уверены, что хотите повторно послать код?',
    userBookings_resend: 'Послать код',
    userBookings_payBooking: 'Вы уверены, что хотите оплатить бронь?',
    userBookings_pay: 'Оплатить бронь',
    changePass_title: 'Новый пароль',
    changePass_button: 'Изменить пароль',
    changePass_currentPass: 'Текущий пароль',
    changePass_currentPassEnter: 'Введите текущий пароль',
    changePass_newPass: 'Новый пароль',
    changePass_newPassEnter: 'Введите новый пароль',
    changePass_newPassConfirm: 'Подтверждение нового пароля',
    changePass_newPassConfirmEnter: 'Подтвердите новый пароль',
    booking_help: 'Всего три действия – бронируете время, оплачиваете репетицию, получаете код от студии.\n\nБронировать время просто: выбираете неделю, выбираете день, выбираете время.\nНеделю можно поменять, тыкая в стрелочки.\nДень – кликнув на нужный день (для каждого указано свободное время).\nВремя – выбрав желаемые часы в выпадающем списке.\n\nЧтобы забронировать время вам нужно зарегистрироваться и указать свой телефон. Во-первых, мы хотим иметь возможность связаться с вами в экстренном случае, во-вторых – телефон нужен для получения кода, с помощью которого вы попадете на студию.\n\nИ не забудьте оплатить репетицию – только после этого вам придет смс с кодом.',
    booking_helpShow: 'Помощь',
    booking_userNotLoggedIn: 'Войдите, чтобы иметь возможность бронировать время',
    booking_phoneNotConfirmed: 'Укажите телефон, чтобы иметь возможность бронировать время',
    booking_defaultInfo: 'Выберите часы, в которые вы хотите репетировать',
    booking_hoursInvalid: 'Часы выбраны некорректно – они должны идти подряд, без пропусков',
    booking_book: 'Забронировать',
    booking_hoursCost: 'Стоимость',
    close: 'Закрыть'
}

export default Labels
