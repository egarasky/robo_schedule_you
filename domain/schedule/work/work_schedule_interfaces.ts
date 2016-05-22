import Moment = moment.Moment;
import {IEmployee} from "../../employee/employee_interfaces";
import {ITime} from "../../api/api_interfaces";


export interface IWorkDay extends IWorkDayProperties {}

export interface IWorkDayProperties {
    id:string,
    date:Moment,
    shifts:Array<IWorkShift>,
}

export interface IWorkRole extends IWorkRoleProperties{}
export interface IWorkRoleProperties {
    id:string,
    employees:Array<IEmployee>,
    howManyNeeded:number,
    organizationRoleId:string
}


export interface IWorkShift extends IWorkShiftProperties{}
export interface IWorkShiftProperties {
    id:string,
    startTime:ITime,
    endTime:ITime,
    roles:Array<IWorkRole>
}


export interface IWorkSchedule extends IWorkScheduleProperties {}
export interface IWorkScheduleProperties {
    id:string,
    days:Array<IWorkDay>,
    madeFromTemplateScheduleId:string
}

