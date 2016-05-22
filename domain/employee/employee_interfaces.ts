import {IRole, IAvailabilitySchedule} from "../api/api_interfaces";

export interface IEmployee extends IEmployeeProperties {}
export interface IEmployeeProperties {
    id: string
    firstName: string,
    lastName: string,
    roles:Array<IRole>,
    availabilitySchedules?:Array<IAvailabilitySchedule>,
    defaultAvailabilitySchedule?:IAvailabilitySchedule
}

