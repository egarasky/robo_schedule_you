var ShiftSchema = require(projectPath('/models/schema-api/shift-schema'));
var mongoose = require('mongoose');
module.exports = function DaySchemaFragment() {
    return {
        startTime: {required: true, type: Date},
        endTime: {required: true, type: Date},
        shifts: [ShiftSchema]
    };
};

