var domain;
(function (domain) {
    var schedule;
    (function (schedule) {
        var template;
        (function (template) {
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
            template.TemplateDay = TemplateDay;
        })(template = schedule.template || (schedule.template = {}));
    })(schedule = domain.schedule || (domain.schedule = {}));
})(domain || (domain = {}));
//# sourceMappingURL=template-day.js.map