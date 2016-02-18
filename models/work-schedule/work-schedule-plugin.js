module.exports = (function () {
    var mongoose = require('mongoose');
    var moment = require('moment');
    var workShiftSchema = require('./work-shift-schema');
    var workScheduleSchema = mongoose.Schema(
        {
            days: [{
                date: {required: true, type: Date},
                shifts: [workShiftSchema]
            }],
            madeFromTemplateScheduleId: mongoose.Schema.Types.ObjectId
        }
    );


    function workSchedulePlugin(schema, options) {
        schema.add({
            workSchedules: [workScheduleSchema]
        });
        schema.statics.addWorkScheduleFromTemplateSchedule = addWorkScheduleFromTemplateSchedule;
        schema.statics.getWorkSchedules = getWorkSchedules;
    }

//TODO(EG) fill out later -- for now will just create work schedule from template schedule
//function addWorkSchedule(organizationId, workSchedule){
//    var self = this;
//    return new Promise(function(resolve, reject){
//        self.findOne({_id: organizationId}, 'workSchedules', function(err, organization){
//            if(err){
//                reject(err);
//            } else if(!organization){
//                reject(new Error('No organization found for given id'));
//            }
//        });
//    });
//}

    function addWorkScheduleFromTemplateSchedule(organizationId, templateScheduleId, startDay, startDate, endDate) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.findOne({_id: organizationId}, 'workSchedules templateSchedules', function (err, organization) {
                if (err) {//TODO(EG) find middleware solution to avoid writing this everywhere - post find??
                    reject(err);
                } else if (!organization) {
                    reject(new Error('No organization found forgiven id'));
                }
                var templateSchedule = organization.templateSchedule.id(templateScheduleId);


                // var shiftScheduleCopy = deleteId(JSON.parse(JSON.stringify(this.TemplateSchedule)));

                var
                shiftScheduleCopy = copySchedule(this.templateSchedule);
                console.log(shiftScheduleCopy);
                var nSchedule = {
                    templateSchedule: shiftScheduleCopy,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate)
                };
                this.schedules.push(nSchedule);
                this.markModified('schedules');
                //TODO(EG) create work schedule
            });
        });
    }

    function updateWorkSchedule(organizationId, workScheduleId, workSchedule) {

    }

    function createWorkDayFromTemplateDay(templateDay, currentMoment){

    }

    function getWorkSchedules (ORG_ID) {
        var self = this;
        return new Promise(function(resolve, reject){
           self.findOne({_id: ORG_ID}, 'workSchedules', function(err, organization){
              if(err){
                  reject(err);
              } else if(!organization){
                  reject(new Error('No organization found with id: ' + ORG_ID.toString()));
              }

               _.map(organization.workSchedules, function(){
                   return organization.workSchedules.toJSON();
               });
           });
        });
    }

    return workSchedulePlugin
})();