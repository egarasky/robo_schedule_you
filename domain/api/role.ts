import {IRole} from "./api_interfaces";

export class Role {
    public static role(role:IRole):IRole {
        return {
            id: role.id,
            name: role.name
        };
    }
}