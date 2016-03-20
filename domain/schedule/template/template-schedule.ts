import {ITemplateDay} from "domain.schedule.template";
import {ITemplateScheduleProperties} from "domain.schedule.template";
export class TemplateSchedule implements ITemplateScheduleProperties {

    constructor(private _name:string,
                private _days:Array<ITemplateDay>,
                private _id:string) {
    }

    get name():string {
        return this._name;
    }

    get days():Array<ITemplateDay> {
        return this._days;
    }

    get id():string {
        return this._id;
    }
}