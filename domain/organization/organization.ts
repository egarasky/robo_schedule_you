import {IOrganization, IOrganizationProperties} from "./organization_interfaces";
import {EmployeeContainer} from "./employee-container";
import {TemplateScheduleContainer} from "./template-schedule-container";
import {WorkScheduleContainer} from "./work-schedule-container";
import {IRole} from "../api/api_interfaces";
import {IWorkScheduleProperties} from "../schedule/work/work_schedule_interfaces";
import {ITemplateSchedule, ITemplateScheduleProperties} from "../schedule/template/template_schedule_interfaces";
import {IEmployee, IEmployeeProperties} from "../employee/employee_interfaces";
var _:UnderscoreStatic = require('underscore');
export class Organization implements IOrganization {
    private employeeContainer:EmployeeContainer = new EmployeeContainer();
    private templateScheduleContainer:TemplateScheduleContainer = new TemplateScheduleContainer();
    private workScheduleContainer:WorkScheduleContainer = new WorkScheduleContainer();

    constructor(private _id:string,
                private _name:string,
                private _roles:Array<IRole>,
                private _workSchedules:Array<IWorkScheduleProperties>,
                private _templateSchedules:Array<ITemplateSchedule>,
                _employees:Array<IEmployee>) {
        this.employeeContainer.addEmployees(_employees)
    }

    createWorkScheduleFromTemplateSchedule(templateScheduleId:string,
                                           startDate:moment.Moment,
                                           endDate:moment.Moment, dayOfSchedule?:number):IWorkScheduleProperties {

        var templateSchedule = this.templateScheduleContainer.getTemplateSchedule(templateScheduleId);
        var workSchedule:IWorkScheduleProperties = templateSchedule.createWorkSchedule(startDate, endDate);
        this.workScheduleContainer.addWorkSchedule(workSchedule);
        return workSchedule;

    }


    //    function Organization() {
    //}
    //
    //    Organization.prototype.createWorkScheduleFromTemplateSchedule = createWorkScheduleFromTemplateSchedule;
    //
    //    function createWorkScheduleFromTemplateSchedule(templateScheduleId,
    //                                                    startDay, startDate, endDate) {
    //    //TODO error handling of bad arguments
    //    var templateSchedule = _.find(this.templateSchedules, function (templateSchedule) {
    //        return templateScheduleId === templateSchedule._id;
    //    });
    //    var workSchedule = {};
    //
    //    var currentMoment = moment(startDate);
    //    currentMoment.day(currentMoment.day() + startDay);
    //    var endMoment = moment(endDate);//
    //    var dayIndex = startDay;
    //    while (currentMoment.dayOfYear() !== endMoment.dayOfYear()
    //    && currentMoment.year() !== endMoment.year()) {
    //        var day = createWorkDayFromTemplateDay(templateSchedule[dayIndex], currentMoment);
    //    }
    //}
    //
    //    function createWorkDayFromTemplateDay(templateDay, currentMoment){
    //    var workDay = {};
    //    workDay.date = currentMoment;
    //    workDay.shifts = _.extendOwn(templateDay.shifts);
    //}

    get id():string {
        return this._id;
    }


    get name():string {
        return this._name;
    }

    get roles():Array<IRole> {
        return this._roles;
    }


    get workSchedules():Array<IWorkScheduleProperties> {
        return this._workSchedules;
    }

    get templateSchedules():Array<ITemplateSchedule> {
        return this._templateSchedules;
    }

    get employees():Array<IEmployee> {
        return this.employeeContainer.getEmployees();
    }

    public employee(employeeId:string):IEmployee {
        return this.employeeContainer.getEmployee(employeeId)
    }

    static organization(organizationObj:IOrganizationProperties):Organization {
        return new Organization(
            organizationObj.id,
            organizationObj.name,
            organizationObj.roles,
            organizationObj.workSchedules,
            organizationObj.templateSchedules,
            organizationObj.employees
        );
    }

    addEmployee(employee:IEmployeeProperties):void {
        this.employeeContainer.addEmployee(employee);
    }

    removeEmployee(id:string):void {
        this.employeeContainer.removeEmployee(id);
    }

    addTemplateSchedule(templateSchedule:ITemplateScheduleProperties):void {
        this.templateScheduleContainer.addTemplateSchedule(templateSchedule);
    }

    getTemplateSchedules():Array<ITemplateSchedule> {
        return this.templateScheduleContainer.getTemplateSchedules();
    }

    getTemplateSchedule(id:string):ITemplateSchedule {
        return this.templateScheduleContainer.getTemplateSchedule(id);
    }

    updateTemplateSchedule(updatedTemplateSchedule:ITemplateScheduleProperties) {
        this.templateScheduleContainer.updateTemplateSchedule(updatedTemplateSchedule);
    }


    removeTemplateSchedule(id:string):void {
        this.templateScheduleContainer.removeTemplateSchedule(id);
    }

    getWorkSchedules():Array<IWorkScheduleProperties> {
        return this.workScheduleContainer.getWorkSchedules();
    }

    getWorkSchedule(workScheduleId:string):IWorkScheduleProperties {
        return this.workScheduleContainer.getWorkSchedule(workScheduleId);
    }

    updateWorkSchedule(workSchedule:IWorkScheduleProperties):void {
        this.workScheduleContainer.updateWorkSchedule(workSchedule);
    }
}