import {ITemplateRole} from "domain.schedule.template";
export class TemplateRole implements ITemplateRole {

    constructor(private _id:string,
                private _organizationRoleId:string,
                private _howManyNeeded:number) {

    }

    get howManyNeeded():number {
        return this._howManyNeeded;
    }

    get organizationRoleId():string {
        return this._organizationRoleId
    }

    get id():string {
        return this._id;
    }
}
