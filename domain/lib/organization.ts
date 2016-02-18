module domain.organization {
    var domain = require('cqrs-domain');

    domain.defineAggregate({
        name: 'organization',
        defaultCommandPayload: 'payload',
        defaultEventPayload: 'payload'
    });

}