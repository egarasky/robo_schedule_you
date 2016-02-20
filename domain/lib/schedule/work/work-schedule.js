var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var work;
        (function (work) {
            class WorkSchedule {
                constructor(_id, _days, _madeFromTemplateScheduleId) {
                    this._id = _id;
                    this._days = _days;
                    this._madeFromTemplateScheduleId = _madeFromTemplateScheduleId;
                }
                get id() {
                    return this._id;
                }
                get days() {
                    return this._days;
                }
                get madeFromTemplateScheduleId() {
                    return this._madeFromTemplateScheduleId;
                }
            }
            work.WorkSchedule = WorkSchedule;
        })(work = schedule.work || (schedule.work = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=work-schedule.js.map