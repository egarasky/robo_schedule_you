var TemplateSchedule = (function () {
    function TemplateSchedule(_name, _days, _id) {
        this._name = _name;
        this._days = _days;
        this._id = _id;
    }
    Object.defineProperty(TemplateSchedule.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateSchedule.prototype, "days", {
        get: function () {
            return this._days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateSchedule.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return TemplateSchedule;
})();
exports.TemplateSchedule = TemplateSchedule;
//# sourceMappingURL=template-schedule.js.map