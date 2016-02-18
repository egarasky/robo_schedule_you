var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var work;
        (function (work) {
            var WorkSchedule = (function () {
                function WorkSchedule(_id, _days, _madeFromTemplateScheduleId) {
                    this._id = _id;
                    this._days = _days;
                    this._madeFromTemplateScheduleId = _madeFromTemplateScheduleId;
                }
                Object.defineProperty(WorkSchedule.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkSchedule.prototype, "days", {
                    get: function () {
                        return this._days;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkSchedule.prototype, "madeFromTemplateScheduleId", {
                    get: function () {
                        return this._madeFromTemplateScheduleId;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorkSchedule;
            })();
            work.WorkSchedule = WorkSchedule;
        })(work = schedule.work || (schedule.work = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=work-schedule.js.map