var TemplateRole = (function () {
    function TemplateRole(_id, _organizationRoleId, _howManyNeeded) {
        this._id = _id;
        this._organizationRoleId = _organizationRoleId;
        this._howManyNeeded = _howManyNeeded;
    }
    Object.defineProperty(TemplateRole.prototype, "howManyNeeded", {
        get: function () {
            return this._howManyNeeded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateRole.prototype, "organizationRoleId", {
        get: function () {
            return this._organizationRoleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateRole.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return TemplateRole;
})();
exports.TemplateRole = TemplateRole;
//# sourceMappingURL=template-role.js.map