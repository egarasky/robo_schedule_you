var ShiftSchema = require(projectPath('/models/schema-api/template-shift-schema'));

var mongoose = require('mongoose');
var DaySchema = mongoose.Schema({
    startTime: {required: true, type: Date},
    endTime: {required: true, type: Date},
    shifts: [ShiftSchema]
});

DaySchema.methods.toJSON = function(){
    return {
        startTime: moment(this.startTime),
        endTime: moment(this.endTime),
        shifts: this.shifts.map(function(shift){return shift.toJSON()}),
        _id: this._id.toString()
    };
};
module.exports = DaySchema;

