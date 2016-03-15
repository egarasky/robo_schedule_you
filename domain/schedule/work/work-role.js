var WorkRole = (function () {
    function WorkRole(_employees, _id, _organizationRoleId, _howManyNeeded) {
        this._employees = _employees;
        this._id = _id;
        this._organizationRoleId = _organizationRoleId;
        this._howManyNeeded = _howManyNeeded;
    }
    Object.defineProperty(WorkRole.prototype, "employees", {
        get: function () {
            return this._employees;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkRole.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkRole.prototype, "organizationRoleId", {
        get: function () {
            return this._organizationRoleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkRole.prototype, "howManyNeeded", {
        get: function () {
            return this._howManyNeeded;
        },
        enumerable: true,
        configurable: true
    });
    return WorkRole;
})();
exports.WorkRole = WorkRole;
//# sourceMappingURL=work-role.js.map