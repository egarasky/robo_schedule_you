import {ITemplateShift, ITemplateRole} from "./template_schedule_interfaces";
import {ITime} from "../../api/api_interfaces";
export class TemplateShift implements ITemplateShift {
    constructor(private _startTime:ITime,
                private _endTime:ITime,
                private _roles:Array<ITemplateRole>,
                private _id:string,
                private _name:string) {
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


    get name():string {
        return this._name;
    }
}