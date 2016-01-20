var mongoose = require('mongoose');
var timeSchema = require('./time-schema');
var roleSchema = require(projectPath('/models/manager/plugins/role-plugin')).Schema;
var shiftSchema = mongoose.Schema({
    name: {type: String, required: true},
    startTime: timeSchema,
    endTime: timeSchema,
    roles: [roleSchema]
});//TODO(EG) be able to add employee to work schedule maybe work-shift plugin

shiftSchema.methods.toJSON = function () {
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

module.exports = shiftSchema;