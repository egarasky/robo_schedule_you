(function () {
    var mongoose = require('mongoose');
    var Promise = require('bluebird');
    var _ = require('underscore');
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
                var invalidRoles = validateScheduledTemplateRoles(schedule, manager);
                if (invalidRoles) {
                    reject(invalidRoles);
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
            self.findOne({_id: managerId}, 'roles templateSchedules', function (err, manager) {
                var templateSchedule = manager.templateSchedules.id(scheduleId);
                var invalidRoles = validateScheduledTemplateRoles(schedule, manager);
                if (invalidRoles) {
                    reject(invalidRoles);
                    return;
                }
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

    function scheduledRoleMatchesOrganizationRole(role, organizationRoles, shiftId, dayId) {
        var errObj = {};
        errObj.role = role;
        var jsonRoles = organizationRoles.map(function (role) {
            return role.toJSON();
        });
        if (!role._id) {
            errObj.reason = 'Missing _id property';
            errObj.invalidProperties = ['_id'];
            return errObj; //error object
        }

        var matchOrganizationRole = jsonRoles.find(function (orgRole) {
            return orgRole._id === role._id.toString();
        });

        if (!matchOrganizationRole) {
            errObj.reason = '_id does not match organization role';
            return errObj; //error object
        }


        if (matchOrganizationRole.roleName !== role.roleName) {
            errObj.reason = 'Organization role corresponding to _id differs from scheduled role';
            return errObj;
        }
    }


    function validateScheduledTemplateRoles(templateSchedule, manager) {
        //var errObs = [];//TODO fix to match new
        //var orgRoles = manager.roles;
        //templateSchedule.days.forEach(function (day) {
        //    _.each(day.shifts, function (shift) {
        //        _.each(shift.roles, function (role) {
        //            var errObj = scheduledRoleMatchesOrganizationRole(role, orgRoles, shift._id, day._id);
        //            if (errObj) {
        //                errObs.push(errObj);
        //            }
        //        });
        //    });
        //});
        //if (errObs.length > 0) {
        //    var error = new Error('Invalid roles');
        //    error.invalidRoles = errObs;
        //    return error;
        //}
    }


    module.exports = TemplateSchedulePlugin;
})();