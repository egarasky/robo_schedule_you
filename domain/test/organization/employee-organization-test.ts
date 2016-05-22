import ExpectStatic = Chai.ExpectStatic;
import {Organization} from "../../organization/organization";
import {ORGANIZATION} from "../stubs/organization-stub";
import {BOB_BELCHER, LINDA_BELCHER} from "../stubs/employees-stub";
import {Employee} from "../../employee/employee";
import {IEmployeeProperties} from "../../employee/employee_interfaces";

describe('domain employee functionality for organization tests', function () {
    var expect:ExpectStatic = require('chai').expect;
    var _:UnderscoreStatic = require('underscore');
    var bobsBurgersOrg:Organization;
    beforeEach(function () {
        bobsBurgersOrg = Organization.organization(ORGANIZATION);
    });

    it('should add an employee', () => {
        bobsBurgersOrg.addEmployee(BOB_BELCHER);
        expect(bobsBurgersOrg.employees.length).to.equal(1);
        expect(bobsBurgersOrg.employees).to.contain(Employee.employee(BOB_BELCHER));
    });

    it('should add two employees and retrieve them based on key', function () {

        bobsBurgersOrg.addEmployee(BOB_BELCHER);
        bobsBurgersOrg.addEmployee(LINDA_BELCHER);
        expect(bobsBurgersOrg.employees.length).to.equal(2);
        var addedEmployees = _.map([BOB_BELCHER, LINDA_BELCHER], function(em){
            return Employee.employee(em);
        });
        expect(bobsBurgersOrg.employees).deep.include.members(addedEmployees);

        expect(bobsBurgersOrg.employee(BOB_BELCHER.id)).to.deep.equal(Employee.employee(BOB_BELCHER));
        expect(bobsBurgersOrg.employee(LINDA_BELCHER.id)).to.deep.equal(Employee.employee(LINDA_BELCHER));
    });

    it('should add two employees and remove one', function () {
        bobsBurgersOrg.addEmployee(BOB_BELCHER);
        bobsBurgersOrg.addEmployee(LINDA_BELCHER);
        expect(bobsBurgersOrg.employees.length).to.equal(2);
        bobsBurgersOrg.removeEmployee(BOB_BELCHER.id);
        expect(bobsBurgersOrg.employees.length).to.equal(1);
        expect(bobsBurgersOrg.employees).to.deep.include(Employee.employee(LINDA_BELCHER));
    });

    it("should try to add same employee twice", function () {
        bobsBurgersOrg.addEmployee(BOB_BELCHER);
        expect(() => {
            bobsBurgersOrg.addEmployee(BOB_BELCHER);
        }).to.throw(Error, /employee with same id has already been added to organization/);

        var bobWithoutId:IEmployeeProperties = _.extend({}, BOB_BELCHER);
        delete bobWithoutId.id;

        expect(() => {
            bobsBurgersOrg.addEmployee(bobWithoutId);
        }).to.throw(Error, /employee with same name is already a part of the organization/);
    });

    it('should try to remove an employee that the organization does not have', function () {
        expect(() => {
            bobsBurgersOrg.removeEmployee(BOB_BELCHER.id);
        }).to.throw(Error, /employee to remove is not currently part of organization/);
    });

})
;