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



describe.only('organization work schedule', function () {
    var expect = require('chai').expect;
    var Promise = require('bluebird');
    var moment = require('moment');
    var _ = require('underscore');
    var moment = require('moment');
    var RepoStub = require('./resources/organization-repo-stub.js');
    var repo_stub = new RepoStub();
    var Organization = require(projectPath('/domain/organization/organization.js'))(RepoStub);
    var containsEqualProperties = require(projectPath('/test-utils/containsEqualProps'));
    var WORK_SCHEDULE_ID = 'workScheduleId';
    var WORK_DAY_1_DATE = moment('2015-01-15');
    var WORK_DAY_2_DATE = moment('2015-01-16');
    var WORK_DAY_3_DATE = moment('2015-01-17');
    var WORK_DAY_DATES = [WORK_DAY_1_DATE, WORK_DAY_2_DATE, WORK_DAY_3_DATE];
    var ORGANIZATION_1;
    beforeEach(function () {
        return Organization(repo_stub.ORGANIZATION_1_ID)
            .then(function (organization) {
                ORGANIZATION_1 = organization;
            });
    });

    it('should create a blank work schedule from a template schedule', function () {
        var startDay = 0;
        var workSchedule = {
            _id: WORK_SCHEDULE_ID,
            days: repo_stub.TEMPLATE_SCHEDULE_1.days.map(function (templateDay, index) {
                return _.extend({}, templateDay, {date: WORK_DAY_DATES[index]});
            }),
            madeFromTemplateScheduleId: repo_stub.TEMPLATE_SCHEDULE_1_ID
        };
        var createdWorkSchedule =
            ORGANIZATION_1.createWorkScheduleFromTemplateSchedule(repo_stub.TEMPLATE_SCHEDULE_1_ID,
                startDay, WORK_DAY_1_DATE, WORK_DAY_2_DATE);

        containsEqualProperties.containsEqualProps(workSchedule, createdWorkSchedule);
    });
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
    //TODO(EG) fix tests: howManyNeeded should be undefined for general roles of the organization
    //TODO(EG) need to test adding role to template-shift and work shift
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
                expect(errObj.message).to.equal('Duplicate roleName');
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj[ROLE_1_NAME].length).to.equal(2);//TODO(EG) specify what behavior cooks object should be
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
                expect(errObj.message).to.equal('Duplicate roleName');
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj[ROLE_2_NAME].length).to.equal(2);
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
describe('template-schedule-plugin', function () {
//TODO(EG) stub data just copied from role-plugin-test, eventually consolidate
    var mongoose = require('mongoose');
    var _ = require('underscore');
    var testManagerSchema = mongoose.Schema({});

    const ROLE_1_NAME = 'cook', ROLE_1_HOW_MANY = 3, ROLE_1_ID = new mongoose.Types.ObjectId();
    const ROLE_1 = {
        _id: ROLE_1_ID,
        roleName: ROLE_1_NAME
    };
    const ROLE_2_NAME = 'waiter', ROLE_2_HOW_MANY = 5, ROLE_2_ID = new mongoose.Types.ObjectId();
    const ROLE_2 = {
        _id: ROLE_2_ID,
        roleName: ROLE_2_NAME
    };
    const USER_ID = new mongoose.Types.ObjectId();
    const TEMPLATE_SCHEDULE_ID = new mongoose.Types.ObjectId();
    var USER_DATA = {
        _id: USER_ID,
        firstName: 'Bob',
        lastName: 'Belcher',
        userName: 'BurgerBoss',
        password: 'I love burgers',
        roles: [ROLE_1, ROLE_2]
    };

    var SCHEDULE_STUB_BLANK_SHIFTS = {
        _id: TEMPLATE_SCHEDULE_ID,
        name: 'regular',
        days: [{
            startTime: [7, 0],
            endTime: [17, 0],
            shifts: [{
                roles: [],
                name: 'breakfast',
                startTime: [7, 0],
                endTime: [12, 30]
            }, {
                roles: [],
                name: 'lunch',
                startTime: [12, 30],
                endTime: [17, 0]
            }]
        }, {
            startTime: [7, 0],
            endTime: [17, 0],
            shifts: [{
                roles: [],
                name: 'all day',
                startTime: [7, 0],
                endTime: [17, 0]
            }]
        }] //might not initialize correctly if empty
    };

    testManagerSchema.plugin(require(projectPath('/models/user/user-plugin')));
    testManagerSchema.plugin(require(projectPath('/models/manager/plugins/role-plugin')));
    testManagerSchema.plugin(require(projectPath('/models/template-schedule/template-schedule-plugin')));
    var TestManager = mongoose.model('TemplateScheduleTestManager', testManagerSchema);

    beforeEach(function (done) {
        TestManager.remove({}, function () {
            var testManager = new TestManager(USER_DATA);
            testManager.save(function (err, user) {
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
            _id: TEMPLATE_SCHEDULE_ID,
            name: 'breakfast',
            days: []
        };
        return TestManager.addTemplateSchedule(USER_ID, schedule)
            .then(function (generatedId) {
                expect(generatedId.equals(TEMPLATE_SCHEDULE_ID));
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                expect(templateSchedules.length).to.equal(1);
                expect(templateSchedules[0]).to.deep.equal({
                    _id: TEMPLATE_SCHEDULE_ID.toString(),
                    name: 'breakfast',
                    days: []
                });
            });
    });



    it('should create a template schedule with two days', function () {
        var schedule = {
            _id: TEMPLATE_SCHEDULE_ID,
            name: 'breakfast',
            days: [
                {
                    startTime: [4, 30],
                    endTime: [7, 30],
                    shifts: []
                },
                {
                    startTime: [8, 0],
                    endTime: [20, 10],
                    shifts: []
                }]
        };
        return TestManager.addTemplateSchedule(USER_ID, schedule)
            .then(function (generatedId) {
                expect(generatedId.equals(TEMPLATE_SCHEDULE_ID));
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                expect(templateSchedules.length).to.equal(1);
                templateSchedules[0].days.forEach(function (day) {
                    expect(day._id instanceof mongoose.Types.ObjectId);
                });
                expect(deleteObjIds(templateSchedules[0])).to.deep.equal(deleteObjIds(schedule));
            });
    });

    it('should add a blank day to a work schedule', function () {
        var schedule = {
            _id: TEMPLATE_SCHEDULE_ID,
            name: 'breakfast',
            days: []
        };
        return TestManager.addTemplateSchedule(USER_ID, schedule)
            .then(function () {
                schedule.days.push({
                    startTime: [4, 30],
                    endTime: [7, 30],
                    shifts: []
                });
                return TestManager.updateTemplateSchedule(USER_ID, TEMPLATE_SCHEDULE_ID, schedule);
            }).then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            }).then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                expect(templateSchedule.days.length).to.equal(1);
                expect(deleteObjIds(templateSchedule)).to.deep.equal(deleteObjIds(schedule));
            });
    });



    it('should add a day with two shifts to a work schedule', function () {
        var schedule = {
            name: 'breakfast',
            days: [{
                startTime: [4, 30],
                endTime: [17, 30],
                shifts: [{
                    name: 'open',
                    roles: [],
                    startTime: [4, 30],
                    endTime: [9, 0]
                }, {
                    name: 'breakfast',
                    roles: [],
                    startTime: [9, 0],
                    endTime: [17, 30]
                }]
            }]
        };
        return TestManager.addTemplateSchedule(USER_ID, schedule)
            .then(function (generatedId) {
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                expect(deleteObjIds(templateSchedules[0])).to.deep.equal(schedule);
            });
    });

    it('should update a template schedule by adding a shift to its first day', function () {
        var shift = {
            name: 'breakfast',
            startTime: [6, 30],
            endTime: [12, 30],
            roles: []
        };
        var schedule = {
            _id: TEMPLATE_SCHEDULE_ID,
            name: 'regular',
            days: [{
                startTime: [6, 30],
                endTime: [17, 30],
                shifts: []
            }, {
                startTime: [8, 0],
                endTime: [16, 30],
                shifts: []
            }]
        };
        return TestManager.addTemplateSchedule(USER_ID, schedule)
            .then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                expect(deleteObjIds(templateSchedule)).to.deep.equal(deleteObjIds(schedule));
                day1Id = templateSchedule.days[0]._id;
                day2Id = templateSchedule.days[1]._id;
                templateSchedule.days[0].shifts.push(shift);
                schedule.days[0].shifts.push(shift);
                return TestManager.updateTemplateSchedule(USER_ID, TEMPLATE_SCHEDULE_ID, schedule);
            })
            .then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                expect(deleteObjIds(templateSchedule)).to.deep.equal(deleteObjIds(schedule));
            });
    });

    it('should delete a shift from a template schedule', function () {

        return TestManager.addTemplateSchedule(USER_ID, SCHEDULE_STUB_BLANK_SHIFTS)
            .then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            }).then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                expect(templateSchedule.days.length).to.equal(2);
                expect(templateSchedule.days[0].shifts.length).to.equal(2);//TODO(EG)preserved order should be separate test
                expect(templateSchedule.days[1].shifts.length).to.equal(1);
                SCHEDULE_STUB_BLANK_SHIFTS.days[0].shifts.splice(0, 1);
                templateSchedule.days[0].shifts.splice(0, 1);
                return TestManager.updateTemplateSchedule(USER_ID, TEMPLATE_SCHEDULE_ID, SCHEDULE_STUB_BLANK_SHIFTS);
            })
            .then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                expect(deleteObjIds(templateSchedule)).to.deep.equal(deleteObjIds(SCHEDULE_STUB_BLANK_SHIFTS));
            });
    });



    it('should add a template Schedule that has a shift and a role', function () {
        var role1 = {
            _id: ROLE_1_ID,
            howManyNeeded: ROLE_1_HOW_MANY,
            roleName: ROLE_1_NAME
        };
        var scheduleStub = {
            name: 'regular',
            days: [{
                startTime: [6, 30],
                endTime: [17, 30],
                shifts: [{
                    startTime: [6, 30],
                    endTime: [11, 0],
                    name: 'breakfast',
                    roles: [_.extendOwn({}, ROLE_1)]
                }]
            }, {
                startTime: [7, 30],
                endTime: [15, 30],
                shifts: []
            }]
        };
        scheduleStub.days[0].shifts[0].roles[0].howManyNeeded = 4;
        return TestManager.addTemplateSchedule(USER_ID, scheduleStub)
            .then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                expect(deleteObjIds(templateSchedule)).to.deep.equal(deleteObjIds(scheduleStub));
            });
    });

    it('should try to add a role to shift that doesn\'t exist as a general role', function () {
        var clownRole = {
            _id: new mongoose.Types.ObjectId(),
            roleName: 'Clown',
            howManyNeeded: 4
        };
        var roleDiffers = {
            _id: ROLE_1_ID,
            roleName: ROLE_2_NAME,
            howManyNeeded: 3
        };
        var missingId = _.extendOwn({}, ROLE_2);
        delete missingId._id;
        var invalidRoles = [
            {
                role: roleDiffers,
                reason: 'Organization role corresponding to _id differs from scheduled role'
            },
            {

                role: clownRole,
                reason: '_id does not match organization role'

            },
            {
                role: missingId,
                reason: 'Missing _id property',
                invalidProperties: ['_id']
            }

        ];
        return TestManager.addTemplateSchedule(USER_ID, SCHEDULE_STUB_BLANK_SHIFTS)
            .then(function () {
                return TestManager.getTemplateSchedules(USER_ID);
            })
            .then(function (templateSchedules) {
                var templateSchedule = templateSchedules[0];
                templateSchedule.days[0].shifts[0].roles.push(roleDiffers, clownRole, missingId);
                return TestManager.updateTemplateSchedule(USER_ID, TEMPLATE_SCHEDULE_ID, templateSchedule);
            })
            .then(function(){
                expect.fail("should reject");
            })
            .catch(function(errObj){
                expect(errObj.message).to.equal(('Invalid roles')); //TODO(EG)more specific error message
                expect(Object.keys(errObj).length).to.equal(1);
                expect(errObj.invalidRoles.length).to.equal(3);
                expect(errObj.invalidRoles).to.deep.have.members(invalidRoles);
            });
    });

    //TODO(EG) implement more
    //it('should update a schedule by deleting one role and updating the other on a shift', function () {
    //    expect.fail"not implemented");
    //});



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
(function () {
    var _ = require('underscore');
    var moment = require('moment');
    var Promise = require('bluebird');
    var mongoose = require('mongoose');

    var organizationSchema = mongoose.Schema({});
    organizationSchema.plugin(require(projectPath('/models/manager/plugins/role-plugin')));
    organizationSchema.plugin(require(projectPath('/models/template-schedule/template-schedule-plugin')));
    organizationSchema.plugin(require(projectPath('/models/work-schedule/work-schedule-plugin')));
    var TestManager = mongoose.model('WorkScheduleTest', organizationSchema);

    const ORG_ID = mongoose.Types.ObjectId();
    const ROLE_1_NAME = 'cook', ROLE_1_ID = mongoose.Types.ObjectId();
    const ROLE_2_NAME = 'waiter', ROLE_2_ID = mongoose.Types.ObjectId();
    TestManager.roles = [{roleName: ROLE_1_NAME, _id: ROLE_1_ID}, {roleName: ROLE_2_NAME, _id: ROLE_2_ID}];

    const ROLE_1_NEEDED = 2, ROLE_2_NEEDED = 4;
    const SHIFT_1_NAME = 'breakfast', SHIFT_1_ID = mongoose.Types.ObjectId();
    const SHIFT_1_START_TIME = [6, 30], SHIFT_1_END_TIME = [11, 30];
    const SHIFT_2_ID = new mongoose.Types.ObjectId(), SHIFT_2_NAME = 'evening';
    const SHIFT_2_START_TIME = [11, 30], SHIFT_2_END_TIME = [5, 30];
    const TEMPLATE_SCHEDULE_ID = mongoose.Types.ObjectId();

    var SHIFT_1 = {
        _id: SHIFT_1_ID,
        name: SHIFT_1_NAME,
        startTime: SHIFT_1_START_TIME,
        endTime: SHIFT_1_END_TIME,
        roles: [{
            organizationRoleId: ROLE_1_ID,
            howManyNeeded: ROLE_1_NEEDED
        }, {
            organizationRoleId: ROLE_2_ID,
            howManyNeeded: ROLE_2_NEEDED
        }]
    };

    var SHIFT_2 = {
        _id: SHIFT_2_ID,
        name: SHIFT_2_NAME,
        startTime: SHIFT_2_START_TIME,
        endTime: SHIFT_2_END_TIME
    };

    var TEMPLATE_SCHEDULE = {
        _id: TEMPLATE_SCHEDULE_ID,
        name: 'test schedule',
        days: [
            {
                shifts: [SHIFT_1]
            },
            {
                shifts: [SHIFT_1, SHIFT_2]//note shift ids can be the same across days, must be unique in the same day
            }
        ]
    };
    describe('work-schedule-plugin', function () {

        before(function () {
            return new Promise(function (resolve, reject) {
                var testManager = new TestManager({_id: ORG_ID});
                testManager.save(function (err, user) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve();
                    }
                })
            }).then(function () {
                return TestManager.addRole(ORG_ID, ROLE_1_NAME);
            }).then(function () {
                return TestManager.addRole(ORG_ID, ROLE_2_NAME);
            }).then(function () {
                return TestManager.addTemplateSchedule(ORG_ID, TEMPLATE_SCHEDULE);
            });
        });

        after(function () {
            return new Promise(function (resolve, reject) {
                mongoose.connection.collections['TemplateScheduleTestManager'].drop(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });


        it('should add a 1 day blank work schedule', function () {
            var startDate = moment('2016-01-01');
            var endDate = moment('2016-01-01');
            var startDay = 1;
            var workScheduleId;
            return TestManager.addWorkScheduleFromTemplateSchedule(ORG_ID, TEMPLATE_SCHEDULE_ID, startDay, startDate, endDate)
                .then(function (generatedId) {
                    workScheduleId = generatedId;
                    return TestManager.getWorkSchedules(ORG_ID);
                })
                .then(function (workSchedules) {
                    var workSchedule = workSchedules.id(workScheduleId);
                    expect(workSchedule).to.deep.equal(require('./resources/blank-work-schedule.json'));
                });
        });

        it('should add a 2 day blank work schedule', function () {
            expect.fail("not implemented");
        });

        it('should update an added work schedule with 4 employees', function () {
            expect.fail("not implemented");
        });

        it('should update an added work schedule by deleting 4 employees', function () {
            expect.fail("not implemented");
        });

        it('should update a work schedule with an additional shift', function () {
            expect.fail("not implemented");
        });

        it('should update a work schedule by deleting a shift', function () {
            expect.fail("not implemented");
        });


    });
})
();
//# sourceMappingURL=test.js.map