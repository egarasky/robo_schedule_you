var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var template;
        (function (template) {
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
            template.TemplateRole = TemplateRole;
        })(template = schedule.template || (schedule.template = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=template-role.js.map