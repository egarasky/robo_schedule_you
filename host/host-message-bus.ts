import {RedisClient} from "redis";
import {Logger} from "bunyan";
module host.msgbus {
    export const VIEW_CHANNEL = 'views';
// the hub encapsulates functionality to send or receive messages from redis.
    var redis = require('redis');
    var colors = require('./colors.js');
    var cmd:RedisClient = redis.createClient();
    var views:RedisClient = redis.createClient();
    var viewSubscriptions:{(event)}[] = [];//http://stackoverflow.com/questions/12734660/a-typed-array-of-functions
    var lastView:any;//TODO type
    var lastCommand:any;//TODO type
    var bunyan = require('bunyan');

    var hostCommandLoggerInit = {
        name: 'hostCommandLogger',
        level: 'info',
        stream: 'hmmm',//TODO figure out,
        streams: 'what',
        serializers: 'huh',
        src: 'dunno but don\'t think I want'
    };

    var hostViewLoggerInit = {
        name: 'hostViewLogger',
        level: 'info',
        stream: 'hmmm',//TODO figure out,
        streams: 'what',
        serializers: 'huh',
        src: 'dunno but don\'t think I want'
    };

    var hostCommandLogger:Logger = bunyan.createLogger(hostCommandLoggerInit);
    var hostViewLogger:Logger = bunyan.createLogger(hostViewLoggerInit);


    /**
     * Singleton message bus for host application
     */
    export class HostMessageBus {

        public static emitCommand(command) {
            lastCommand = command;
            const jsonCommandString = JSON.stringify(command);
            hostCommandLogger.info({command: jsonCommandString});
            cmd.publish('publishingCommand', jsonCommandString);
        }

        public static onView(subscriberName:string, callback) {
            if (viewSubscriptions.length === 0) {
                // subscribe to __view channel__
                hostViewLogger.info('Subscribing to \"%\" channel', VIEW_CHANNEL); //default is to put string parameter onto msg property
                views.subscribe(VIEW_CHANNEL);

            }

            hostViewLogger.info({totalSubscribers: viewSubscriptions.length}, 'Adding subscriber %s', subscriberName);
            viewSubscriptions.push(callback);
        }

        public static get lastCommand(){
            return lastCommand;
        }

        public static get lastView() {
            return lastView;
        }
    }

// listen to events from redis and call each callback from subscribers
    views.on('message', function (channel, message) {//TODO type message

        if (channel === 'views') {
            lastView = message;
            var view = JSON.parse(message);

            console.log(colors.green('\nhub -- received event ' + view + ' from redis:'));//publish whole object for now
            hostViewLogger.info({view: view}, 'received view from redis');
            viewSubscriptions.forEach(function (subscriber) {
                subscriber(view);
            });
        }
    });

}


