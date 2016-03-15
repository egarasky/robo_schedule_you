import {IEmployee} from "domain.employee";
import {IOrganization} from "domain.organization";
import EMPLOYEE_STUB = require('../stubs/employees-stub');
import {ORGANIZATION} from "../stubs/organization-stub";
import {Organization} from "../../organization/organization";
import {BOB_BELCHER} from "../stubs/employees-stub";
import {Employee} from "../../employee/employee";
import ExpectStatic = Chai.ExpectStatic;


describe('domain organization tests', function () {
    var expect:ExpectStatic = require('chai').expect;
    var fs = require('fs');
    var bobsBurgersOrg:Organization;
    var EMPLOYEES:Array<Employee>;

    before(function () {
        bobsBurgersOrg = Organization.organization(ORGANIZATION);
    });

    it('should add an employee', () => {
        bobsBurgersOrg.addEmployee(BOB_BELCHER);
        expect(1).to.equal(bobsBurgersOrg.employees.length);
        expect(bobsBurgersOrg.employees).to.contain(Employee.employee(BOB_BELCHER));
    });

    //it('should contain', function () {
    //    var x = [1, 2, 3];
    //    expect(x).to.contain(2);
    //});
});