import { BookingSimple } from "./booking-simple";
import { BookingStatusEnum } from "./booking-status-enum";

export class BookingUser extends BookingSimple {
    public Status: BookingStatusEnum;
    public Cost: number;
    public UserPhone: string;
    public UserDisplayName: string;
    public UserId: string;
}
