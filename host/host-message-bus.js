var host;
(function (host) {
    var msgbus;
    (function (msgbus) {
        msgbus.VIEW_CHANNEL = 'views';
        // the hub encapsulates functionality to send or receive messages from redis.
        var redis = require('redis');
        var colors = require('./colors.js');
        var cmd = redis.createClient();
        var views = redis.createClient();
        var viewSubscriptions = []; //http://stackoverflow.com/questions/12734660/a-typed-array-of-functions
        var lastView; //TODO type
        var lastCommand; //TODO type
        var bunyan = require('bunyan');
        var hostCommandLoggerInit = {
            name: 'hostCommandLogger',
            level: 'info',
            stream: 'hmmm',
            streams: 'what'
        };
        var hostViewLoggerInit = {
            name: 'hostViewLogger',
            level: 'info',
            stream: 'hmmm',
            streams: 'what'
        };
        var hostCommandLogger = bunyan.createLogger(hostCommandLoggerInit);
        var hostViewLogger = bunyan.createLogger(hostViewLoggerInit);
        /**
         * Singleton message bus for host application
         */
        var HostMessageBus = (function () {
            function HostMessageBus() {
            }
            HostMessageBus.emitCommand = function (command) {
                lastCommand = command;
                var jsonCommandString = JSON.stringify(command);
                hostCommandLogger.info({ command: jsonCommandString });
                cmd.publish('publishingCommand', jsonCommandString);
            };
            HostMessageBus.onView = function (subscriberName, callback) {
                if (viewSubscriptions.length === 0) {
                    // subscribe to __view channel__
                    hostViewLogger.info('Subscribing to \"%\" channel', msgbus.VIEW_CHANNEL); //default is to put string parameter onto msg property
                    views.subscribe(msgbus.VIEW_CHANNEL);
                }
                hostViewLogger.info({ totalSubscribers: viewSubscriptions.length }, 'Adding subscriber %s', subscriberName);
                viewSubscriptions.push(callback);
            };
            Object.defineProperty(HostMessageBus, "lastCommand", {
                get: function () {
                    return lastCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HostMessageBus, "lastView", {
                get: function () {
                    return lastView;
                },
                enumerable: true,
                configurable: true
            });
            return HostMessageBus;
        })();
        msgbus.HostMessageBus = HostMessageBus;
        // listen to events from redis and call each callback from subscribers
        views.on('message', function (channel, message) {
            if (channel === 'views') {
                lastView = message;
                var view = JSON.parse(message);
                console.log(colors.green('\nhub -- received event ' + view + ' from redis:')); //publish whole object for now
                hostViewLogger.info({ view: view }, 'received view from redis');
                viewSubscriptions.forEach(function (subscriber) {
                    subscriber(view);
                });
            }
        });
    })(msgbus = host.msgbus || (host.msgbus = {}));
})(host || (host = {}));
//# sourceMappingURL=host-message-bus.js.map