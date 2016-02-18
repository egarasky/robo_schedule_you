module domain.schedule.template {

    export class TemplateDay implements ITemplateDay {

        constructor(private _shifts:Array<domain.schedule.template.ITemplateShift>,
                    private _id:string) {}

        get shifts():Array<domain.schedule.template.ITemplateShift> {
            return this._shifts;
        }

        get id():string {
            return this._id;
        }
    }
}