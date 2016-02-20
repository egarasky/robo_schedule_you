var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var work;
        (function (work) {
            class WorkDay {
                constructor(_id, _date, _shifts) {
                    this._id = _id;
                    this._date = _date;
                    this._shifts = _shifts;
                }
                get id() {
                    return this._id;
                }
                get date() {
                    return this._date;
                }
                get shifts() {
                    return this._shifts;
                }
            }
            work.WorkDay = WorkDay;
        })(work = schedule.work || (schedule.work = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=word-day.js.map