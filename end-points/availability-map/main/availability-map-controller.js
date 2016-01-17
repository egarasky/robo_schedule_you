var availabilityUtil = require(projectPath('/api/availability/main/availability.js'));
var User = require(projectPath('/models/manager/manager-model.js'));
var Employee = require(projectPath('/models/employee/employee-model.js'));

var mapController = {};
var dayNames= ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

mapController.sortWeek = function(weekObj){
	dayNames.forEach(function(day){
		weekObj[day].sort(availabilityUtil.orderStartTimeAsc);
	});
};


mapController.availabilityMap = function(req, res){
	//availability util is passed ORDERED array on startTime field of single day of work shifts and day of employee availability
	//receive back [{shift_id, overlap}] must map to availability map of
	//_id(id of shift): [{emp_id, overlap(in minutes)}]

	var shiftMap = {};
	User.findOne({_id: req.session._id}, 'schedules', function(err, user){
		//var schedule = manager.schedules.id(req.body.schedule_id);
		var schedule = user.schedules[0].templateSchedule;
		if(!schedule) {
			// console.log('no schedule');
			res.send("404");
			return;
		}
		// console.log('past send');
		//sort each day of week of schedule
		mapController.sortWeek(schedule);
		// console.log(req.session._id);
		Employee.find({business: req.session._id.toObjectId()}, 'firstname availability', function(err, employees){
			if(err) throw err;
			// console.log(dayNames);
			dayNames.forEach(function(day){//iterate through each day of week of schedule
				// console.log('availability for day' + day);
				employees.forEach(function(emp){
					// console.log('availability');
					// console.log(emp.availability);
					mapController.sortWeek(emp.availability);
					// console.log('getting availability for' + emp.firstname);
					console.log(schedule[day]);
					var empDayOverlap = availabilityUtil.getTotalOverlap(schedule[day], emp.availability[day]);
					// console.log(emp.firstname + 'overlap');
					// console.log(empDayOverlap);
					empDayOverlap.forEach(function(shiftOverlap){//iterater through {shift_id, overlap} objects
						if (shiftMap[shiftOverlap.shift_id] === undefined) {
							shiftMap[shiftOverlap.shift_id] = [{emp_id: emp._id, overlap: shiftOverlap.overlap}];
						} else {
						shiftMap[shiftOverlap.shift_id].push({emp_id: emp._id, overlap: shiftOverlap.overlap});
						}
					});
				});
			}); //end iterating through days //last blocking call
			// console.log('return shiftmap');
			res.send(shiftMap);	
		});
	});
	
};



mapController.employeeMap = function(req, res){
	Employee.find({business: req.session._id}, function(err, employees){
		if(err) throw err;
		var empMap = {};
		employees.forEach(function(employee){
			empMap[employee._id] = employee;
		});
		res.send(empMap);
	});
};

module.exports = mapController;