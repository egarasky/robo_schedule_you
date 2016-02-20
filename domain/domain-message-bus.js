var domain;
(function (domain) {
    var msgbus;
    (function (msgbus) {
        var redis = require('redis');
        var bunyan = require('bunyan');
        var cmd = redis.createClient();
        var evt = redis.createClient();
        var view = redis.createClient();
        var cmdSubscriptions = [];
        var evtSubscriptions = [];
        var viewSubscriptions = [];
        var lastCommand;
        var lastEvent;
        var lastView;
        class DomainMessageBus {
            static onCommand(callback) {
                if (cmdSubscriptions.length === 0) {
                    cmd.subscribe('commands');
                }
                cmdSubscriptions.push(callback);
                console.log(colors.blue('hub -- command subscribers: ' + cmdSubscriptions.length));
            }
            emitEvent(event) {
                console.log(colors.blue('\nhub -- publishing event ' + event.event + ' to redis:'));
                evt.publish('events', JSON.stringify(event));
            }
            onEvent(callback) {
                if (evtSubscriptions.length === 0) {
                    evt.subscribe('events');
                }
                evtSubscriptions.push(callback);
                console.log(colors.blue('hub -- event subscribers: ' + evtSubscriptions.length));
            }
        }
        msgbus.DomainMessageBus = DomainMessageBus;
        evt.on('message', function (channel, message) {
            var event = JSON.parse(message);
            if (channel === 'events') {
                console.log(colors.green('\nhub -- received event ' + event.event + ' from redis:'));
                evtSubscriptions.forEach(function (subscriber) {
                    subscriber(event);
                });
            }
        });
        cmd.on('message', function (channel, message) {
            var command = JSON.parse(message);
            if (channel === 'commands') {
                console.log(colors.green('\nhub -- received command ' + command.command + ' from redis:'));
                cmdSubscriptions.forEach(function (subscriber) {
                    subscriber(command);
                });
            }
        });
    })(msgbus = domain.msgbus || (domain.msgbus = {}));
})(domain || (domain = {}));
//# sourceMappingURL=domain-message-bus.js.map