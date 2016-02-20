var domain;
(function (domain) {
    var api;
    (function (api) {
        class Role {
            constructor(_id, _name) {
                this._id = _id;
                this._name = _name;
            }
            get id() {
                return this._id;
            }
            get name() {
                return this._name;
            }
            static initFromDataSource(role) {
                return new Role(role.id, role.name);
            }
        }
        api.Role = Role;
    })(api = domain.api || (domain.api = {}));
})(domain || (domain = {}));
//# sourceMappingURL=role.js.map