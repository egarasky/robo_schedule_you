module.exports = (function () {
    var workRoleSchema = require('../template-schedule/template-schedule-role-schema-factory');
    var mongoose = require('mongoose');
    return function () {
        var workShiftRoleSchema = workRoleSchema();
        workShiftRoleSchema.plugin(function (schema, options) {
            schema.add({
                employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}]//assumes employee model will be name Employee
            });
        });
        return workShiftRoleSchema;
    }
})();