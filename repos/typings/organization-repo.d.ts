declare module repos.organization {
    import IOrganizationDataSource = repos.organization.IOrganizationDataSource;
    import IOrganization = domain.organization.IOrganization;
    import Organization = domain.organization.Organization;
    import IRole = domain.api.IRole;
    import WorkSchedule = domain.schedule.work.WorkSchedule;
    export interface IOrganizationRepo {
        loadOrganization(id:string): Promise<IOrganization>;
    }

    export interface IOrganizationDataSource {
        loadOrganization(id:string, propObject:IOrganizationDataProperties)
    }

    export interface IOrganizationDataProperties {
        roles?: boolean,
        templateSchedules?: boolean,
        workSchedules?: boolean,
        employees?: boolean
    }

    export interface IOrganizationData {
        id: string,
        roles: Array<IRoleData>,
        templateSchedules: Array<ITemplateScheduleData>,
        workSchedules: Array<IWorkScheduleData>,
        employees: Array<IEmployeeData>
    }

    export interface IRoleData {
        id: string,
        name: string
    }

    export interface ITemplateScheduleData {

    }

    export interface IWorkScheduleData {
        id: string,
        days: IWorkDayData[]
    }

    export interface IWorkDayData {
        id: string,
        date: Date,
        shifts: IWorkShiftData[]
    }

    export interface IWorkShiftData {
        id: string,

    }

    export interface IEmployeeData {

    }
}