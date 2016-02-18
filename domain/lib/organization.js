var domain;
(function (domain_1) {
    var organization;
    (function (organization) {
        var domain = require('cqrs-domain');
        domain.defineAggregate({
            name: 'organization',
            defaultCommandPayload: 'payload',
            defaultEventPayload: 'payload'
        });
    })(organization = domain_1.organization || (domain_1.organization = {}));
})(domain || (domain = {}));
//# sourceMappingURL=organization.js.map