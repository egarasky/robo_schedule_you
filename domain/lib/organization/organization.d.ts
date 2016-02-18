declare module domain.organization {
    import IWorkSchedule = domain.schedule.work.IWorkSchedule;
    import ITemplateSchedule = domain.schedule.template.ITemplateSchedule;
    import IEmployee = domain.employee.IEmployee;
    import IRole = domain.api.IRole;
    import Moment = moment.Moment;
    import IOrganizationDataSource = repos.organization.IOrganizationDataSource;
    import IOrganizationData = repos.organization.IOrganizationData;
    import IRoleData = repos.organization.IRoleData;
    import IWorkScheduleData = repos.organization.IWorkScheduleData;
    import ITemplateScheduleData = repos.organization.ITemplateScheduleData;
    import IEmployeeData = repos.organization.IEmployeeData;

    export interface IOrganization {
        id: string,
        workSchedules?: Array<IWorkSchedule>;
        templateSchedules?: Array<ITemplateSchedule>;
        Employees?: Array<IEmployee>;
        roles: Array<IRole>

        //methods
        createWorkScheduleFromTemplateSchedule(templateScheduleId:string, startDay:number,
                                               startDate:Moment, endDate:Moment): IWorkSchedule;
    }
}