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