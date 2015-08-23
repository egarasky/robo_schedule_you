var User = require('../Models/user.js');
var ScheduleController = {};

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

ScheduleController.create = function(req, res){
	if(!req.session._id.toObjectId()) throw new Error('no session id');
	console.log('create schedule called');
	User.findOne({_id: req.session._id}, function(err, user){
		if(err) throw err;
		if(!user) throw new Error('user not found');
		console.log('found user');
		console.log(req.body.startDate + ' ' + req.body.endDate);
		user.addSchedule(req.body.startDate, req.body.endDate);
		console.log('schedule added');
		user.save(function(err, updatedUser, numModified){
			if(err){
				console.log(err);
				res.sendStatus(500);
				throw err;
			} else {
			console.log('user saved with new schedule');
			// console.log(updatedUser.schedules);//doesn''t actually print schedules in correct order
			res.sendStatus(200);
		}
		});
	});
};

ScheduleController.retrieve = function(req, res){
	console.log('get schedules called');
	User.findOne({_id: req.session._id}, 'schedules', function(err, user){
		if(err)throw err;
		console.log('retrieving schedules');
		user.schedules.some(function(schedule){
			console.log(schedule.startDate);
			console.log(typeof schedule.startDate);
		});
		console.log(user.schedules);
		user.schedules.sort(function(a, b){
			if(a.startDate === b.startDate) return 0;
			if(a.startDate > b.startDate) return 1;
			if(a.startDate > b.startDate) return -1;
		});
		res.send(user.schedules);
	});
};

ScheduleController.updateSchedule = function(req, res){
	var schedule_id = req.body.schedule._id;
	User.update({_id: req.session._id}, {$pull: {schedules: {_id: schedule_id}}});
	User.update({_id: req.session._id}, {$push: {schedules: req.body.schedule}});
};

ScheduleController.updateShiftOfSchedule = function(req, res){
	// User.findOne({_id: req.session._id, 
	// 	'schedules': {$elemMatch: {_id: req.session.schedule_id}}}, 'schedules').
	// 	exec(function(err, user){
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

	User.findOne({_id: req.session._id}, 'schedules', function(err, user){
			// var schedule = user.schedules.id(req.body.schedule_id);
			// console.log(JSON.stringify(schedule.shiftSchedule));
			// console.log(req.body.dayname);
			// console.log(schedule.shiftSchedule[req.body.dayname]);

			var shiftIndex;
			user.schedules.forEach(function(schedule, index){
				if(schedule._id === req.body.schedule_id) shiftIndex = index;
			

			var modifiedIndex;
			var modShift;
			schedule.shiftSchedule[req.body.dayname].forEach(function(possibleShift, index){
				console.log(possibleShift._id);
				if(req.body.shift_id.toString() === possibleShift._id.toString()){
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
			var modifiedPath = 'schedules.shiftSchedule.' + modifiedIndex.toString() + '.' + req.body.dayname;
			//user.markModified(modifiedPath);
			// console.log(User.path('schedules'));
			user.markModified('schedules');
			user.save(function(err, updateUser){
				console.log('user saved');
				console.log(user.schedules);
				//console.log(updateUser.schedules[schedule].shiftSchedule[modifiedIndex]);
				res.sendStatus(200);
			});
		});
	});//User.findOne
};
ScheduleController.deleteSchedule = function(req, res){
	User.update({_id: req.session._id}, {$pull: {schedules: {_id: req.body.schedule_id}}}, 
		function(err, numAffected){
			if(err) throw err;
			res.sendStatus(200);
		});
};

module.exports = ScheduleController;