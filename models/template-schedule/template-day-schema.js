(function () {
    var shiftSchema = require('./template-shift-schema');
    var timeSchema = require('./time-schema');
    var mongoose = require('mongoose');
    var daySchema = mongoose.Schema({
        endTime: timeSchema,
        startTime: timeSchema,
        shifts: [shiftSchema]
    });

    daySchema.methods.toJSON = function () {
        return {
            startTime: [this.startTime[0], this.startTime[1]],
            endTime: [this.endTime[0], this.endTime[1]],
            shifts: this.shifts.map(function (shift) {
                return shift.toJSON();
            }),
            _id: this._id.toString()
        };
    };
    module.exports = daySchema;
})();



//TODO(EG) validation that timeSchema is always only two elements and that time schema is required?