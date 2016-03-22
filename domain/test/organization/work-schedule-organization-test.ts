import ExpectStatic = Chai.ExpectStatic;
import {TemplateSchedule} from "../../schedule/template/template-schedule";
import {BLANK_TEMPLATE_SCHEDULE, WEEK_TEMPLATE_SCHEDULE} from "../stubs/template-schedule-stub";
import MomentStatic = moment.MomentStatic;
describe('domain work schedule', function () {
    var expect:ExpectStatic = require('chai').expect;
    var moment:MomentStatic = require('moment');
    it('should create a work schedule from a blank template schedule', function () {
        moment("2014 04 25", "YYYY MM DD");
        const startDate = moment('2016-02-01', "YYYY MM DD");
        const endDateShorter = moment('2016-02-03', "YYYY MM DD");
        const endDateMatchesLastDay = moment('2016-02-07');
        TemplateSchedule.templateSchedule(WEEK_TEMPLATE_SCHEDULE).createWorkSchedule(startDate, endDateShorter);
        TemplateSchedule.templateSchedule(WEEK_TEMPLATE_SCHEDULE).createWorkSchedule(startDate, endDateMatchesLastDay);
    });

    it('should add a work schedule created from the blank template schedule', function () {

        expect.fail("not implemented");
    });

    it('should add a work schedule created from the weekly template schedule', function () {
        expect.fail("not implemented");
    });

    it('should update a work schedule by adding an employee', function () {
        expect.fail("not implemented");
    });

    it('should update a work schedule by moving, removing, and adding employees', function () {
        expect.fail("not implemented");
    });

    //TODO validation tests
});