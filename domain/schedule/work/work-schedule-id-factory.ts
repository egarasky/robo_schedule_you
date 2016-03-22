import {ProcessArgsMap} from "../../../utilities/ProcessArgsMap";
import {WORK_SCHEDULE_IDS} from "../../test/stubs/work-schedule-stub";
export class WorkScheduleIdFactory {
    private static idsGiven = 0;
    constructor(){
        throw new Error('dont instantiate WorkScheduleIdFactory');
    }

    public static getId():string{
        WorkScheduleIdFactory.idsGiven++;
        if(ProcessArgsMap.get('workScheduleId')){
            //TODO configure getting workScheduleIds
        }
        
        return 'WS' + WorkScheduleIdFactory.idsGiven;
    }
}