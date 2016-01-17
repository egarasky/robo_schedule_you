var User = require(projectPath('/models/manager/manager-model.js'));
var templateSchedule = require(projectPath('/models/schedule/template-schedule-plugin'));
var ScheduleController = {};

String.prototype.toObjectId = function () {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

ScheduleController.create = function (req, res) {
    if (!req.session._id.toObjectId()) throw new Error('no session id');
    console.log('create schedule called');
    User.addTemplateScheduleToUser(req.session._id.toObjectId(), req.body, function(err, updateUser){
        if (err) {
            console.log(err);
            res.sendStatus(500);
            throw err;
        } else {
            console.log('manager saved with new schedule');
            // console.log(updatedUser.schedules);//doesn''t actually print schedules in correct order
            res.sendStatus(200);
        }
    });
};

ScheduleController.retrieve = function (req, res) {
    console.log('get schedules called');
    User.findOne({_id: req.session._id}, 'schedules', function (err, user) {
        if (err)throw err;
        console.log('retrieving schedules');
        user.schedules.some(function (schedule) {
            console.log(schedule.startDate);
            console.log(typeof schedule.startDate);
        });
        console.log(user.schedules);
        user.schedules.sort(function (a, b) {
            if (a.startDate === b.startDate) return 0;
            if (a.startDate > b.startDate) return 1;
            if (a.startDate > b.startDate) return -1;
        });
        res.json({
            schedules: user.schedules
        });
    });
};

ScheduleController.updateSchedule = function (req, res) {
    var schedule_id = req.body.schedule._id;
    //good pull and push for adding and removing from an array for mongoose/mongodb
    //User.update({_id: req.session._id}, {$push: {schedules: req.body.schedule}});
    User.findOne({_id: req.session._id}, {$pull: {schedules: {_id: schedule_id}}});
    //TODO rewrite so that shifts are added to schedule

};

ScheduleController.updateShiftOfSchedule = function (req, res) {
    // User.findOne({_id: req.session._id,
    // 	'schedules': {$elemMatch: {_id: req.session.schedule_id}}}, 'schedules').
    // 	exec(function(err, manager){
    // 		if(err) throw err;
    var schedule_id = req.body.schedule_id;
    var employee_ids = req.body.employee_ids;
    var shift_id = req.body.shift_id;
    var dayname = req.body.dayname;
    console.log('sent over');
    console.log(schedule_id);
    console.log(employee_ids);
    console.log(shift_id);
    console.log(dayname);

    User.findOne({_id: req.session._id}, 'schedules', function (err, user) {
        // var schedule = manager.schedules.id(req.body.schedule_id);
        // console.log(JSON.stringify(schedule.TemplateSchedule));
        // console.log(req.body.dayname);
        // console.log(schedule.TemplateSchedule[req.body.dayname]);

        var shiftIndex;
        user.schedules.forEach(function (schedule, index) {
            if (schedule._id === req.body.schedule_id) shiftIndex = index;


            var modifiedIndex;
            var modShift;
            schedule.templateSchedule[req.body.dayname].forEach(function (possibleShift, index) {
                console.log(possibleShift._id);
                if (req.body.shift_id.toString() === possibleShift._id.toString()) {
                    possibleShift.employees = req.body.employee_ids;
                    modShift = possibleShift;
                    modifiedIndex = index;
                }
            });
            console.log('emp ids');
            console.log(req.body.employee_ids);
            console.log('possibleShift');
            console.log(modShift);
            console.log(user.modifiedPaths());
            var modifiedPath = 'schedules.templateSchedule.' + modifiedIndex.toString() + '.' + req.body.dayname;
            //manager.markModified(modifiedPath);
            // console.log(User.path('schedules'));
            user.markModified('schedules');
            user.save(function (err, updateUser) {
                console.log('manager saved');
                console.log(user.schedules);
                //console.log(updateUser.schedules[schedule].TemplateSchedule[modifiedIndex]);
                res.sendStatus(200);
            });
        });
    });//User.findOne
};
ScheduleController.deleteSchedule = function (req, res) {
    User.update({_id: req.session._id}, {$pull: {schedules: {_id: req.body.schedule_id}}},
        function (err, numAffected) {
            if (err) throw err;
            res.sendStatus(200);
        });
};

module.exports = ScheduleController;