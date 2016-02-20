var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var work;
        (function (work) {
            class WorkRole {
                constructor(_employees, _id, _organizationRoleId, _howManyNeeded) {
                    this._employees = _employees;
                    this._id = _id;
                    this._organizationRoleId = _organizationRoleId;
                    this._howManyNeeded = _howManyNeeded;
                }
                get employees() {
                    return this._employees;
                }
                get id() {
                    return this._id;
                }
                get organizationRoleId() {
                    return this._organizationRoleId;
                }
                get howManyNeeded() {
                    return this._howManyNeeded;
                }
            }
            work.WorkRole = WorkRole;
        })(work = schedule.work || (schedule.work = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=work-role.js.map