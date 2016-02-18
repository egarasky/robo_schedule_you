module domain.environments.dev {
    export const EnvDomainInit:IDomainInit = {
        domainPath: __dirname + '/lib',//where is this used in library?
        commandRejectedName: 'rejectedCommand',
        eventStore: {
            type: 'mongodb',
            dbName: 'cqrs-domain-try',
            port: 27017,
            eventsCollectionName: 'events',
            snapshotsCollectionName: 'snapshots',
            timeout: 10000
            //authSource: , username: , password:
        },
        aggregateLocks: {//what does that mean?, aggregate locks must be acquired to commit events
            type: 'redis',
            host: 'localhost',
            port: 6379,
            db: 0,
            prefix: 'domain_aggregate_lock',
            timeout: 10000
            //password: optional
        }

        //TODO deduplication ??
    }
}