import {ITime} from "./api_interfaces";

export class Time {
    public static time(time:ITime):ITime {
        return {
            hour: time.hour,
            minute: time.minute
        }
    }
}