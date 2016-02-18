module domain.schedule.template {

    export class TemplateShift implements ITemplateShift {
        constructor(private _startTime:domain.api.ITime,
                    private _endTime:domain.api.ITime,
                    private _roles:Array<domain.schedule.template.ITemplateRole>,
                    private _id:string) {
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

        get roles():Array<ITemplateRole> {
            return this._roles;
        }
    }
}