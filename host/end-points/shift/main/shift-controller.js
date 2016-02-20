var User = require(projectPath('/models/manager/manager-model.js'));
var ShiftController = {};
//TODO move session id check to app middleware
String.prototype.toObjectId = function () {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

ShiftController.shifts = function (req, res) {
    if (!req.session._id) throw new Error('no session id');
    User.findOne({_id: req.session._id.toObjectId()}, function (err, user) {
        //send back shifts
        console.log('get shifts called');
        if (err) throw err;
        if (!user) throw err;
        console.log(user.templateSchedule);

        res.json({
            shifts: user.templateSchedule
        });
    });
};

ShiftController.addShift = function (req, res) {
    if (!req.session._id) throw new Error('no valid session id');
    console.log('add shift called');
    User.findOne({_id: req.session._id.toObjectId()}, function (err, user) {
        if (err) throw err;
        if (!user) throw err;

        var day = req.body.day;
        var shift = req.body.shift;
        user.templateSchedule[day].push(shift);
        user.markModified('TemplateSchedule');
        //not sure if necessary since we are adding something generally saves -- just not the edit part
        user.save(function (err, data) {
            if (err) {
                console.log('error saving');
                res.sendStatus(500)
            } else {
                res.sendStatus(200);
                console.log('new shift added');
            }

        });

    });
};

// ShiftController.changeShift = function(req, res){
// };

ShiftController.deleteShift = function (req, res) {
    //set over as {shift_id: shiftToRemove._id}
    console.log('deleteShift called');
    User.findOne({_id: req.session._id.toObjectId()}, function (err, user) {
        if (err) throw err;
        if (!user) throw new Error('manager not found');

        var dayName = req.body.dayName;
        var shiftName = req.body.shiftName;
        console.log('removing shift: ' + dayName + ' ' + shiftName);
        var shiftIndex = user.templateSchedule[dayName].filter(function(shift){
            return shift.name != shiftName;
        });

        user.templateSchedule[dayName].splice(shiftIndex, 1);
        var schedules = user.templateSchedule;
        user.save(function (err, user, numberAffected) {
            if (err) {
                res.sendStatus(500);
                throw err;
            } else {
                res.sendStatus(200);
                var shiftsl  = user.templateSchedule;
                console.log('shift removed: ' + user);
            }
        });

    });

};

module.exports = ShiftController;