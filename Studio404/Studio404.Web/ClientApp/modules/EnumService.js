const EnumService = {

    bookingStatus (val) {
        return bookingStatus[val]
    }
}

let bookingStatus = new Array(4)
bookingStatus[0] = 'Неизвестно'
bookingStatus[1] = 'Неоплачено'
bookingStatus[2] = 'Оплачено'
bookingStatus[3] = 'Отменено'

export default EnumService
