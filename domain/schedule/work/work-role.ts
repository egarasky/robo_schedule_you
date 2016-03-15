import {IWorkRole} from "domain.schedule.work";
import {IEmployee} from "domain.employee";
export class WorkRole implements IWorkRole {
    constructor(private _employees:Array<IEmployee>,
                private _id:string,
                private _organizationRoleId:string,
                private _howManyNeeded:number) {
    }

    get employees():Array<IEmployee> {
        return this._employees;
    }

    get id():string {
        return this._id;
    }

    get organizationRoleId():string {
        return this._organizationRoleId;
    }

    get howManyNeeded():number {
        return this._howManyNeeded;
    }
}