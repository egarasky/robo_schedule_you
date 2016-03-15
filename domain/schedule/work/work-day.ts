import {IWorkDay} from "domain.schedule.work";
import {IWorkShift} from "domain.schedule.work";
export class WorkDay implements IWorkDay {
    constructor(private _id:string,
                private _date:moment.Moment,
                private _shifts:Array<IWorkShift>) {
    }

    get id():string {
        return this._id;
    }

    get date():moment.Moment {
        return this._date;
    }

    get shifts():Array<IWorkShift> {
        return this._shifts;
    }
}