import ExpectStatic = Chai.ExpectStatic;
import {Organization} from "../../organization/organization";
import {ORGANIZATION} from "../stubs/organization-stub";
describe('domain template schedule functionality for organization', function(){
   var expect:ExpectStatic = require('chai').expect;
    var _:UnderscoreStatic = require('underscore');
    var bobsBurgersOrg:Organization;

    beforeEach(function(){
        bobsBurgersOrg = Organization.organization(ORGANIZATION);
    });

    it('should add a blank template schedule', function(){

    });

});