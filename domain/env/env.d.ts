declare module domain.environments {
    export interface IDomainInit {
        domainPath: string,
        commandRejectedName: string,
        eventStore: IEventStore,
        aggregateLocks: IAggregateLocks
    }

    export interface IEventStore {
        type: string,
        dbName: string,
        port: number
        eventsCollectionName: string,
        snapshotsCollectionName: string,
        timeout: number
        authSource?: string,
        username?: string,
        password?: string
    }

    export interface IAggregateLocks {
        type: string,
        host: string,
        port: number,
        db: number,
        prefix: string,
        timeout: number,
        password?: string
    }
}