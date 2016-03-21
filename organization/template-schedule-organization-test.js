"use strict";
var organization_1 = require("../../organization/organization");
var organization_stub_1 = require("../stubs/organization-stub");
var template_schedule_stub_1 = require("../stubs/template-schedule-stub");
var template_schedule_1 = require("../../schedule/template/template-schedule");
describe('domain template schedule functionality for organization', function () {
    var expect = require('chai').expect;
    var _ = require('underscore');
    var bobsBurgersOrg;
    beforeEach(function () {
        bobsBurgersOrg = organization_1.Organization.organization(organization_stub_1.ORGANIZATION);
    });
    it('should add a blank template schedule', function () {
        bobsBurgersOrg.addTemplateSchedule(template_schedule_stub_1.BLANK_TEMPLATE_SCHEDULE);
        expect(bobsBurgersOrg.getTemplateSchedules().length).to.equal(1);
        expect(bobsBurgersOrg.getTemplateSchedules())
            .to.deep.include(template_schedule_1.TemplateSchedule.templateSchedule(template_schedule_stub_1.BLANK_TEMPLATE_SCHEDULE));
        expect(bobsBurgersOrg.getTemplateSchedule(template_schedule_stub_1.BLANK_TEMPLATE_SCHEDULE.id))
            .to.deep.equal(template_schedule_1.TemplateSchedule.templateSchedule(template_schedule_stub_1.BLANK_TEMPLATE_SCHEDULE));
    });
    it('should add a week long template schedule', function () {
        expect.fail('not implemented');
    });
    it('should update a template schedule', function () {
        expect.fail('not implemented');
    });
    it('should remove a template schedule', function () {
        expect.fail('not implemented');
    });
    //TODO validation tests
});
//# sourceMappingURL=template-schedule-organization-test.js.map