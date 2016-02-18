/**
 * Typed message bus from https://github.com/adrai/cqrs-sample
 */
var msgbus;
(function (msgbus) {
    // the hub encapsulates functionality to send or receive messages from redis.
    var redis = require('redis');
    var colors = require('./colors.js');
    var cmd = redis.createClient();
    var evt = redis.createClient();
    var evtSubscriptions = [];
    var cmdSubscriptions = [];
    module.exports = {
        emitCommand: function (command) {
            console.log(colors.blue('\nhub -- publishing command ' + command.command + ' to redis:'));
            cmd.publish('commands', JSON.stringify(command));
        },
        onCommand: function (callback) {
            if (cmdSubscriptions.length === 0) {
                // subscribe to __commands channel__
                cmd.subscribe('commands');
            }
            cmdSubscriptions.push(callback);
            console.log(colors.blue('hub -- command subscribers: ' + cmdSubscriptions.length));
        },
        emitEvent: function (event) {
            console.log(colors.blue('\nhub -- publishing event ' + event.event + ' to redis:'));
            evt.publish('events', JSON.stringify(event));
        },
        onEvent: function (callback) {
            if (evtSubscriptions.length === 0) {
                // subscribe to __events channel__
                evt.subscribe('events');
            }
            evtSubscriptions.push(callback);
            console.log(colors.blue('hub -- event subscribers: ' + evtSubscriptions.length));
        }
    };
    // listen to events from redis and call each callback from subscribers
    evt.on('message', function (channel, message) {
        var event = JSON.parse(message);
        if (channel === 'events') {
            console.log(colors.green('\nhub -- received event ' + event.event + ' from redis:'));
            evtSubscriptions.forEach(function (subscriber) {
                subscriber(event);
            });
        }
    });
    // listen to commands from redis and call each callback from subscribers
    cmd.on('message', function (channel, message) {
        var command = JSON.parse(message);
        if (channel === 'commands') {
            console.log(colors.green('\nhub -- received command ' + command.command + ' from redis:'));
            cmdSubscriptions.forEach(function (subscriber) {
                subscriber(command);
            });
        }
    });
})(msgbus || (msgbus = {}));
//# sourceMappingURL=msgbus.js.map