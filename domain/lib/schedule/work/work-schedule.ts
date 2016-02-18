module domain.schedule.work {
    export class WorkSchedule implements IWorkSchedule {
        constructor(private _id:string,
                    private _days:Array<domain.schedule.work.IWorkDay>,
                    private _madeFromTemplateScheduleId:string){}

        get id():string {
            return this._id;
        }

        get days():Array<domain.schedule.work.IWorkDay> {
            return this._days;
        }

        get madeFromTemplateScheduleId():string {
            return this._madeFromTemplateScheduleId;
        }
    }
}