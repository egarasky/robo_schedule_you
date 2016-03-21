import {IOrganization} from "domain.organization";
import {EmployeeContainer} from './employee-container';
import {IRole} from "domain.api";
import {IEmployee} from "domain.employee";
import {IWorkSchedule} from "domain.schedule.work";
import {ITemplateSchedule} from "domain.schedule.template";
import {IEmployeeProperties} from "domain.employee";
import {ITemplateScheduleProperties} from "domain.schedule.template";
import {TemplateScheduleContainer} from "./template-schedule-container";
var _:UnderscoreStatic = require('underscore');
export class Organization implements IOrganization {
    private employeeContainer:EmployeeContainer = new EmployeeContainer();
    private templateScheduleContainer:TemplateScheduleContainer = new TemplateScheduleContainer();

    constructor(private _id:string,
                private _roles:Array<IRole>,
                private _workSchedules:Array<IWorkSchedule>,
                private _templateSchedules:Array<ITemplateSchedule>,
                _employees:Array<IEmployee>) {
        this.employeeContainer.addEmployees(_employees)
    }

    createWorkScheduleFromTemplateSchedule(templateScheduleId:string,
                                           startDay:number, startDate:moment.Moment,
                                           endDate:moment.Moment):IWorkSchedule {
        return undefined;
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

    get roles():Array<IRole> {
        return this._roles;
    }


    get workSchedules():Array<IWorkSchedule> {
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

    static organization(organizationObj:IOrganization):Organization {
        return new Organization(
            organizationObj.id,
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
}