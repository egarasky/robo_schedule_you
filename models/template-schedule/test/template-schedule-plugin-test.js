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