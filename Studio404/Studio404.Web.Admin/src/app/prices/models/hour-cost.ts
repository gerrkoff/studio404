import { DiscountDayTypeEnum } from "./discount-day-type-enum";
import { IEntity } from "../../common/models/entity";

export class HourCost implements IEntity {
    id: number;
    start: number;
    end: number;
    dayType: DiscountDayTypeEnum;
    cost: number;
    isGeneral: boolean;
}
