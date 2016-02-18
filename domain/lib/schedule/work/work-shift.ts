module domain.schedule.work {
    import ITime = domain.api.ITime;
    export class WorkShift implements IWorkShift {

        constructor(private _id:string,
                    private _startTime:ITime,
                    private _endTime:ITime,
                    private _roles:Array<IWorkRole>) {
        }

        get id():string {
            return this._id;
        }

        get startTime():domain.api.ITime {
            return this._startTime;
        }

        get endTime():domain.api.ITime {
            return this._endTime;
        }

        get roles():Array<IWorkRole> {
            return this._roles;
        }
    }
}