(function () {
    var mongoose = require('mongoose');
    var Promise = require('bluebird');
    var Day = require(projectPath('/models/template-schedule/template-day-schema'));
    const ObjectId = mongoose.Types.ObjectId;
    var TemplateScheduleSchema = new mongoose.Schema({
        name: {type: 'String', required: true},
        days: [Day]
    });

    TemplateScheduleSchema.methods.toJSON = function () {
        return {
            name: this.name,
            days: this.days.map(function (day) {
                return day.toJSON()
            }),
            _id: this._id.toString()
        }
    };

    function TemplateSchedulePlugin(schema, options) {
        schema.add({templateSchedules: [TemplateScheduleSchema]});
        schema.statics.addTemplateSchedule = addTemplateSchedule;
        schema.statics.updateTemplateSchedule = updateTemplateSchedule;
        schema.statics.getTemplateSchedules = getTemplateSchedules;
    }

    function getTemplateSchedules(managerId) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.findOne({_id: managerId}, 'templateSchedules', function (err, manager) {
                if (err) {
                    reject(err);
                } else if (!manager) {
                    reject('No manager found with given id ' + managerId.toString());
                }

                resolve(
                    manager.templateSchedules.map(function (templateSchedule) {
                        return templateSchedule.toJSON();
                    })
                );
            });
        });
    }

    function addTemplateSchedule(managerId, scheduleP) {
        var self = this;
        var schedule = JSON.parse(JSON.stringify(scheduleP));
        return new Promise(function (resolve, reject) {
            self.findOne({_id: managerId}, function (err, manager) {
                if (err) {
                    reject(err);
                } else if (!manager) {
                    reject('No manager found with given id ' + managerId.toString());
                }
                schedule._id = schedule._id ? new ObjectId(schedule._id) : new ObjectId();
                manager.templateSchedules.push(schedule);
                manager.markModified('templateSchedule');
                manager.save(function (err, manager) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(schedule._id);
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
})();