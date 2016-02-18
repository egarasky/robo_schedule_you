module domain.api {
    export interface IRole {
        id: string,
        name: string
    }

    export class Role implements IRole {
        constructor(private _id:string,
                    private _name:string) {
        }

        get id():string {
            return this._id;
        }

        get name():string {
            return this._name;
        }

        static initFromDataSource(role:repos.organization.IRoleData):Role {
            return new Role(role.id, role.name);
        }
    }
}