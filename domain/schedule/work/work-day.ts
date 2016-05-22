import {IWorkDay, IWorkShift, IWorkRole} from "./work_schedule_interfaces";
import {ITemplateShift, ITemplateRole} from "../template/template_schedule_interfaces";
import {WorkRole} from "./work-role";
import {WorkScheduleIdFactory} from "./work-schedule-id-factory";
import {WorkShift} from "./work-shift";
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