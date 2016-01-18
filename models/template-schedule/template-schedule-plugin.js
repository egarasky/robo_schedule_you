var mongoose = require('mongoose');
var Promise = require('bluebird');
var Day = require(projectPath('/models/schema-api/day-schema'));
var TemplateScheduleSchema = new mongoose.Schema({
    name: {type: String, require: true},
    days: [Day]
});

TemplateScheduleSchema.methods.toJSON = function(){
    return {
        name: this.name,
        days: this.days.map(function(day){return day.toJSON()}),
        _id: this._id.toString()
    }
};

function TemplateSchedulePlugin(schema, options) {
    schema.add({templateSchedules: [TemplateScheduleSchema]});
    schema.statics.addTemplateSchedule = addTemplateSchedule;
    schema.statics.updateTemplateSchedule = updateTemplateSchedule;
    schema.statics.getTemplateSchedules = getTemplateSchedules;
}

function getTemplateSchedules(userId){

}

function addTemplateSchedule(managerId, schedule) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: managerId}, function (manager) {
            var templateScheduleId = mongoose.Types.ObjectId();
            schedule._id = templateScheduleId;
            manager.templateSchedules.push(templateScheduleId);
            manager.markModified('templateSchedule');
            manager.save(function(err, manager){
                if(err){
                    reject(err);
                } else {
                    resolve(templateScheduleId);
                }
            })
        });
    });
}

function updateTemplateSchedule(managerId, scheduleId, schedule) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: managerId}, 'templateSchedules', function (err, manager) {
            manager.templateSchedules.id(scheduleId).remove();
            manager.templateSchedules.push(schedule);
            manager.markModified('templateSchedules');
            manager.save(function (err, manager) {
                if (err) {
                    reject(err);
                } else {
                    resolve(scheduleId);
                }
            });
        });
    });
}

//TODO(EG) validation make sure template schedule exists
//TODO(EG) make sure order of days is unique and consecutive

module.exports = TemplateSchedulePlugin;
