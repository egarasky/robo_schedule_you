import {IWorkSchedule} from "domain.schedule.work";
import {IWorkDay} from "domain.schedule.work";
export class WorkSchedule implements IWorkSchedule {
    constructor(private _id:string,
                private _days:Array<IWorkDay>,
                private _madeFromTemplateScheduleId:string) {
    }

    get id():string {
        return this._id;
    }

    get days():Array<IWorkDay> {
        return this._days;
    }

    get madeFromTemplateScheduleId():string {
        return this._madeFromTemplateScheduleId;
    }
}