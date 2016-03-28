import {ProcessArgsMap} from "../../../utilities/ProcessArgsMap";
export class WorkScheduleIdFactory {
    private static scheduleIdsGiven = 0;
    private static shiftIdsGiven = 0;
    private static dayIdsGiven = 0;
    private static roleIdsGiven = 0;

    constructor(){
        throw new Error('dont instantiate WorkScheduleIdFactory');
    }

    public static getScheduleId():string {
        WorkScheduleIdFactory.scheduleIdsGiven++;
        if(ProcessArgsMap.get('workScheduleId')){
            //TODO configure getting workScheduleIds
        }
        
        return 'WS' + WorkScheduleIdFactory.scheduleIdsGiven;
    };

    public static getShiftId():string {
        WorkScheduleIdFactory.shiftIdsGiven++;
        if(ProcessArgsMap.get('workShiftId')){
            //TODO build configuration
        }

        return 'WSHFT' + WorkScheduleIdFactory.shiftIdsGiven;
    }

    public static getDayId():string {
        WorkScheduleIdFactory.dayIdsGiven++;
        if(ProcessArgsMap.get('workDayId')){
            //TODO build configuration
        }

        return 'WDAY' + WorkScheduleIdFactory.dayIdsGiven;
    }

    public static getRoleId():string {
        WorkScheduleIdFactory.roleIdsGiven++;
        if(ProcessArgsMap.get('workRoleId')){
            //TODO build configuration
        }

        return 'WROLE' + WorkScheduleIdFactory.roleIdsGiven;
    }
}