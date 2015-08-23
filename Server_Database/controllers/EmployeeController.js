var Employee = require('../Models/employee.js'),
	User = require('../Models/user.js'),
	mongoose = require('mongoose'),
	path = require('path');

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

	Employee.findOne({'_id': req.session._id.toObjectId()}).deepPopulate('availability.times').
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





/*
**MANAGER SIDE OF EMPLOYEE CONTROL
*/

//create new employee
//request body will have passed json data properties
EmployeeController.create = function(req, res) {
	var newEmployee = new Employee({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		password: req.body.password,
		role: req.body.role,
		business: req.session._id

	});
	newEmployee.save(function(err, nemEmployee){
	if (err) 
		{
			console.log('error: ' + err);
		} else {
			//if successful
			//attaches user cookie and redirects to user page
			console.log('newUser username: ' + newEmployee.username);
			res.send(200);
		}

	});
};

EmployeeController.getEmployeesForEdit = function(req, res){
	console.log('get employee');
	if(!req.session._id) throw new Error('invalid session id');
	console.log('session id: ' + req.session._id);
	Employee.find({business: req.session._id}).
		lean().exec(function(err, employees){
			if(err) throw err;
			console.log('number of employees:' + employees.length);
			res.json(employees);
		});
};

//update employee
EmployeeController.businessUpdate = function(req, res) {
	var emp_id = req.body.employee._id;
	Employee.update({_id: emp_id}, {$set: req.body.employee}, function(err, numAffected){
		if(err || numAffected){
			throw new Error('error updating employee');	
		} else {
			res.sendStatus(200);
		}
	});
};

EmployeeController.deleteEmployee = function(req, res) {
	var emp_id = req.body.employee._id;
	Employee.remove({_id: emp_id}, function(err, removedUser){
		if(err){
			throw err;
			res.sendStatus(500);
		} else {
			console.log('removed user: ');
			console.log(removedUser);
			res.sendStatus(200);
		}
	});
};


EmployeeController.updateEmployeePreferences = function(req, res) {
	var emp_id = req.body.emp_id;
	var dataToSet = {
		priority: req.body.priority,
		fulltime: req.body.fulltime,
		capHours: req.body.capHours,
		shouldCapHours: req.body.shouldCapHours
	};

	Employee.findOne({_id: emp_id}, function(err, employee){
		if(err) throw err;
		employee.managerpreferences = dataToSet;
		employee.save(function(err, updatedUser){
			res.send(200);
		});
	});
};

EmployeeController.updateHoursPreferences = function(req, res){
	var emp_id = req.session._id;
	console.log(emp_id);
	Employee.findOne({_id: emp_id}, function(err, employee){
		if(err) throw err;
		console.log(employee);
		employee.preferred = req.body.preferred;
		employee.maxhours = req.body.maxhours;
		employee.save(function(err, updateUser){
			if(err) throw err;
			res.send(200);
		});
	});
};

EmployeeController.getHoursPreferences = function(req, res){
	var emp_id = req.session._id;
	console.log(emp_id);
	Employee.findOne({_id: emp_id}, function(err, employee){
		if(err) throw err;
		var data = {
			preferred: employee.preferred,
			maxhours: employee.maxhours
		};
		res.send(data);
	});
};
module.exports = EmployeeController;

