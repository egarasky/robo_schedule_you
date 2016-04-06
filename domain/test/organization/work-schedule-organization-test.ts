import ExpectStatic = Chai.ExpectStatic;
import {TemplateSchedule} from "../../schedule/template/template-schedule";
import {BLANK_TEMPLATE_SCHEDULE, WEEK_TEMPLATE_SCHEDULE} from "../stubs/template-schedule-stub";
import MomentStatic = moment.MomentStatic;
import {WorkSchedule} from "../../schedule/work/work-schedule";
import {WEEK_WORK_SCHEDULE_END_DATE} from "../stubs/work-schedule-stub";
import {SHORT_WORK_SCHEDULE_START_DATE} from "../stubs/work-schedule-stub";
import {SHORT_WORK_SCHEDULE_END_DATE} from "../stubs/work-schedule-stub";
import {SHORT_WORK_SCHEDULE} from "../stubs/work-schedule-stub";
import {WEEK_WORK_SCHEDULE_START_DATE} from "../stubs/work-schedule-stub";
import {WEEK_WORK_SCHEDULE} from "../stubs/work-schedule-stub";
import {Employee} from "../../employee/employee";
import {BOB_BELCHER} from "../stubs/employees-stub";
import {Organization} from "../../organization/organization";
describe('domain work schedule', function () {
    var expect:ExpectStatic = require('chai').expect;
    var moment:MomentStatic = require('moment');
    var weekTemplateSchedule;
    var organization;
    beforeEach(function () {
        weekTemplateSchedule = TemplateSchedule.templateSchedule(WEEK_TEMPLATE_SCHEDULE);
    });
    it('should create a work schedule from a week long template schedule', function () {

        var shortWorkSchedule = weekTemplateSchedule.createWorkSchedule(SHORT_WORK_SCHEDULE_START_DATE,
            SHORT_WORK_SCHEDULE_END_DATE);
        expect(shortWorkSchedule).to.deep.equal(SHORT_WORK_SCHEDULE);

        var weekWorkSchedule = weekTemplateSchedule.createWorkSchedule(WEEK_WORK_SCHEDULE_START_DATE,
            WEEK_WORK_SCHEDULE_END_DATE);
        expect(weekWorkSchedule).to.deep.equal(WEEK_WORK_SCHEDULE);
    });

    it('should update a work schedule by adding an employee', function () {

        var weekWorkSchedule = weekTemplateSchedule.createWorkSchedule(SHORT_WORK_SCHEDULE_START_DATE,
            SHORT_WORK_SCHEDULE_END_DATE);

        var employee = Employee.employee(BOB_BELCHER);

    });

    it('should update a work schedule by moving, removing, and adding employees', function () {
        expect.fail("not implemented");
    });

    //TODO validation tests
});