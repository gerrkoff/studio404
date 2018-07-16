import { IEntity } from "../../common/models/entity";

export class PromoCode implements IEntity {
    public code: string;
    public description: string;
    public discount: number;
    public from: Date;
    public to: Date;
    public id: number;
}
