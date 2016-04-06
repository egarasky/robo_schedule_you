import {ITemplateDay} from "domain.schedule.template";
import {ITemplateScheduleProperties} from "domain.schedule.template";
import {IWorkScheduleProperties} from "domain.schedule.work";
import Moment = moment.Moment;
import {IWorkDay} from "domain.schedule.work";
import {WorkDay} from "../work/work-day";
import {WorkScheduleIdFactory} from "../work/work-schedule-id-factory";
import {ITemplateSchedule} from "domain.schedule.template";
import {WorkSchedule} from "../work/work-schedule";
import {IWorkShift} from "domain.schedule.work";
var _:UnderscoreStatic = require('underscore');
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
    public createWorkSchedule(startDate:Moment, endDate:Moment):IWorkScheduleProperties {
        //TODO validate date range
        var daysApart = startDate.diff(endDate, 'day');

        if (daysApart > 0) {
            throw new Error('start date is after end date');
        }

        var workDays:Array<IWorkDay> = [];
        for (var i = 0; i < daysApart; i++) {
            workDays.push({
                id: WorkScheduleIdFactory.getDayId(),
                date: startDate.add(i, 'day'),
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