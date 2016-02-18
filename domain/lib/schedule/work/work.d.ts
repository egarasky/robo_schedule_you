declare module domain.schedule.work {
    import Moment = moment.Moment;
    import ITemplateRole = domain.schedule.template.ITemplateRole;
    import IEmployee = domain.employee.IEmployee;
    import ITime = domain.api.ITime;

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