    var express = require('express');
    var session = require('express-session');
    var bodyParser = require('body-parser');
    var app = express();
    var User = require(projectPath('/models/manager/manager-model.js'));
    var Employee = require(projectPath('/models/employee/employee-model.js'));
    var Promise = require('bluebird');
    var CreateManager = require(projectPath('/end-points/test/manager-stub.js'));
    var mongoose = Promise.promisifyAll(require('mongoose'));
    mongoose.Promise = Promise;
    var supertest = require('supertest-session');
    var api = supertest('http://localhost:3000');
    var expect = require('chai').expect;

    var chaiObjEquality = require(projectPath('/end-points/test/containsEqualProps'));
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




describe.skip('integrated manager test', function () {

    /**
     * Delete previous user and added employees and create a fresh user for next employee test
     */
    //beforeEach(function(){
    //        var usersRemoved = Promise.promisify(User.remove.bind(null, {}));
    //        var employeesRemoved = Promise.promisify(Employee.remove.bind(null, {}));
    //        Promise.all([usersRemoved, employeesRemoved]).then(function(){
    //            return CreateManager();
    //        });
    //    }
    //);

    var EMPLOYEE_1 = new Employee({
        firstName: "Spongebob",
        lastName: "Squarepants",
        userName: "crustyCrabCook",
        password: "I love starfish",
        role: "cook"

    });

    /**
     * app.get('/manager/employees/edit', employeeController.getEmployeesForEdit);
     * app.put('/manager/employee/preferences', employeeController.updateEmployeePreferences);
     * app.delete('/manager/employees', employeeController.deleteEmployee);
     */


     // app.post('/manager/employees', employeeController.create);
    describe('post employee to /manager/employees', function(){
        it('should create an employee', function(done){
            done();
        });
    });

    var postEmployeePromise = function(employee){
        return new Promise(function(resolve, reject){
        });
    }
});
describe.skip('integrated schedule test', function () {
    var START_DATE = "2015-11-10";
    var END_DATE = "2015-11-14";
    var START_DATE2 = "2015-11-15";
    var END_DATE2 = "2015-11-19";

    var EMPTY_SHIFT_SCHEDULE = {
        "friday": [],
        "monday": [],
        "saturday": [],
        "sunday": [],
        "thursday": [],
        "tuesday": [],
        "wednesday": []
    };

    var postSchedule = function (startDate, endDate) {
        return new Promise(function (resolve, reject) {
            api.post('/schedules').send({
                startDate: startDate,
                endDate: endDate
            }).expect(200).end(function (err, res) {
                err ? reject(err) : resolve();
            });
        });
    };

    beforeEach(function (done) {
        var userRemoved = new Promise(function (resolve, reject) {
            User.remove({}, function (err) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });

        var newUser = {
            firstName: 'Jean',
            lastName: 'Claude Van-Damme',
            userName: 'Jeanny',
            password: 'I am the best at karate'
        };

        userRemoved.then(function () {
            api.post('/manager').send({newUser: newUser}).end(function (err, res) {
                if (err) throw err;
                done();
            });
        });
    });


    it('should access empty schedules', function (done) {
        api.get('/schedules').expect(200).end(function (err, res) {
            if (err) throw err;
            expect(res.body.schedules).to.deep.equal([]);
            done();
        });
    });

    it('should create a dated schedule from an empty shift schedule', function (done) {
        var addSchedule = new Promise(function (resolve, reject) {
            api.post('/schedules').send({
                startDate: START_DATE,
                endDate: END_DATE
            }).expect(200).end(function (err, res) {
                err ? reject(err) : resolve();
            });
        });

        addSchedule.then(function () {
            api.get('/schedules').expect(200).end(function (err, res) {
                    expect(res.body.schedules.length).to.be.equal(1);
                    expect(res.body.schedules[0].startDate).to.be.equal((new Date(START_DATE).toISOString()));
                    expect(res.body.schedules[0].endDate).to.be.equal((new Date(END_DATE).toISOString()));
                    chaiObjEquality.containsEqualProps(EMPTY_SHIFT_SCHEDULE, res.body.schedules[0].templateSchedule);
                    done();
                }
            );
        });
    });

    it('should create two dated schedules and retrieve them sorted by start date', function (done) {
        var addDatedSchedule2 = postSchedule(START_DATE2, END_DATE2);
        var addDatedSchedule1 = postSchedule(START_DATE, END_DATE);
        Promise.all([addDatedSchedule2, addDatedSchedule1]).then(function () {
            api.get('/schedules').expect(200).end(function (err, res) {
                expect(res.body.schedules.length).to.be.equal(2);
                expect(res.body.schedules[0].startDate).to.be.equal((new Date(START_DATE).toISOString()));
                expect(res.body.schedules[0].endDate).to.be.equal((new Date(END_DATE).toISOString()));
                chaiObjEquality.containsEqualProps(EMPTY_SHIFT_SCHEDULE, res.body.schedules[0].templateSchedule);

                expect(res.body.schedules[1].startDate).to.be.equal((new Date(START_DATE2).toISOString()));
                expect(res.body.schedules[1].endDate).to.be.equal((new Date(END_DATE2).toISOString()));
                chaiObjEquality.containsEqualProps(EMPTY_SHIFT_SCHEDULE, res.body.schedules[1].templateSchedule);
                done();
            });
        }).error(function (err) {
            throw err;
        });
    });

    it('should add two schedules and delete one', function (done) {
        Promise.all([postSchedule(START_DATE, END_DATE), postSchedule(START_DATE2, END_DATE2)])
            .then(function () {
                return new Promise(function (resolve, reject) {
                    api.get('/schedules').expect(200).end(function (err, res) {
                        expect(res.body.schedules.length).to.be.equal(2);
                        resolve({
                            idToDelete: res.body.schedules[1]._id,
                            idLeft: res.body.schedules[0]._id
                        });
                    });
                });
            }).then(function (scheduleIds) {
            return new Promise(function (resolve, reject) {
                api.delete('/manager/schedules').send({schedule_id: scheduleIds.idToDelete}).expect(200)
                    .end(function (err, res) {
                        resolve(scheduleIds.idLeft);
                    });
            });
        }).then(function (scheduleIdLeft) {
            api.get('/schedules').expect(200).end(function (err, res) {
                var x = 'hi';
                expect(res.body.schedules.length).to.be.equal(1);
                expect(res.body.schedules[0]._id).to.be.equal(scheduleIdLeft);
                done();
            })
        });
    });


    it('should create an empty schedule and update it', function(done){
        expect(true).to.equal(false, "not implemented");
    });

    it('should create an empty schedule and update a single shift', function(done){
        expect(true).to.equal(false, 'not implemented');
    })
    //TODO test delete schedule and adding employees to schedule
});
describe.skip('integrated shift test', function () {
    var SHIFT1_NAME = 'breakfast';
    var SHIFT2_NAME = 'preptime';
    var SHIFT3_NAME = 'all day clean';
    var shift1 = {
        roles: [{
            name: 'waiter',
            number: 2
        }],
        startTime: [8, 30],
        endTime: [9, 30],
        name: SHIFT1_NAME
    };

    var shift2 = {
        roles: [{
            name: 'cook',
            number: 3
        }],
        startTime: [10, 0],
        endTime: [14, 0],
        name: SHIFT2_NAME
    };

    var shift3 = {
        roles: [{
            name: 'waiter',
            number: 2
        }],
        startTime: [4, 14],
        endTime: [18, 0],
        name: SHIFT3_NAME
    };

    var emptyShiftObj = {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    };


    beforeEach(function (done) {
        var usersRemove = new Promise(function(resolve, reject){
            User.remove({}, function (err) {
                err? reject(err): resolve();
            });
        });

        var newUser = {
            firstName: 'Jean',
            lastName: 'Claude Van-Damme',
            userName: 'Jeanny',
            password: 'I am the best at karate'
        };
        usersRemove.then(function(){
            api.post('/manager').send({newUser: newUser}).end(function (err, res) {
                if (err) throw err;
                done();
            });
        });
    });


    it('should access empty shifts', function (done) {
        api.get('/shifts').expect(200).end(function (err, res) {
            if (err) throw err;
            expect(res.body.shifts).to.deep.equal(emptyShiftObj);
            done();
        });
    });

    it('should create two shifts', function (done) {
        var shifts = [shift1];
        User.sortShiftArray(shifts);

        api.put('/shifts/add').send({
            shift: shift1,
            day: 'monday'
        }).expect(200).end(function (err, res) {
            if (err) throw err;
            api.get('/shifts').expect(200).end(function (err, res) {
                if (err) throw err;

                chaiObjEquality.containsEqualProps(shifts, res.body.shifts['monday']);
                done();
            });
        });
    });

    it('should create 3 monday shifts, then delete 1', function (done) {
        var apiCreateShift = function (shift, day, callback) {
            return function () {
                api.put('/shifts/add').send({
                    shift: shift,
                    day: day
                }).expect(200).end(callback);
            }
        };

        var shifts = [shift1, shift2, shift3];
        shifts.sort(function (a, b) {
            return a.startTime[0] - b.startTime[0] || a.startTime[1] - b.startTime[1];
        });

        function checkShifts() {
            api.get('/shifts').expect(200).end(function (err, res) {
                if (err) throw err;
                var resShifts = res.body.shifts.monday;
                resShifts.sort(function (a, b) {
                    return a.startTime[0] - b.startTime[0] || a.startTime[1] - b.startTime[1];
                });
                var shiftsNoShift1 = shifts.filter(function (shift) {
                    return shift.name !== SHIFT1_NAME;
                });
                chaiObjEquality.containsEqualProps(shiftsNoShift1, resShifts);
                done();
            });
        }

        function deleteShift(callback) {
            return function () {
                api.delete('/shifts').send({
                    dayName: 'monday',
                    shiftName: SHIFT1_NAME
                }).expect(200).end(callback);
            }
        }

        var createShift3 = apiCreateShift(shift3, 'monday', deleteShift(checkShifts));
        var createShift2 = apiCreateShift(shift2, 'monday', createShift3);
        var createShift1 = apiCreateShift(shift1, 'monday', createShift2);
        createShift1();

    });

})
;

var chai = require('chai');
var expect = chai.expect;


var chaiObjectEquality = {};
//in all b is supposed to contain a
//goal is to see if b not only contains all of a's properties but those
//properties have equal values too
function copyContainedObjectProps(a, b) {
    var bOnlyAProps = Array.isArray(a) ? [] : {};
    var keyProps = Object.keys(a).map(function (key) {
        var bValue;
        if (a[key] instanceof Object && b[key] instanceof Object) {
            bValue = copyContainedObjectProps(a[key], b[key]);
        } else {
            bValue = b[key];
        }
        return [key, bValue];
    });

    keyProps.forEach(function (keyProp) {
        bOnlyAProps[keyProp[0]] = keyProp[1];
    });
    return bOnlyAProps;
}

function objectsContainEqualProps(a, b) {
    var bOnlyAProps = copyContainedObjectProps(a, b);
    chai.config.truncateThreshold = 0;
    expect(a).to.deep.equal(bOnlyAProps);
}
chaiObjectEquality.containsEqualProps = function containsEqualProps(a, b) {
    expect(a).to.be.an.instanceof(Object);
    expect(b).to.be.an.instanceOf(Object);
    if (a instanceof Array && b instanceof Array) {
        expect(a.length).to.equal(b.length, 'expected arrays to be equal length');
        a.forEach(function (obj, index) {
            containsEqualProps(obj, b[index]);
        });
    } else if(a instanceof Object && b instanceof Object) {
        objectsContainEqualProps(a, b);
    } else {
        var message = a instanceof Array ? 'Array, Parameter 2 is Object' : 'Object, Parameter 2 is Array';
        expect(false).to.equal(true, 'Parameter 1 is ' + message);
    }

};


module.exports = chaiObjectEquality;
describe.skip('integrated user test', function () {
    before(function removeUsers(done) {
        User.remove({}, function (err) {
            done();
        });
    });
    it('should create a user', function (done) {
        var newUser = {
            firstName: 'Jean',
            lastName: 'Claude Van-Damme',
            userName: 'Jeanny',
            password: 'I am the best at karate'
        };

        var createManager = new Promise(function (resolve, reject) {
            api.post('/manager')
                .set('Accept', 'application/json')
                .type('json')
                .send({newUser: newUser})
                .expect(200).end(function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });

        createManager.then(function () {
            api.get('/admin/lastUser').expect(200).end(function (err, res) {
                if (err) throw err;
                var lastUser = res.body;
                expect(newUser.firstName).to.equal(lastUser.firstName);
                expect(newUser.lastName).to.equal(lastUser.lastName);
                expect(newUser.userName).to.equal(lastUser.userName);
                done();
            });
        });
    });

    it('should logout', function () {
        api.put('/manager/logout')
            .set('Accept', 'application/json')
            .type('json')
            .expect(200).end(function (err, res) {
            if (err) throw err;
        });
    });
});


describe('role-plugin', function () {
    var mongoose = require('mongoose');
    var testManagerSchema = mongoose.Schema({});
    testManagerSchema.plugin(require(projectPath('/models/user/user-plugin')));
    testManagerSchema.plugin(require(projectPath('/models/manager/plugins/role-plugin')));
    var TestManager = mongoose.model('TestManager', testManagerSchema);
    var USER_DATA = {
        firstName: 'Bob',
        lastName: 'Belcher',
        userName: 'BurgerBoss',
        password: 'I love burgers'
    };
    const ROLE_1_NAME = 'cook', ROLE_1_HOW_MANY = 3;
    const ROLE_1 = {
        roleName: ROLE_1_NAME,
        howManyNeeded: ROLE_1_HOW_MANY
    };
    const ROLE_2_NAME = 'waiter', ROLE_2_HOW_MANY = 5;
    const ROLE_2 = {
        roleName: ROLE_2_NAME,
        howManyNeeded: ROLE_2_HOW_MANY
    };
    var userId;

    beforeEach(function (done) {
        TestManager.remove({}, function () {
            var testManager = new TestManager(USER_DATA);
            testManager.save(function (err, user) {
                userId = user._id;
                done();
            });
        });
    });

    after(function (done) {
        mongoose.connection.db.dropCollection('TestManager', function (err, result) {
            mongoose.connection.models = {};
            done();
        });
    });

    it('should create and persist a role', function () {
        var roleId;

        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY).then(function (generatedRoleId) {
            roleId = generatedRoleId;
            return TestManager.loadUser(userId);
        }).then(function (testManager) {
            chaiObjEquality.containsEqualProps(ROLE_1, testManager.roles.id(roleId));
        });
    });

    it('should create 2 roles and retrieve them', function () {
        return Promise.all(
            [TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY),
                TestManager.addRole(userId, ROLE_2_NAME, ROLE_2_HOW_MANY)]
        ).then(function () {
            return TestManager.getRoles(userId);
        }).then(function (userRoles) {
            expect(userRoles.length).to.equal(2);
            expect(deleteObjIds(userRoles)).to.contain(ROLE_1);
            expect(deleteObjIds(userRoles)).to.contain(ROLE_2);
        });
    });

    it('should create 2 roles and delete one', function () {
        return Promise.all(
            [TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY),
                TestManager.addRole(userId, ROLE_2_NAME, ROLE_2_HOW_MANY)]
        ).then(function (resolvedRoleIdArray) {
            return TestManager.deleteRole(userId, resolvedRoleIdArray[0])
        }).then(function () {
            return TestManager.getRoles(userId);
        }).then(function (userRoles) {
            expect(userRoles.length).to.equal(1);
            expect(deleteObjIds(userRoles)).to.contain(ROLE_2);
        });
    });

    it('should update role while and not change role._id property', function () {
        var updatedRole;
        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY)
            .then(function (roleId) {
                updatedRole = {
                    _id: roleId,
                    roleName: ROLE_2_NAME,
                    howManyNeeded: ROLE_2_HOW_MANY
                };
                return TestManager.updateRole(userId, updatedRole)
            }).then(function (user) {
                return TestManager.getRoles(userId);
            }).then(function (roles) {
                expect(roles.length).to.equal(1);
                expect(roles[0]).to.deep.equal({
                    _id: updatedRole._id.toString(),
                    roleName: updatedRole.roleName,
                    howManyNeeded: updatedRole.howManyNeeded
                });
            });
    });


    it('should try to add a role with the same name of a role that is already added', function () {
        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY)
            .then(function () {
                return TestManager.addRole(userId, ROLE_1_NAME, ROLE_2_HOW_MANY);
            }).then(function () {
                expect.fail('should reject adding role due to unique name requirement');
            }).catch(function (errObj) {
                expect(errObj.message).to.equal('Duplicate role names');
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj.roles).to.contain(ROLE_1_NAME);
            });
    });

    it('should try to update a role to have a name that another role already has', function () {
        var role1Id;
        return TestManager.addRole(userId, ROLE_1_NAME, ROLE_1_HOW_MANY)
            .then(function (generatedId) {
                role1Id = generatedId;
                return TestManager.addRole(userId, ROLE_2_NAME, ROLE_2_HOW_MANY);
            })
            .then(function () {
                return TestManager.updateRole(userId, {
                    _id: role1Id.toString(),
                    roleName: ROLE_2_NAME,
                    howManyNeeded: ROLE_1_HOW_MANY
                });
            })
            .then(function () {
                expect.fail('should reject updating role due to unique name requirement');
            })
            .catch(function (errObj) {
                expect(errObj.message).to.equal('Duplicate role names');
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj.roles).to.contain(ROLE_2_NAME);
            });
    })

});
describe.skip('manager-model', function(){
    var managerData = require(projectPath('/models/manager/test/manager-stub'));
    it('should create a new user', function(done){
       User.save(managerData.createManagerData, function(err, user){
           expect(err).to.be.false;
           done();
       });
   });
});



describe.only('template-schedule-plugin', function () {
    var mongoose = require('mongoose');
    var moment = require('moment');
    //TODO(EG) stub data just copied from role-plugin-test, eventually consolidate
    var testManagerSchema = mongoose.Schema({});
    testManagerSchema.plugin(require(projectPath('/models/user/user-plugin')));
    testManagerSchema.plugin(require(projectPath('/models/manager/plugins/role-plugin')));
    testManagerSchema.plugin(require(projectPath('/models/schedule/template-schedule-plugin')));
    var TestManager = mongoose.model('TemplateScheduleTestManager', testManagerSchema);
    const ROLE_1_NAME = 'cook', ROLE_1_HOW_MANY = 3;
    const ROLE_1 = {
        roleName: ROLE_1_NAME,
        howManyNeeded: ROLE_1_HOW_MANY
    };
    const ROLE_2_NAME = 'waiter', ROLE_2_HOW_MANY = 5;
    const ROLE_2 = {
        roleName: ROLE_2_NAME,
        howManyNeeded: ROLE_2_HOW_MANY
    };
    var userId;
    var templateScheduleId;
    var USER_DATA = {
        firstName: 'Bob',
        lastName: 'Belcher',
        userName: 'BurgerBoss',
        password: 'I love burgers',
        roles: [ROLE_1, ROLE_2]
    };

    beforeEach(function (done) {
        templateScheduleId = null;
        TestManager.remove({}, function () {
            var testManager = new TestManager(USER_DATA);
            testManager.save(function (err, user) {
                userId = user._id;
                done();
            });
        });
    });

    after(function (done) {
        mongoose.connection.db.dropCollection('TestManager', function (err, result) {
            mongoose.connection.models = {};
            done();
        });
    });

    it('should create a blank template schedule', function () {
        var schedule = {
            days: []
        };
        return TestManager.addTemplateSchedule(userId, schedule)
            .then(function (generatedId) {
                templateScheduleId = generatedId;
                return TestManager.getTemplateSchedules(userId);
            })
            .then(function (templateSchedules) {
                expect(templateSchedules.length).to.equal(1);
                expect(templatesSchedules.id(templateScheduleId)).to.deep.equal({
                    _id: templateScheduleId,
                    days: []
                });
            });
    });

    it('should create a template schedule with two days', function () {
        var schedule = {
            days: [{}, {}]
        };
        return TestManager.addTemplateSchedule(userId, schedule)
            .then(function (generatedId) {
                templateScheduleId = generatedId;
                return TestManager.getTemplateSchedules(userId);
            })
            .then(function (templateSchedules) {
                expect(templateSchedules.length).to.equal(1);
                expect(templateSchedules.id(templateScheduleId).to.deep.equal({//delete Obj Ids

                }));
            });
    });

    it('should add a blank day to a work schedule', function () {
        var schedule = {
            days: []
        };
        return TestManager.addTemplateSchedule(userId, schedule)
            .then(function (generatedId) {
                templateScheduleId = generatedId;
                schedule.days.push({});
                return TestManager.updateTemplateSchedule(userId, templateScheduleId, schedule);
            }).then(function () {
                return TestManager.getTemplateSchedules(userId);
            }).then(function (templateSchedules) {
                var templateSchedule = templateSchedules.id(templateScheduleId);
                expect(templateSchedule.days.length).to.be(1);
                expect(deleteObjIds(templateScheduel.days[0])).to.deep.equal();
                expect(deleteObjIds(templateSchedule)).to.deep.equal(schedule);
            });
    });

    it('should add a day with two shifts to a work schedule', function () {
        var schedule = {
            days: [{}, {}]
        };
        return TestManager.addTemplateSchedule(userId, schedule)
            .then(function (generatedId) {
                templateScheduleId = generatedId;
                return TestManager.getTemplateSchedules(userId);
            })
            .then(function (templateSchedules) {
                expect(deleteObjIds(templateSchedules.id(templateScheduleId)))
                    .to.deep.equal(schedule);
            });
    });

    it('should update a template schedule by adding a shift to its first day and one shift having a day', function () {
        var shift = {
            startTime: moment('2016-01-01T07:00Z'),
            endTime: moment('2016-01-01T09:00Z')
        };
        var schedule = {
            days: [{
                shifts: []
            }, {}]
        };
        var day1Id, day2Id;
        expect.fail("not implemented");
        return TestManager.addTemplateSchedule(userId, schedule)
            .then(function (generatedId) {
                templateScheduleId = generatedId;
                return TestManager.getTemplateSchedules(userId);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules.id(templateScheduleId);
                day1Id = templateSchedule.days[0]._id;
                day2Id = templateSchedule.days[1]._id;
                templateSchedule.days[0].shifts.push({});
                return TestManager.updateTemplateSchedule(userId, scheduleId, schedule);
            })
            .then(function () {
                return TestManager.getTemplateSchedules(userId);
            })
            .then(function(templateSchedules){
                var templateSchedule = templateSchedules.id(templateScheduleId);
            });
    });

    it('should delete a shift from a template schedule', function () {
        var scheduleStub = {
            days: [{
                shifts: [{}]
            }, {
                shifts: [{}, {}]
            }] //might not initialize correctly if empty
        };
        return TestManager.addTemplateSchedule(userId, scheduleStub)
            .then(function (generatedId) {
                templateScheduleId = generatedId;
                TestManager.getTemplateSchedules(userId);
            }).then(function (templateSchedules) {
                var templateSchedule = templateSchedules.id(templateScheduleId);
                expect(templateSchedule.days.length).to.equal(2);
                expect(templateSchedule.days[0].shifts.length).to.equal(1);//TODO(EG)preserved order should be separate test
                expect(templateSchedule.days[1].shifts.length).to.equal(2);
                scheduleStub.days[0].shifts.splice(0, 1);
                return TestManager.updateTemplateSchedule(userId, templateScheduleId, scheduleStub);
            })
            .then(function () {
                return TestManager.getTemplateSchedules(userId);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules.id(templateScheduleId);
                expect(deleteObjIds(templateSchedule)).to.deep.equal(scheduleStub);
            });
    });

    it('should add a template Schedule that has a shift and a role', function () {
        schedule
        expect.fail("not implemented");
    });

    it('should add delete a role from a scheduled shift', function () {
        expect.fail("not implemented");
    });

    it('should update a role on a scheduled shift', function () {
        expect.fail("not implemented");
    });
});
describe.skip('work-schedule-plugin', function(){


});
describe('user-plugin', function
    () {
    var mongoose = require('mongoose');
    var UserPlugin = require(projectPath('/models/user/user-plugin'));
    var testUserSchema = mongoose.Schema({});
    testUserSchema.plugin(UserPlugin);
    var TestUser = mongoose.model('testUser', testUserSchema, 'testUser');

    const USER_NAME = 'TheBurgerBoss';
    const FIRST_NAME = 'Bob';
    const LAST_NAME = 'Belcher';
    const PASSWORD = 'I love Burgers';
    var TEST_USER = new TestUser({
        userName: USER_NAME,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        password: PASSWORD
    });

    var createUser = function (user) {
        return new Promise(function (resolve, reject) {
            user.save(function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        });
    };

    before(function(done){
        TestUser.remove({}, function(){
            done();
        });
    });

    after(function (done) {
        mongoose.connection.db.dropCollection('testUser', function (err, result) {
            done();
        });
    });


    it('should persist and retrieve user data', function (done) {
        createUser(TEST_USER).then(function (user) {
            TestUser.loadUser(user._id).then(function (testUser) {
                expect(testUser.firstName).to.equal(FIRST_NAME);
                expect(testUser.lastName).to.equal(LAST_NAME);
                expect(testUser.userName).to.equal(USER_NAME);
                testUser.comparePassword(PASSWORD).then(function (match) {
                    expect(match).to.be.true;
                    done();
                });
            });
        });
    });

    it('should not allow required fields to be blank', function (done) {
        var emptyUser = new TestUser({});
        createUser(emptyUser).catch(function (err) {
            expect(err.errors.firstName.type).to.equal('required');
            expect(err.errors.lastName.type).to.equal('required');
            expect(err.errors.userName.type).to.equal('required');
            expect(err.errors.password.type).to.equal('required');
            done();
        });
    });
});
var noDuplicatesFn = require(projectPath('/models/utility-hooks/check-for-duplicates'));
describe('check for duplicates', function () {
    var DOC_ARRAY_NAME = 'people';
    var PROP_NAME = 'name';
    var duplicateError;

    function ClassRoom() {
        this[DOC_ARRAY_NAME] = [];
        this.noDuplicates = noDuplicatesFn(DOC_ARRAY_NAME, PROP_NAME);
    }

    function callback(error) {
        duplicateError = error;
    }

    beforeEach(function () {
        duplicateError = undefined;
    });

    it('should add two people with different names and find no duplicates', function () {
        var classRoom = new ClassRoom();
        var person1 = {}, person2 = {};
        person1[PROP_NAME] = 'bob';
        person2[PROP_NAME] = 'chris';
        classRoom[DOC_ARRAY_NAME].push(person1, person2);
        classRoom.noDuplicates(callback);
        expect(duplicateError).to.not.be.ok;
    });

    it('should add 5 people with two pairs of matching names', function () {
        var classRoom = new ClassRoom();
        var names = ['bob', 'chris', 'bob', 'chris', 'kathy'];
        var count = 0;
        classRoom[DOC_ARRAY_NAME] = names.map(function (name) {
            var person = {};
            person[PROP_NAME] = name;
            person.count = count++;
            return person;
        });
        classRoom.noDuplicates(callback);
        expect(duplicateError).to.be.ok;
        expect(duplicateError.message).to.equal('Duplicate name');
        expect(duplicateError.chris.length).to.equal(2);
        expect(duplicateError.chris).includes({name: 'chris', count: 3}, {name: 'chris', count: 1});
        expect(duplicateError.bob.length).to.equal(2);
        expect(duplicateError.bob).includes({name: 'bob', count: 0}, {name: 'bob', count: 2});
    })


});
//# sourceMappingURL=test.js.map