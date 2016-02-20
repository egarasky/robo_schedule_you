var host;
(function (host) {
    var msgbus;
    (function (msgbus) {
        msgbus.VIEW_CHANNEL = 'views';
        var redis = require('redis');
        var colors = require('./colors.js');
        var cmd = redis.createClient();
        var views = redis.createClient();
        var viewSubscriptions = [];
        var lastView;
        var lastCommand;
        var bunyan = require('bunyan');
        var hostCommandLoggerInit = {
            name: 'hostCommandLogger',
            level: 'info',
            stream: 'hmmm',
            streams: 'what',
            serializers: 'huh',
            src: 'dunno but don\'t think I want'
        };
        var hostViewLoggerInit = {
            name: 'hostViewLogger',
            level: 'info',
            stream: 'hmmm',
            streams: 'what',
            serializers: 'huh',
            src: 'dunno but don\'t think I want'
        };
        var hostCommandLogger = bunyan.createLogger(hostCommandLoggerInit);
        var hostViewLogger = bunyan.createLogger(hostViewLoggerInit);
        class HostMessageBus {
            static emitCommand(command) {
                lastCommand = command;
                const jsonCommandString = JSON.stringify(command);
                hostCommandLogger.info({ command: jsonCommandString });
                cmd.publish('publishingCommand', jsonCommandString);
            }
            static onView(subscriberName, callback) {
                if (viewSubscriptions.length === 0) {
                    hostViewLogger.info('Subscribing to \"%\" channel', msgbus.VIEW_CHANNEL);
                    views.subscribe(msgbus.VIEW_CHANNEL);
                }
                hostViewLogger.info({ totalSubscribers: viewSubscriptions.length }, 'Adding subscriber %s', subscriberName);
                viewSubscriptions.push(callback);
            }
            static get lastCommand() {
                return lastCommand;
            }
            static get lastView() {
                return lastView;
            }
        }
        msgbus.HostMessageBus = HostMessageBus;
        views.on('message', function (channel, message) {
            if (channel === 'views') {
                lastView = message;
                var view = JSON.parse(message);
                console.log(colors.green('\nhub -- received event ' + view + ' from redis:'));
                hostViewLogger.info({ view: view }, 'received view from redis');
                viewSubscriptions.forEach(function (subscriber) {
                    subscriber(view);
                });
            }
        });
    })(msgbus = host.msgbus || (host.msgbus = {}));
})(host || (host = {}));
//# sourceMappingURL=host-message-bus.js.map