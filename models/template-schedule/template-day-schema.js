(function () {
    var shiftSchema = require('./template-shift-schema');
    var timeSchema = require('./../schema-api/time-schema-fragment');
    var mongoose = require('mongoose');
    var daySchema = mongoose.Schema({
        shifts: [shiftSchema]
    });

    daySchema.methods.toJSON = function () {
        return {
            shifts: this.shifts.map(function (shift) {
                return shift.toJSON();
            }),
            _id: this._id.toString()
        };
    };
    module.exports = daySchema;
})();



//TODO(EG) validation that timeSchema is always only two elements and that time schema is required?