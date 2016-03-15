declare module "domain.employee" {
    import {IRole} from "domain.api";
    import {IAvailabilitySchedule} from "domain.api";
    export interface IEmployeeProperties {
        id: string
        firstName: string,
        lastName: string,
        roles:Array<IRole>,
        availabilitySchedules?:Array<IAvailabilitySchedule>,
        defaultAvailabilitySchedule?:IAvailabilitySchedule
    }

    export interface IEmployee extends IEmployeeProperties {

    }

}