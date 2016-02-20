var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var work;
        (function (work) {
            class WorkShift {
                constructor(_id, _startTime, _endTime, _roles) {
                    this._id = _id;
                    this._startTime = _startTime;
                    this._endTime = _endTime;
                    this._roles = _roles;
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
            work.WorkShift = WorkShift;
        })(work = schedule.work || (schedule.work = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=work-shift.js.map