import {ITemplateDay} from "domain.schedule.template";
import {ITemplateScheduleProperties} from "domain.schedule.template";
import {ITemplateSchedule} from "domain.schedule.template";
export class TemplateSchedule implements ITemplateSchedule {

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

    static templateSchedule(templateScheduleProps:ITemplateScheduleProperties):ITemplateSchedule {
        return new TemplateSchedule(
            templateScheduleProps.name,
            templateScheduleProps.days,
            templateScheduleProps.id
        );
    }
}