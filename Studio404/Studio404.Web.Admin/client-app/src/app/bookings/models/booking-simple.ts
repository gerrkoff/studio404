import { IEntity } from "../../common/models/entity";

export class BookingSimple implements IEntity {
    public id: number;
    public from: Date;
    public to: Date;
    public code: string;
}
