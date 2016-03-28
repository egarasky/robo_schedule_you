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

    export interface IWorkRole {
        id: string,
        employees: Array<IEmployee>,
        howManyNeeded: number,
        organizationRoleId:string
    }

    export interface IWorkShift {
        id: string,
        startTime: ITime,
        endTime: ITime,
        roles: Array<IWorkRole>
    }

    export interface IWorkScheduleProperties {
        id: string,
        days: Array<IWorkDay>,
        madeFromTemplateScheduleId: string
    }

    export interface IWorkSchedule {

    }
}