var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');
var User = require(projectPath('/models/manager/manager-model.js'));
var Employee = require(projectPath('/models/employee/employee-model.js'));
var Promise = require('bluebird');
var CreateManager = require(projectPath('/end-points/test/manager-stub.js'));
var mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;
var supertest = require('supertest-session');
var api = supertest('http://localhost:3000');
var expect = require('chai').expect;

var chaiObjEquality = require(projectPath('/test-utils/containsEqualProps'));
var ShiftRoutes = require(projectPath('/end-points/shift/main/shift-routes.js'));
var UserRoutes = require(projectPath('/end-points/user/main/user-routes.js'));
var ScheduleRoutes = require(projectPath('/end-points/schedule/main/schedule-routes.js'));
var AdminRoutes = require(projectPath('/end-points/admin/admin-routes'));
var ManagerRoutes = require(projectPath('/end-points/manager/main/manager-routes'));
var server;
deleteObjIds = function deleteObjIds(Obj) {
    //only supports json objects...not proto chain at the moment
    if (Array.isArray(Obj)) {
        Obj.forEach(function (eleObj) {
            deleteObjIds(eleObj);
        })
    } else if (typeof Obj == 'object') {
        delete Obj._id;
        Object.keys(Obj).forEach(function (key) {
            deleteObjIds(Obj[key]);
        });
    }
    return Obj;
};


before(function connect(done) {
    app.use(session({
        secret: '1234kjsdaf;lij45sodjwl34kjahdawsd3rplsdf',
        saveUninitialized: false,
        resave: true,
        expires: false
    }));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());//must be before controller routes to send json body!!, order of middleware defined by code occurrence order
    addRoutes();
    mongoose.connectAsync('mongodb://localhost/employeescheduler-test').error(function (err) {
        throw err;
    }).then(function () {
        server = app.listen(3000, function (err) {
            var host = server.address().address;
            var port = server.address().port;
            console.log('listening at http://%s:%s', host, port);
            done();
        })
    });
});

function addRoutes() {
    ShiftRoutes.setRoutes(app);
    UserRoutes.setRoutes(app);
    ScheduleRoutes.setRoutes(app);
    AdminRoutes.setRoutes(app);
    ManagerRoutes.setRoutes(app);
}

//TODO not sure why, but can't use before tests to clear out collections
//mongoose doesn't callback from collection access at all then and no error is thrown
//function clearCollections(done) {
//    User.remove({}, function () {
//        done();
//    });
//}

after(function (done) {
    //return new Promise(function (resolve, reject) {
    //debugger;
    //server.close(function (err) {
    //        console.log('hi');
    //        done();
    //    });
    //});//http://stackoverflow.com/questions/8813838/properly-close-mongooses-connection-once-youre-done
    //TODO close call back not working
    server.close();
    done();
});

