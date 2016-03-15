var organization_stub_1 = require("../stubs/organization-stub");
var organization_1 = require("../../organization/organization");
var employees_stub_1 = require("../stubs/employees-stub");
var employee_1 = require("../../employee/employee");
var employees_stub_2 = require("../stubs/employees-stub");
describe('domain organization tests', function () {
    var expect = require('chai').expect;
    var _ = require('underscore');
    var bobsBurgersOrg;
    var EMPLOYEES;
    beforeEach(function () {
        bobsBurgersOrg = organization_1.Organization.organization(organization_stub_1.ORGANIZATION);
    });
    it('should add an employee', function () {
        bobsBurgersOrg.addEmployee(employees_stub_1.BOB_BELCHER);
        expect(bobsBurgersOrg.employees.length).to.equal(1);
        expect(bobsBurgersOrg.employees).to.contain(employee_1.Employee.employee(employees_stub_1.BOB_BELCHER));
    });
    it('should add two employees and retrieve them based on key', function () {
        bobsBurgersOrg.addEmployee(employees_stub_1.BOB_BELCHER);
        bobsBurgersOrg.addEmployee(employees_stub_2.LINDA_BELCHER);
        expect(bobsBurgersOrg.employees.length).to.equal(2);
        var addedEmployees = _.map([employees_stub_1.BOB_BELCHER, employees_stub_2.LINDA_BELCHER], function (em) {
            return employee_1.Employee.employee(em);
        });
        expect(bobsBurgersOrg.employees).deep.include.members(addedEmployees);
        expect(bobsBurgersOrg.employee(employees_stub_1.BOB_BELCHER.id)).to.deep.equal(employees_stub_1.BOB_BELCHER);
        expect(bobsBurgersOrg.employee(employees_stub_2.LINDA_BELCHER.id)).to.deep.equal(employees_stub_2.LINDA_BELCHER);
    });
    it('should add two employees and remove one', function () {
        bobsBurgersOrg.addEmployee(employees_stub_1.BOB_BELCHER);
        bobsBurgersOrg.addEmployee(employees_stub_2.LINDA_BELCHER);
        expect(bobsBurgersOrg.employees.length).to.equal(2);
        bobsBurgersOrg.removeEmployee(employees_stub_1.BOB_BELCHER.id);
        expect(bobsBurgersOrg.employees.length).to.equal(1);
        expect(bobsBurgersOrg.employees).to.deep.include(employee_1.Employee.employee(employees_stub_2.LINDA_BELCHER));
    });
    it("should try to add same employee twice", function () {
        bobsBurgersOrg.addEmployee(employees_stub_1.BOB_BELCHER);
        expect(function () {
            bobsBurgersOrg.addEmployee(employees_stub_1.BOB_BELCHER);
        }).to.throw(Error, /employee with same id has already been added to organization/);
        var bobWithoutId = _.extend({}, employees_stub_1.BOB_BELCHER);
        delete bobWithoutId.id;
        expect(function () {
            bobsBurgersOrg.addEmployee(bobWithoutId);
        }).to.throw(Error, /employee with same name is already a part of the organization/);
    });
    it('should try to remove an employee that the organization does not have', function () {
        expect.fail("not implemented");
    });
});
//# sourceMappingURL=organization-test.js.map