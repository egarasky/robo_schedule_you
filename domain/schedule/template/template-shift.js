var TemplateShift = (function () {
    function TemplateShift(_startTime, _endTime, _roles, _id, _name) {
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._roles = _roles;
        this._id = _id;
        this._name = _name;
    }
    Object.defineProperty(TemplateShift.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateShift.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateShift.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateShift.prototype, "roles", {
        get: function () {
            return this._roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateShift.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return TemplateShift;
})();
exports.TemplateShift = TemplateShift;
//# sourceMappingURL=template-shift.js.map