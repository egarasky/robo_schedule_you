import {IWorkDay} from "domain.schedule.work";
import {IWorkShift} from "domain.schedule.work";
import {ITemplateShift} from "domain.schedule.template";
import {WorkShift} from "./work-shift";
import {WorkScheduleIdFactory} from "./work-schedule-id-factory";
import {IWorkRole} from "domain.schedule.work";
import {ITemplateRole} from "domain.schedule.template";
import {WorkRole} from "./work-role";
export class WorkDay implements IWorkDay {
    private _shifts:Array<IWorkShift>;

    constructor(private _id:string,
                private _date:moment.Moment,
                _shifts:Array<ITemplateShift>) {
        this._shifts = _.map(_shifts, (shift:ITemplateShift) => {
            var workRoles:Array<IWorkRole> = _.map(shift.roles, (role:ITemplateRole) => {
                return new WorkRole([], WorkScheduleIdFactory.getRoleId(), role.organizationRoleId,
                    role.howManyNeeded);
            });
            return new WorkShift(WorkScheduleIdFactory.getShiftId(), shift.startTime, shift.endTime, workRoles);
        });
    }

    get id():string {
        return this._id;
    }

    get date():moment.Moment {
        return this._date;
    }

    get shifts():Array<IWorkShift> {
        return this._shifts;
    }
}