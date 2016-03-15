var organization_stub_1 = require("../stubs/organization-stub");
var organization_1 = require("../../organization/organization");
var employees_stub_1 = require("../stubs/employees-stub");
var employee_1 = require("../../employee/employee");
describe('domain organization tests', function () {
    var expect = require('chai').expect;
    var fs = require('fs');
    var bobsBurgersOrg;
    var EMPLOYEES;
    before(function () {
        bobsBurgersOrg = organization_1.Organization.organization(organization_stub_1.ORGANIZATION);
    });
    it('should add an employee', function () {
        bobsBurgersOrg.addEmployee(employees_stub_1.BOB_BELCHER);
        expect(1).to.equal(bobsBurgersOrg.employees.length);
        expect(bobsBurgersOrg.employees).to.contain(employee_1.Employee.employee(employees_stub_1.BOB_BELCHER));
    });
    //it('should contain', function () {
    //    var x = [1, 2, 3];
    //    expect(x).to.contain(2);
    //});
});
//# sourceMappingURL=organization-test.js.map