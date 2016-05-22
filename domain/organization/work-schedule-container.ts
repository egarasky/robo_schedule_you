import {IWorkScheduleProperties} from "../schedule/work/work_schedule_interfaces";
var sprintf = require('sprintf-js').sprintf;
export const WORK_SCHEDULE_NOT_FOUND_ERROR = 'Work schedule not found with id: %s';
export const WORK_SCHEDULE_ALREADY_EXISTS_ERROR = 'Work schedule already added with id: %s';
export class WorkScheduleContainer {

    private workScheduleMap:{[index:string]: IWorkScheduleProperties} = {};
    //no restriction on work schedules overlapping and no naming so no namekey

    addWorkSchedule(workScheduleToAdd:IWorkScheduleProperties){
        //TODO undefined check for id
        if(this.workScheduleMap[workScheduleToAdd.id]){
            throw new Error(sprintf(WORK_SCHEDULE_NOT_FOUND_ERROR, workScheduleToAdd.id));
        }

    }

    getWorkSchedules(){
        return Object.keys(this.workScheduleMap).map((workScheduleId)=>{
            return this.workScheduleMap[workScheduleId];
        });
    }

    public updateWorkSchedule(updatedWorkSchedule:IWorkScheduleProperties):void{
        if(!this.workScheduleMap[updatedWorkSchedule.id]){
            throw new Error(sprintf(WORK_SCHEDULE_NOT_FOUND_ERROR, updatedWorkSchedule.id));
        }

        // this.workScheduleMap[updatedWorkSchedule.id] = updatedWorkSchedule;
    }

    getWorkSchedule(workScheduleId:string):IWorkScheduleProperties {
        if(!this.workScheduleMap[workScheduleId]){
            throw new Error(sprintf(WORK_SCHEDULE_NOT_FOUND_ERROR, workScheduleId));
        }

        return this.workScheduleMap[workScheduleId];
    }
}