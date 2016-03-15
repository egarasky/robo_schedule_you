var TemplateDay = (function () {
    function TemplateDay(_shifts, _id) {
        this._shifts = _shifts;
        this._id = _id;
    }
    Object.defineProperty(TemplateDay.prototype, "shifts", {
        get: function () {
            return this._shifts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateDay.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return TemplateDay;
})();
exports.TemplateDay = TemplateDay;
//# sourceMappingURL=template-day.js.map