import {ITime} from "domain.api";
import {IWorkShift} from "domain.schedule.work";
import {IWorkRole} from "domain.schedule.work";
export class WorkShift implements IWorkShift {

    constructor(private _id:string,
                private _startTime:ITime,
                private _endTime:ITime,
                private _roles:Array<IWorkRole>) {
    }

    get id():string {
        return this._id;
    }

    get startTime():ITime {
        return this._startTime;
    }

    get endTime():ITime {
        return this._endTime;
    }

    get roles():Array<IWorkRole> {
        return this._roles;
    }
}