import {IWorkScheduleProperties, IWorkDay, IWorkSchedule} from "./work_schedule_interfaces";
var _:UnderscoreStatic = require('underscore');
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

    static workSchedule(workScheduleToAdd:IWorkScheduleProperties):IWorkSchedule {
        return new WorkSchedule(
            workScheduleToAdd.id,
            workScheduleToAdd.days,
            workScheduleToAdd.madeFromTemplateScheduleId
        );
    }
}