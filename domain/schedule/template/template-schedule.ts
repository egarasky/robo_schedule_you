import {ITemplateSchedule, ITemplateDay, ITemplateScheduleProperties} from "./template_schedule_interfaces";
import {IWorkScheduleProperties, IWorkDay, IWorkShift, IWorkDayProperties} from "../work/work_schedule_interfaces";
import {WorkScheduleIdFactory} from "../work/work-schedule-id-factory";
import moment = require('moment');
export const DATES_INVALID_MESSAGE = 'Start date: % is after end date: %';
export const DATES_GIVEN_EXCEED_SCHEDULE_DAYS = 'Date range from %s to %s exceeds number of days of template schedule: %s';
import _ = require('underscore');
import {DATE_FORMAT} from "../../api/api_interfaces";
import Moment = moment.Moment;

export class TemplateSchedule implements ITemplateSchedule {

    constructor(private _name:string,
                private _days:Array<ITemplateDay>,
                private _id:string) {
    }

    get name():string {
        return this._name;
    }

    get days():Array<ITemplateDay> {
        return this._days;
    }

    get id():string {
        return this._id;
    }

    static templateSchedule(templateScheduleProps:ITemplateScheduleProperties):ITemplateSchedule {
        return new TemplateSchedule(
            templateScheduleProps.name,
            templateScheduleProps.days,
            templateScheduleProps.id
        );
    }

    // TODO implement
    public createWorkSchedule(startDate:Moment, endDate:Moment, dayOfSchedule:number):IWorkScheduleProperties {
        //TODO validate date range
        var daysApart = endDate.diff(startDate, 'day');
        if (daysApart < 0) {//start date after end date
            throw new Error(sprintf(DATES_INVALID_MESSAGE, startDate, endDate));
        }

        if (daysApart + 1 > this.days.length){//number of days for generated schedule
            throw new Error(sprintf(DATES_GIVEN_EXCEED_SCHEDULE_DAYS, startDate.toString(), endDate.toString(), this.days.length))
        }
        //TODO implement starting at a certain day of the schedule
        var workDays:Array<IWorkDayProperties> = [];
        for (var i = 0; i  < daysApart; i++) {
            workDays.push({
                id: WorkScheduleIdFactory.getDayId(),
                date: startDate.clone().add(i, 'day'),
                shifts: _.map(this.days[i].shifts, (templateShift):IWorkShift => {
                    return {
                        id: WorkScheduleIdFactory.getShiftId(),
                        startTime: templateShift.startTime,
                        endTime: templateShift.endTime,
                        roles: _.map(templateShift.roles, (role) => {
                            return {
                                id: WorkScheduleIdFactory.getRoleId(),
                                employees: [],
                                howManyNeeded: role.howManyNeeded,
                                organizationRoleId: role.id
                            };
                        })
                    };
                })
            });

        }
        return {
            id: WorkScheduleIdFactory.getScheduleId(),
            days: workDays,
            madeFromTemplateScheduleId: this.id
        };
    }
}