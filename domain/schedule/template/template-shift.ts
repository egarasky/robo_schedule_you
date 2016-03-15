import {ITemplateShift} from "domain.schedule.template";
import {ITemplateRole} from "domain.schedule.template";
import {ITime} from "domain.api";
export class TemplateShift implements ITemplateShift {
    constructor(private _startTime:ITime,
                private _endTime:ITime,
                private _roles:Array<ITemplateRole>,
                private _id:string) {
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

    get roles():Array<ITemplateRole> {
        return this._roles;
    }
}