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