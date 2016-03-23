declare module "domain.organization" {
    import {IRole} from "domain.api";
    import {IEmployee} from "domain.employee";
    import {ITemplateSchedule} from "domain.schedule.template";
    import {IWorkScheduleProperties} from "domain.schedule.work";
    import Moment = moment.Moment;
    export interface IOrganization {
        id: string,
        employees?: Array<IEmployee>;
        roles: Array<IRole>
        templateSchedules?: Array<ITemplateSchedule>;
        workSchedules?: Array<IWorkScheduleProperties>;



        ////methods
        //createWorkScheduleFromTemplateSchedule(templateScheduleId:string, startDay:number,
        //                                       startDate:Moment, endDate:Moment): IWorkSchedule;
    }
}