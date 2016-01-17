var Employee = require(projectPath('/models/employee/employee-model.js')),
	User = require(projectPath('/models/manager/manager-model.js')),
	mongoose = require('mongoose');

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

var EmployeeController = {};

EmployeeController.getHours = function(req, res){
	//check if id exists somehow
	Employee.findOne({'_id': req.session._id}, 'business', function(err, employee){
		if(err) throw err;
		User.findOne({'_id': employee.business}, 'hours', function(err, business){
			res.status(200);
			res.send(business.hours);
		});
	});
};

EmployeeController.getAvailability = function(req, res){
	Employee.findOne({'_id': req.session._id}, 'availability', function(err, employee){
		if(err) throw err;
		res.status(200).send(employee.availability);
	});
};

EmployeeController.addAvailability = function(req, res){
	Employee.findOne({'_id': req.session._id}, 'availability', function(err, employee){
		if(err) throw err;
		if(!employee) throw new Error('no employee');
		var timeInterval = req.body.newAvailability;
		if(!timeInterval) throw new Error('no new availability');
		console.log(timeInterval.day);
		console.log(employee.availability[timeInterval.day].length);
		employee.availability[timeInterval.day].push(timeInterval);
		console.log(employee.availability[timeInterval.day].length);
		employee.markModified('availability');
		employee.save(function(err){
			console.log(err);
			res.send(200);
		});
	});
};

EmployeeController.removeAvailability = function(req, res){
	var path = 'availability.' + req.body.day;
	// Employee.update({'_id': req.session._id}, {$pull: {path: {_id: req.body._id}}}, function(err, numAffect){
	// 	if(err) throw err;
	// 	console.log(numAffected);

	// 	res.sendStatus(200);
	// });
	Employee.findOne({'_id': req.session._id}, function(err, employee){
		var day = req.body.dayName;
		var idToRemove = req.body._id;
		
		var shiftIndex = employee.availability[day].indexOf(idToRemove);
		
		employee.availability[day].splice(shiftIndex, 1);
		employee.save(function(err, employee, numberAffected){
			if(err) {
				res.sendStatus(500);
				throw err;
			} else {
				res.sendStatus(200);
			}
		});
	});
};



EmployeeController.index = function(req, res) {

	Employee.findOne({'_id': req.session._id.toObjectId()}).populate('availability.times').//use to be deepPopulate
		exec(function(err, employee){
				//forEach parameters callback parameters element, index, array
			console.log(employee.formatJSON());
			console.log('sent employee: ' + employee.username);
			res.json(employee.formatJSON());
	});
};



//show employee
//mapped from /employees/:username
EmployeeController.show = function(req, res) {
	console.log('show action called');
	Employee.findOne({'username': req.params.username}).populate('availability').exec(function(err, employee){
		console.log(employee.availability);
		res.json(employee);
	});
	//res.send(200);
};






module.exports = EmployeeController;

