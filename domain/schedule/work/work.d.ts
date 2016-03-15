declare module "domain.schedule.work" {
    import {ITemplateRole} from "domain.schedule.template";
    import {IEmployee} from "domain.employee";
    import {ITime} from "domain.api";

    import Moment = moment.Moment;


    export interface IWorkDay {
        id: string,
        date: Moment,
        shifts: Array<IWorkShift>
    }

    export interface IWorkRole extends ITemplateRole {
        id: string,
        employees: Array<IEmployee>
    }

    export interface IWorkShift {
        id: string,
        startTime: ITime,
        endTime: ITime,
        roles: Array<IWorkRole>
    }

    export interface IWorkSchedule {
        id: string,
        days: Array<IWorkDay>,
        madeFromTemplateScheduleId: string
    }
}