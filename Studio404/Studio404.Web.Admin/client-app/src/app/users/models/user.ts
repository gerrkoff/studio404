import { IEntity } from "../../common/models/entity";

export class User implements IEntity {
    public id: string;
    public phoneNumber: string;
    public userName: string;
    public displayName: string;
    public isAdmin: boolean;
}
