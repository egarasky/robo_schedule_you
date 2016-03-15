var Role = (function () {
    function Role(_id, _name) {
        this._id = _id;
        this._name = _name;
    }
    Role.role = function (role) {
        return new Role(role.id, role.name);
    };
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
    return Role;
})();
exports.Role = Role;
//# sourceMappingURL=role.js.map