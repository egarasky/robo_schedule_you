import {IWorkDay} from "domain.schedule.work";
import {IWorkShift} from "domain.schedule.work";
import {ITemplateShift} from "domain.schedule.template";
import {WorkShift} from "./work-shift";
export class WorkDay implements IWorkDay {
    private _shifts:Array<IWorkShift> = [];

    constructor(private _id:string,
                private _date:moment.Moment,
                _shifts:Array<ITemplateShift>) {
        //TODO implement me
        // _.forEach(_shifts, (shift) => {
        //     this._shifts.push(new WorkShift())
        // });
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