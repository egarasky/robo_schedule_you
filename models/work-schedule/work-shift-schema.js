module.exports = (function () {
    var Schema = require('mongoose').Schema;
    var timeSchema = require('../schema-api/time-schema-fragment');
    var workShiftRoleSchemaFactory = require('./work-shift-role-schema-factory');
    var workShiftSchema = Schema({
        startTime: timeSchema,
        endTime: timeSchema,
        roles: [workShiftRoleSchemaFactory()]
    });

    return workShiftSchema;
})();