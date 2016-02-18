

module domain.organization {
    import IRole = domain.api.IRole;
    import IWorkSchedule = domain.schedule.work.IWorkSchedule;
    import ITemplateSchedule = domain.schedule.template.ITemplateSchedule;
    import IEmployee = domain.employee.IEmployee;
    var _:UnderscoreStatic = require('underscore');
    export class Organization implements IOrganization {
        constructor(private _id:string,
                    private _roles:Array<IRole>,
                    private _workSchedules:Array<IWorkSchedule>,
                    private _templateSchedules:Array<ITemplateSchedule>,
                    private _employees:Array<IEmployee>) {
        }

        createWorkScheduleFromTemplateSchedule(templateScheduleId:string,
                                               startDay:number, startDate:moment.Moment,
                                               endDate:moment.Moment):IWorkSchedule {
            return undefined;
        }




        //    function Organization() {
        //}
        //
        //    Organization.prototype.createWorkScheduleFromTemplateSchedule = createWorkScheduleFromTemplateSchedule;
        //
        //    function createWorkScheduleFromTemplateSchedule(templateScheduleId,
        //                                                    startDay, startDate, endDate) {
        //    //TODO error handling of bad arguments
        //    var templateSchedule = _.find(this.templateSchedules, function (templateSchedule) {
        //        return templateScheduleId === templateSchedule._id;
        //    });
        //    var workSchedule = {};
        //
        //    var currentMoment = moment(startDate);
        //    currentMoment.day(currentMoment.day() + startDay);
        //    var endMoment = moment(endDate);//
        //    var dayIndex = startDay;
        //    while (currentMoment.dayOfYear() !== endMoment.dayOfYear()
        //    && currentMoment.year() !== endMoment.year()) {
        //        var day = createWorkDayFromTemplateDay(templateSchedule[dayIndex], currentMoment);
        //    }
        //}
        //
        //    function createWorkDayFromTemplateDay(templateDay, currentMoment){
        //    var workDay = {};
        //    workDay.date = currentMoment;
        //    workDay.shifts = _.extendOwn(templateDay.shifts);
        //}

        get id():string {
            return this._id;
        }

        get roles():Array<IRole> {
            return this._roles;
        }


        get workSchedules():Array<domain.schedule.work.IWorkSchedule> {
            return this._workSchedules;
        }

        get templateSchedules():Array<domain.schedule.template.ITemplateSchedule> {
            return this._templateSchedules;
        }

        get employees():Array<domain.employee.IEmployee> {
            return this._employees;
        }
    }
}