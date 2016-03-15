var employee_1 = require("../employee/employee");
var employee_2 = require("../employee/employee");
var EmployeeContainer = (function () {
    function EmployeeContainer() {
        this.employeeMap = {};
    }
    EmployeeContainer.prototype.addEmployee = function (employeeToAdd) {
        var employeeValue = this.employeeMap[employee_1.EmployeeKey.createKey(employeeToAdd)];
        if (employeeValue) {
            if (employeeValue.id === employeeToAdd.id) {
                throw new Error('employee has already been added to organization'); //TODO handle with logger, give more information
            }
            else {
                throw new Error('employee with same first name and last name already exists');
            }
        }
        this.employeeMap[employee_1.EmployeeKey.createKey(employeeToAdd)] = employeeToAdd;
    };
    EmployeeContainer.prototype.getEmployees = function () {
        var _this = this;
        return Object.keys(this.employeeMap).map(function (employeeKey) {
            return employee_2.Employee.employee(_this.employeeMap[employeeKey]);
        });
    };
    EmployeeContainer.prototype.getEmployee = function (employeeKey) {
        return this.employeeMap[employeeKey.getKey()];
    };
    EmployeeContainer.prototype.addEmployees = function (_employees) {
        var _this = this;
        _employees.forEach(function (_employee) {
            _this.addEmployee(_employee);
        });
    };
    return EmployeeContainer;
})();
exports.EmployeeContainer = EmployeeContainer;
//# sourceMappingURL=employee-container.js.map