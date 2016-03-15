var Employee = (function () {
    function Employee(id, firstName, lastName, role) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._roles = role;
    }
    Employee.employee = function (employeeObj) {
        return new Employee(employeeObj.id, employeeObj.firstName, employeeObj.lastName, employeeObj.roles);
    };
    Object.defineProperty(Employee.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "roles", {
        get: function () {
            return this._roles;
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
})();
exports.Employee = Employee;
var EmployeeKey = (function () {
    function EmployeeKey(employee) {
        this.key = EmployeeKey.createKey(employee);
    }
    EmployeeKey.createKey = function (employee) {
        return employee.firstName + employee.lastName;
    };
    EmployeeKey.prototype.getKey = function () {
        return this.key;
    };
    return EmployeeKey;
})();
exports.EmployeeKey = EmployeeKey;
//# sourceMappingURL=employee.js.map