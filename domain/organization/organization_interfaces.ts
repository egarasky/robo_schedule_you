import {IEmployeeProperties, IEmployee} from "../employee/employee_interfaces";
import {ITemplateScheduleProperties, ITemplateSchedule} from "../schedule/template/template_schedule_interfaces";
import {IWorkScheduleProperties} from "../schedule/work/work_schedule_interfaces";
import {IRole} from "../api/api_interfaces";
export interface IOrganization extends IOrganizationProperties {
    /* EMPLOYEE */
    addEmployee(employee:IEmployeeProperties):void;
    removeEmployee(id:string):void;

    /* TEMPLATE SCHEDULE */
    addTemplateSchedule(templateSchedule:ITemplateScheduleProperties):void;
    getTemplateSchedules():Array<ITemplateSchedule>;
    getTemplateSchedule(id:string):ITemplateSchedule;
    updateTemplateSchedule(updatedTemplateSchedule:ITemplateScheduleProperties):void;
    removeTemplateSchedule(id:string):void;

    /* WORK SCHEDULE */
    createWorkScheduleFromTemplateSchedule(templateScheduleId:string,
                                           startDate:moment.Moment, endDate:moment.Moment,
                                           startDay?:number):void;
    getWorkSchedules():Array<IWorkScheduleProperties>;
    getWorkSchedule(workScheduleId:string):IWorkScheduleProperties;
    updateWorkSchedule(workSchedule:IWorkScheduleProperties):void;
}

export interface IOrganizationProperties {
    id:string,
    name:string,
    employees?:Array<IEmployee>;
    roles:Array<IRole>
    templateSchedules?:Array<ITemplateSchedule>;
    workSchedules?:Array<IWorkScheduleProperties>;
}