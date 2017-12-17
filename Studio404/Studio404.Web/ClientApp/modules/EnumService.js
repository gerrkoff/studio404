const EnumService = {

    bookingStatus (val) {
        return bookingStatus[val]
    }
}

let bookingStatus = new Array(4)
bookingStatus[0] = 'None'
bookingStatus[1] = 'Unpaid'
bookingStatus[2] = 'Paid'
bookingStatus[3] = 'Canceled'

export default EnumService
