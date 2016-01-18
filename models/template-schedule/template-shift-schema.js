var mongoose = require('mongoose');
var timeSchema = require(projectPath('/models/schema-api/time-schema'));

var shiftSchema = mongoose.Schema({
    name: {type: String, required: true},
    startTime: {_id: false, type: timeSchema, required: true},
    endTime: {_id: false, type: timeSchema, required: true},
    roles: [mongoose.Types.ObjectId]
});//TODO(EG) be able to add employee to work schedule maybe work-shift plugin

shiftSchema.methods.toJSON = function(){
    return {
        _id: this._id.toString(),
        startTime: this.startTime,
        endTime: this.endTime,
        roles: [mongoose.Types.ObjectId]
    };
};

module.exports = shiftSchema;