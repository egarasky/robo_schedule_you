var domain;
(function (domain) {
    var api;
    (function (api) {
        var Time = (function () {
            function Time(_hour, _minute) {
                this._hour = _hour;
                this._minute = _minute;
                //TODO validate time is formed correctly here
            }
            Object.defineProperty(Time.prototype, "hour", {
                get: function () {
                    return this._hour;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Time.prototype, "minute", {
                get: function () {
                    return this._minute;
                },
                enumerable: true,
                configurable: true
            });
            return Time;
        })();
        api.Time = Time;
    })(api = domain.api || (domain.api = {}));
})(domain || (domain = {}));
//# sourceMappingURL=time.js.map