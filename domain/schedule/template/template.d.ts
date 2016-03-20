declare module "domain.schedule.template" {
    import {ITime} from "domain.api";
    export interface ITemplateScheduleProperties {
        name: string,
        days: Array<ITemplateDay>,
        id: string
    }

    export interface ITemplateSchedule extends ITemplateScheduleProperties {

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