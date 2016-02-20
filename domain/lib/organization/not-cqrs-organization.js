var domain;
(function (domain) {
    var organization;
    (function (organization) {
        var _ = require('underscore');
        class Organization {
            constructor(_id, _roles, _workSchedules, _templateSchedules, _employees) {
                this._id = _id;
                this._roles = _roles;
                this._workSchedules = _workSchedules;
                this._templateSchedules = _templateSchedules;
                this._employees = _employees;
            }
            createWorkScheduleFromTemplateSchedule(templateScheduleId, startDay, startDate, endDate) {
                return undefined;
            }
            get id() {
                return this._id;
            }
            get roles() {
                return this._roles;
            }
            get workSchedules() {
                return this._workSchedules;
            }
            get templateSchedules() {
                return this._templateSchedules;
            }
            get employees() {
                return this._employees;
            }
        }
        organization.Organization = Organization;
    })(organization = domain.organization || (domain.organization = {}));
})(domain || (domain = {}));
//# sourceMappingURL=not-cqrs-organization.js.map