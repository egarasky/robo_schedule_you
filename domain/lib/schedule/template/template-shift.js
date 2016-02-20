var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var template;
        (function (template) {
            class TemplateShift {
                constructor(_startTime, _endTime, _roles, _id) {
                    this._startTime = _startTime;
                    this._endTime = _endTime;
                    this._roles = _roles;
                    this._id = _id;
                }
                get id() {
                    return this._id;
                }
                get startTime() {
                    return this._startTime;
                }
                get endTime() {
                    return this._endTime;
                }
                get roles() {
                    return this._roles;
                }
            }
            template.TemplateShift = TemplateShift;
        })(template = schedule.template || (schedule.template = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=template-shift.js.map