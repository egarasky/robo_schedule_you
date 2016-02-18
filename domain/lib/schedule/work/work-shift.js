var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var work;
        (function (work) {
            var WorkShift = (function () {
                function WorkShift(_id, _startTime, _endTime, _roles) {
                    this._id = _id;
                    this._startTime = _startTime;
                    this._endTime = _endTime;
                    this._roles = _roles;
                }
                Object.defineProperty(WorkShift.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkShift.prototype, "startTime", {
                    get: function () {
                        return this._startTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkShift.prototype, "endTime", {
                    get: function () {
                        return this._endTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkShift.prototype, "roles", {
                    get: function () {
                        return this._roles;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorkShift;
            })();
            work.WorkShift = WorkShift;
        })(work = schedule.work || (schedule.work = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=work-shift.js.map