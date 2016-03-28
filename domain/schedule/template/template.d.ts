declare module "domain.schedule.template" {
    import {ITime} from "domain.api";
    import {IWorkScheduleProperties} from "domain.schedule.work";
    import Moment = moment.Moment;
    export interface ITemplateScheduleProperties {
        name: string,
        days: Array<ITemplateDay>,
        id: string
    }

    export interface ITemplateSchedule extends ITemplateScheduleProperties {
        createWorkSchedule(startDate:Moment, endDate:Moment):IWorkScheduleProperties
    }

    export interface ITemplateDay {
        id: string,
        shifts: Array<ITemplateShift>
    }

    export interface ITemplateShift {
        id: string,
        startTime: ITime,
        endTime: ITime
        roles: Array<ITemplateRole>
        name: string
    }

    export interface ITemplateRole {
        id: string,//TODO replace with id class
        organizationRoleId: string,
        howManyNeeded: number
    }
}