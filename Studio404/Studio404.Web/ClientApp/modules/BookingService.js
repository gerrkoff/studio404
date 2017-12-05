import { Http } from "./Http";

const BookingService = {

    GetWeekWorkload: (weekStartDate) => {
        return Http.Get("api/booking/workload", {weekStartDate: weekStartDate.toISOString()})
            .done(data => data.forEach(x => x.date = new Date(x.date)));
    },

    GetDayWorkload: (date) => {
        return Http.Get("api/booking/hours", {date: date.toISOString()});
    },

    MakeBooking: (date, from, to) => {
        return Http.Post("/api/booking/make", {
            date: date.toISOString(),
            from: from,
            to: to
        });
    }
}

export default BookingService;