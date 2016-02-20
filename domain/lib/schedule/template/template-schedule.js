var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var template;
        (function (template) {
            class TemplateSchedule {
                constructor(_name, _days, _id) {
                    this._name = _name;
                    this._days = _days;
                    this._id = _id;
                }
                get name() {
                    return this._name;
                }
                get days() {
                    return this._days;
                }
                get id() {
                    return this._id;
                }
            }
            template.TemplateSchedule = TemplateSchedule;
        })(template = schedule.template || (schedule.template = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=template-schedule.js.map