import { BookingSimple } from "./booking-simple";
import { BookingStatusEnum } from "./booking-status-enum";

export class BookingUser extends BookingSimple {
    public status: BookingStatusEnum;
    public cost: number;
    public userPhone: string;
    public userDisplayName: string;
    public userId: string;
}
