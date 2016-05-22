import Moment = moment.Moment;
import {IWorkScheduleProperties} from "../work/work_schedule_interfaces";
import {ITime} from "../../api/api_interfaces";
export interface ITemplateScheduleProperties {
    name:string,
    days:Array<ITemplateDay>,
    id:string
}

export interface ITemplateSchedule extends ITemplateScheduleProperties {
    createWorkSchedule(startDate:Moment, endDate:Moment, dayOfSchedule?:number):IWorkScheduleProperties
}

export interface ITemplateDay {
    id:string,
    shifts:Array<ITemplateShift>
}

export interface ITemplateShift {
    id:string,
    startTime:ITime,
    endTime:ITime
    roles:Array<ITemplateRole>
    name:string
}

export interface ITemplateRole {
    id:string,//TODO replace with id class
    organizationRoleId:string,
    howManyNeeded:number
}