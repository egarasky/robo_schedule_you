var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var template;
        (function (template) {
            class TemplateRole {
                constructor(_id, _organizationRoleId, _howManyNeeded) {
                    this._id = _id;
                    this._organizationRoleId = _organizationRoleId;
                    this._howManyNeeded = _howManyNeeded;
                }
                get howManyNeeded() {
                    return this._howManyNeeded;
                }
                get organizationRoleId() {
                    return this._organizationRoleId;
                }
                get id() {
                    return this._id;
                }
            }
            template.TemplateRole = TemplateRole;
        })(template = schedule.template || (schedule.template = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=template-role.js.map