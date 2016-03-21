import ExpectStatic = Chai.ExpectStatic;
import {Organization} from "../../organization/organization";
import {ORGANIZATION} from "../stubs/organization-stub";
import {BLANK_TEMPLATE_SCHEDULE, WEEK_TEMPLATE_SCHEDULE} from "../stubs/template-schedule-stub";
import {TemplateSchedule} from "../../schedule/template/template-schedule";
describe('domain template schedule', function(){
   var expect:ExpectStatic = require('chai').expect;
    var _:UnderscoreStatic = require('underscore');
    var bobsBurgersOrg:Organization;
    var checkSingleAddedTemplateSchedule = function (addedTemplateSchedule) {
        expect(bobsBurgersOrg.getTemplateSchedules().length).to.equal(1);
        expect(bobsBurgersOrg.getTemplateSchedules())
            .to.deep.include(TemplateSchedule.templateSchedule(addedTemplateSchedule));
        expect(bobsBurgersOrg.getTemplateSchedule(addedTemplateSchedule.id))
            .to.deep.equal(TemplateSchedule.templateSchedule(addedTemplateSchedule));
    };

    beforeEach(function(){
        bobsBurgersOrg = Organization.organization(ORGANIZATION);
    });

    it('should add a blank template schedule', function(){
        bobsBurgersOrg.addTemplateSchedule(BLANK_TEMPLATE_SCHEDULE);
        checkSingleAddedTemplateSchedule(BLANK_TEMPLATE_SCHEDULE);
    });

    it('should add a week long template schedule', function(){
        bobsBurgersOrg.addTemplateSchedule(WEEK_TEMPLATE_SCHEDULE);
        checkSingleAddedTemplateSchedule(WEEK_TEMPLATE_SCHEDULE);
    });

    it('should update a template schedule', function(){
        bobsBurgersOrg.addTemplateSchedule(BLANK_TEMPLATE_SCHEDULE);
        var updateBlankWithWeekly = _.extend({}, WEEK_TEMPLATE_SCHEDULE);
        updateBlankWithWeekly.id = BLANK_TEMPLATE_SCHEDULE.id;
        bobsBurgersOrg.updateTemplateSchedule(updateBlankWithWeekly);
        checkSingleAddedTemplateSchedule(updateBlankWithWeekly);

    });

    it('should remove a template schedule', function(){
        bobsBurgersOrg.addTemplateSchedule(BLANK_TEMPLATE_SCHEDULE);
        bobsBurgersOrg.removeTemplateSchedule(BLANK_TEMPLATE_SCHEDULE.id);
        expect(bobsBurgersOrg.getTemplateSchedules().length).to.equal(0);
    });


    //TODO validation tests

});