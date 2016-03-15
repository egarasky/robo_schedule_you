var employee_container_1 = require('./employee-container');
var _ = require('underscore');
var Organization = (function () {
    function Organization(_id, _roles, _workSchedules, _templateSchedules, _employees) {
        this._id = _id;
        this._roles = _roles;
        this._workSchedules = _workSchedules;
        this._templateSchedules = _templateSchedules;
        this.employeeContainer = new employee_container_1.EmployeeContainer();
        this.employeeContainer.addEmployees(_employees);
    }
    Organization.prototype.createWorkScheduleFromTemplateSchedule = function (templateScheduleId, startDay, startDate, endDate) {
        return undefined;
    };
    Object.defineProperty(Organization.prototype, "id", {
        //    function Organization() {
        //}
        //
        //    Organization.prototype.createWorkScheduleFromTemplateSchedule = createWorkScheduleFromTemplateSchedule;
        //
        //    function createWorkScheduleFromTemplateSchedule(templateScheduleId,
        //                                                    startDay, startDate, endDate) {
        //    //TODO error handling of bad arguments
        //    var templateSchedule = _.find(this.templateSchedules, function (templateSchedule) {
        //        return templateScheduleId === templateSchedule._id;
        //    });
        //    var workSchedule = {};
        //
        //    var currentMoment = moment(startDate);
        //    currentMoment.day(currentMoment.day() + startDay);
        //    var endMoment = moment(endDate);//
        //    var dayIndex = startDay;
        //    while (currentMoment.dayOfYear() !== endMoment.dayOfYear()
        //    && currentMoment.year() !== endMoment.year()) {
        //        var day = createWorkDayFromTemplateDay(templateSchedule[dayIndex], currentMoment);
        //    }
        //}
        //
        //    function createWorkDayFromTemplateDay(templateDay, currentMoment){
        //    var workDay = {};
        //    workDay.date = currentMoment;
        //    workDay.shifts = _.extendOwn(templateDay.shifts);
        //}
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "roles", {
        get: function () {
            return this._roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "workSchedules", {
        get: function () {
            return this._workSchedules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "templateSchedules", {
        get: function () {
            return this._templateSchedules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "employees", {
        get: function () {
            return this.employeeContainer.getEmployees();
        },
        enumerable: true,
        configurable: true
    });
    Organization.organization = function (organizationObj) {
        return new Organization(organizationObj.id, organizationObj.roles, organizationObj.workSchedules, organizationObj.templateSchedules, organizationObj.employees);
    };
    Organization.prototype.addEmployee = function (employee) {
        this.employeeContainer.addEmployee(employee);
    };
    return Organization;
})();
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map