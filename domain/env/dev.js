var domain;
(function (domain) {
    var environments;
    (function (environments) {
        var dev;
        (function (dev) {
            dev.EnvDomainInit = {
                domainPath: __dirname + '/lib',
                commandRejectedName: 'rejectedCommand',
                eventStore: {
                    type: 'mongodb',
                    dbName: 'cqrs-domain-try',
                    port: 27017,
                    eventsCollectionName: 'events',
                    snapshotsCollectionName: 'snapshots',
                    timeout: 10000
                },
                aggregateLocks: {
                    type: 'redis',
                    host: 'localhost',
                    port: 6379,
                    db: 0,
                    prefix: 'domain_aggregate_lock',
                    timeout: 10000
                }
            };
        })(dev = environments.dev || (environments.dev = {}));
    })(environments = domain.environments || (domain.environments = {}));
})(domain || (domain = {}));
//# sourceMappingURL=dev.js.map