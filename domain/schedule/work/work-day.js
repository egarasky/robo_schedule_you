var WorkDay = (function () {
    function WorkDay(_id, _date, _shifts) {
        this._id = _id;
        this._date = _date;
        this._shifts = _shifts;
    }
    Object.defineProperty(WorkDay.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkDay.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkDay.prototype, "shifts", {
        get: function () {
            return this._shifts;
        },
        enumerable: true,
        configurable: true
    });
    return WorkDay;
})();
exports.WorkDay = WorkDay;
//# sourceMappingURL=work-day.js.map