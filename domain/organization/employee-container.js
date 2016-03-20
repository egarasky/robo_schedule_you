var employee_1 = require("../employee/employee");
var EmployeeContainer = (function () {
    function EmployeeContainer() {
        this.employeeMap = {};
        this.employeeNameChecker = {};
    }
    EmployeeContainer.prototype.addEmployee = function (employeeToAdd) {
        var matchingIdEmployee = this.employeeMap[employeeToAdd.id];
        var nameKey = this.nameKey(employeeToAdd);
        if (matchingIdEmployee) {
            throw new Error('employee with same id has already been added to organization'); //TODO handle with logger, give more information
        }
        else if (this.employeeNameChecker[nameKey]) {
            throw new Error('employee with same name is already a part of the organization');
        }
        this.employeeMap[employeeToAdd.id] = employeeToAdd;
        this.employeeNameChecker[this.nameKey(employeeToAdd)] = employeeToAdd.lastName + employeeToAdd.firstName;
    };
    EmployeeContainer.prototype.nameKey = function (employeeToAdd) {
        return employeeToAdd.lastName + employeeToAdd.firstName;
    };
    ;
    EmployeeContainer.prototype.getEmployees = function () {
        var _this = this;
        return Object.keys(this.employeeMap).map(function (employeeKey) {
            return employee_1.Employee.employee(_this.employeeMap[employeeKey]);
        });
    };
    EmployeeContainer.prototype.getEmployee = function (employeeId) {
        return this.employeeMap[employeeId];
    };
    EmployeeContainer.prototype.addEmployees = function (_employees) {
        var _this = this;
        _employees.forEach(function (_employee) {
            _this.addEmployee(_employee);
        });
    };
    EmployeeContainer.prototype.removeEmployee = function (id) {
        //TODO throw error if employee doesn't exist
        var employeeToDelete = this.employeeMap[id];
        if (!employeeToDelete) {
            throw new Error('employee to remove is not currently part of organization');
        }
        delete this.employeeNameChecker[this.nameKey(employeeToDelete)];
        delete this.employeeMap[id];
        return employeeToDelete;
    };
    return EmployeeContainer;
})();
exports.EmployeeContainer = EmployeeContainer;
//# sourceMappingURL=employee-container.js.map