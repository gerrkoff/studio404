import { Http } from "./Http";

const UserService = {

    GetUserBookings: () => {
        return Http.Get("api/user/bookings")
            .done(data => data.forEach(x => x.date = new Date(x.date)));
    }
}

export default UserService;