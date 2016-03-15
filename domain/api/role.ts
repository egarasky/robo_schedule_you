
import {IRole} from "domain.api";
export class Role implements IRole {
    constructor(private _id:string,
                private _name:string) {
    }

    public static role(role:IRole) {
        return new Role(role.id, role.name);
    }

    get id():string {
        return this._id;
    }

    get name():string {
        return this._name;
    }

    //static initFromDataSource(role:IRoleData):Role {
    //    return new Role(role.id, role.name);
    //}
}