//starting point of domain
var domain;
(function (domain_1) {
    var EnvDomainInit = domain_1.environments.dev.EnvDomainInit;
    var domain = require('cqrs-domain')(EnvDomainInit);
    var bunyan = require('bunyan');
    //TODO type definitions for domain api
    domain.defineCommand({
        id: 'id',
        name: 'command',
        aggregateId: 'payload.aggregate.id',
        aggregateName: 'payload.aggregate.name',
        payload: 'payload',
        revision: 'revision',
        meta: 'meta' //every command should have userId and timestamp
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
    msgbus;
})(domain || (domain = {}));
//# sourceMappingURL=server.js.map