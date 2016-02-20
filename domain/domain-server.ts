//starting point of domain
module domain {
    import EnvDomainInit = environments.dev.EnvDomainInit;
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
        meta: 'meta'//every command should have userId and timestamp
    });

    export interface IEvent {
        commandId: string,
        id: string,
        event: string,
        payload: IPayload,
        revision: string,
        meta: IMetaData
    }

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

}