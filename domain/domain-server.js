var domain;
(function (domain_1) {
    var EnvDomainInit = domain_1.environments.dev.EnvDomainInit;
    var domain = require('cqrs-domain')(EnvDomainInit);
    var bunyan = require('bunyan');
    domain.defineCommand({
        id: 'id',
        name: 'command',
        aggregateId: 'payload.aggregate.id',
        aggregateName: 'payload.aggregate.name',
        payload: 'payload',
        revision: 'revision',
        meta: 'meta'
    });
    domain.defineEvent({
        correlationId: 'commandId',
        id: 'id',
        name: 'event',
        aggregateId: 'payload.aggregate.id',
        aggregateName: 'payload.aggregate.name',
        revision: 'revision',
        payload: 'payload',
        meta: 'meta'
    });
})(domain || (domain = {}));
//# sourceMappingURL=domain-server.js.map