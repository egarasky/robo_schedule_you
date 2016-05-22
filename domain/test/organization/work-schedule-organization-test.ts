import ExpectStatic = Chai.ExpectStatic;
import MomentStatic = moment.MomentStatic;
import {IOrganization} from "../../organization/organization_interfaces";
import {TemplateSchedule} from "../../schedule/template/template-schedule";
import {WEEK_TEMPLATE_SCHEDULE} from "../stubs/template-schedule-stub";
import {Organization} from "../../organization/organization";
import {ORGANIZATION} from "../stubs/organization-stub";
import {BOB_BELCHER} from "../stubs/employees-stub";
import {WorkScheduleIdFactory} from "../../schedule/work/work-schedule-id-factory";
import {
    SHORT_WORK_SCHEDULE_START_DATE, SHORT_WORK_SCHEDULE_END_DATE,
    SHORT_WORK_SCHEDULE, WORK_SCHEDULE_ID_1
} from "../stubs/work-schedule-stub";
import {IWorkScheduleProperties, IWorkSchedule} from "../../schedule/work/work_schedule_interfaces";
import {WorkSchedule} from "../../schedule/work/work-schedule";

describe('domain work schedule', function () {
    var expect:ExpectStatic = require('chai').expect;
    var moment:MomentStatic = require('moment');
    var _:UnderscoreStatic = require('underscore');
    var weekTemplateSchedule;
    var organization:IOrganization;
    beforeEach(function () {
        weekTemplateSchedule = TemplateSchedule.templateSchedule(WEEK_TEMPLATE_SCHEDULE);
        organization = Organization.organization(ORGANIZATION);
        organization.addEmployee(BOB_BELCHER);
        organization.addTemplateSchedule(WEEK_TEMPLATE_SCHEDULE);
        WorkScheduleIdFactory.reset();
    });

    it('should create a work schedule from a week long template schedule', function () {
        var shortWorkSchedule = weekTemplateSchedule.createWorkSchedule(SHORT_WORK_SCHEDULE_START_DATE,
            SHORT_WORK_SCHEDULE_END_DATE);
        expect(shortWorkSchedule).to.deep.equal(SHORT_WORK_SCHEDULE);
    });

    it('should create a work schedule for an organization', function () {
        organization.createWorkScheduleFromTemplateSchedule(WEEK_TEMPLATE_SCHEDULE.id, SHORT_WORK_SCHEDULE_START_DATE,
            SHORT_WORK_SCHEDULE_END_DATE);

        expect(organization.getWorkSchedules().length).to.equal(1);
        var workSchedule = _.extend({}, SHORT_WORK_SCHEDULE);
        workSchedule.id = WORK_SCHEDULE_ID_1;
        expect(organization.getWorkSchedules()[0]).to.deep.equal(workSchedule);
    });

    it('should create a work schedule and retrieve it', function(){
        organization.createWorkScheduleFromTemplateSchedule(WEEK_TEMPLATE_SCHEDULE.id, SHORT_WORK_SCHEDULE_START_DATE,
            SHORT_WORK_SCHEDULE_END_DATE);
        var workSchedule = organization.getWorkSchedule(WORK_SCHEDULE_ID_1);
        expect(workSchedule).to.deep.equal(SHORT_WORK_SCHEDULE);
    });

    it('should update a work schedule by adding an employee', function () {
        var workSchedule:IWorkSchedule = WorkSchedule.workSchedule(SHORT_WORK_SCHEDULE);

        organization.createWorkScheduleFromTemplateSchedule(WEEK_TEMPLATE_SCHEDULE.id, SHORT_WORK_SCHEDULE_START_DATE,
        SHORT_WORK_SCHEDULE_END_DATE);
        workSchedule.days[0].shifts[0].roles[0].employees.push(BOB_BELCHER);
        organization.updateWorkSchedule(workSchedule);

        expect(organization.getWorkSchedule(WORK_SCHEDULE_ID_1)).to.deep.equal(workSchedule);
    });

    it('should update a work schedule by moving, removing, and adding employees', function () {
        
    });

    //TODO validation tests
});