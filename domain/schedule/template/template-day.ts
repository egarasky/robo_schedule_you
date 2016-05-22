import {ITemplateDay, ITemplateShift} from "./template_schedule_interfaces";
export class TemplateDay implements ITemplateDay {

    constructor(private _shifts:Array<ITemplateShift>,
                private _id:string) {
    }

    get shifts():Array<ITemplateShift> {
        return this._shifts;
    }

    get id():string {
        return this._id;
    }
}