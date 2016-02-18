declare module domain {
    export interface ICommandPayload {
        aggregate: IAggregateData
    }

    export interface IAggregateData {
        id: string,
        name: string
    }

    export interface IPayload {
        aggregate: IAggregateData
    }

    export interface IMetaData {
        userId: string,
        timeStamp: string
    }

    export interface ICommand {
        id: string,
        command: string,
        payload: IPayload,
        revision: string,
        meta: IMetaData
    }
}