var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var template;
        (function (template) {
            class TemplateDay {
                constructor(_shifts, _id) {
                    this._shifts = _shifts;
                    this._id = _id;
                }
                get shifts() {
                    return this._shifts;
                }
                get id() {
                    return this._id;
                }
            }
            template.TemplateDay = TemplateDay;
        })(template = schedule.template || (schedule.template = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=template-day.js.map