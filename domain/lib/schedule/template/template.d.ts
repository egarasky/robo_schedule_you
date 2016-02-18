declare module domain.schedule.template {
    import ITime = domain.api.ITime;
    export interface ITemplateSchedule {
        name: string,
        days: Array<ITemplateDay>,
        id: string
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
    }

    export interface ITemplateRole {
        id: string,//TODO replace with id class
        organizationRoleId: string,
        howManyNeeded: number
    }
}