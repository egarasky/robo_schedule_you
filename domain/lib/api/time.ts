module domain.api {
    export interface ITime {
        hour: number,
        minute: number
    }

    export class Time implements ITime{
        constructor(private _hour:number,
                    private _minute:number){
            //TODO validate time is formed correctly here
        }

        get hour():number {
            return this._hour;
        }

        get minute():number {
            return this._minute;
        }
    }
}