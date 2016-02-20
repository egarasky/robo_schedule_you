var domain;
(function (domain) {
    var api;
    (function (api) {
        class Time {
            constructor(_hour, _minute) {
                this._hour = _hour;
                this._minute = _minute;
            }
            get hour() {
                return this._hour;
            }
            get minute() {
                return this._minute;
            }
        }
        api.Time = Time;
    })(api = domain.api || (domain.api = {}));
})(domain || (domain = {}));
//# sourceMappingURL=time.js.map