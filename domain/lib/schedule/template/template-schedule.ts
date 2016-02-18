module domain.schedule.template {
    export class TemplateSchedule implements ITemplateSchedule {

        constructor(private _name:string,
                    private _days:Array<ITemplateDay>,
                    private _id:string) {}

        get name():string {
            return this._name;
        }

        get days():Array<domain.schedule.template.ITemplateDay> {
            return this._days;
        }

        get id():string {
            return this._id;
        }
    }
}