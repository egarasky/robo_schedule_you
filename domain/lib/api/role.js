var domain;
(function (domain) {
    var api;
    (function (api) {
        var Role = (function () {
            function Role(_id, _name) {
                this._id = _id;
                this._name = _name;
            }
            Object.defineProperty(Role.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Role.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Role.initFromDataSource = function (role) {
                return new Role(role.id, role.name);
            };
            return Role;
        })();
        api.Role = Role;
    })(api = domain.api || (domain.api = {}));
})(domain || (domain = {}));
//# sourceMappingURL=role.js.map