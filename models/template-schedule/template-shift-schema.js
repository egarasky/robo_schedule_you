module.exports = (function () {
    var mongoose = require('mongoose');
    var timeSchemaFragment = require('./../schema-api/time-schema-fragment');
    var templateRoleSchema = require('./template-schedule-role-schema-factory');
    var templateShiftSchema = mongoose.Schema({
        name: {type: String, required: true},
        startTime: timeSchemaFragment,
        endTime: timeSchemaFragment,
        roles: [templateRoleSchema()]
    });

    templateShiftSchema.methods.toJSON = function () {
        return {
            _id: this._id.toString(),
            name: this.name,
            startTime: [this.startTime[0], this.startTime[1]],
            endTime: [this.endTime[0], this.endTime[1]],
            roles: this.roles.map(function (role) {//TODO(EG) just repeats toJSON but attached schema methods aren't working hmmm
                return {
                    _id: role._id.toString(),
                    roleName: role.roleName,
                    howManyNeeded: role.howManyNeeded
                };
            })
        };
    };

    return templateShiftSchema;
})();