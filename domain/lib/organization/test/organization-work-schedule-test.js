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