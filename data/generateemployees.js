//puts 
var mongoose = require('mongoose');
var Employee = require('../models/employee/employee-model.js');
var Day = require('../models/template-day-schema.js');
var Shift = require('../models/template-shift-schema.js');
var sleep = require('sleep');



var randomShift = function(){
	var startHour = Math.floor(Math.random() * 24);
	var startMinute = Math.floor(Math.random() * 60); 

	var endHour = Math.floor(Math.random() * (24 - startHour - 1)) + startHour + 1;
	var endMinute = Math.floor(Math.random() * 60);

	var shift = new Shift({
		startTime: [startHour, startMinute],
		endTime: [endHour, endMinute]
	});

	shift.save(); // not sure if we need database of shifts
	return shift;
};

var resetWithRandomData = function() {
	//DATABASE CONNECTION
	mongoose.connect('mongodb://localhost/test');
	mongoose.connection.on('error', function(){
		console.log('database connection error');
	});

	mongoose.connection.on('once', function(){
		console.log('connected to database');
	});
	var db = mongoose.connection;
	//
	//must use native mongoDB to drop collection or database there is no mongoose API
	//or remove all documents through the model
	//can also reset/database with mongoose.connection.db.dropDatabase();
	Employee.remove({}, function(err){
		if(err) console.log('error occurred');
	});

	Day.remove({}, function(err){
		if (err) console.log('error occurred');
	});

	Shift.remove({}, function(err){
		if (err) console.log('error occurred');
	});




	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var employees = ['Bob', 'Bert', 'Ben', 'Belinda', 'Bernice', 'Blanter'];

//for each is blocking, don't have to worry about callback upon finish
	employees.forEach(function (name) { //make 20 employees
		var daysArray = [];
		
		dayNames.forEach(function(value){ //populate each day with availability, does all in parallel
			var shiftsArray = [];
			var shifts = Math.floor((Math.random() * 10)); //random number of available shift times
			console.log('shifts: ' + shifts);
			for(k=0; k<shifts; k++){ 
				shiftsArray.push(randomShift()); //returns random shift
			}
			
			var nextDay = new Day({
						dayName: value, //dayName from for each function
						times: shiftsArray
					});
			nextDay.save();
			console.log('day array: ' + nextDay);
			daysArray.push(nextDay);
		}); //end day loop
		var nextEmployee = new Employee({
										username: name,
										availability: {} //dont't push days array quite yet
									});
		console.log('days array length ' + daysArray.length );
		nextEmployee.availability = daysArray.map(function(currentValue){
			return currentValue._id; 
			//just put array of day _id's that can be populated into objects when taking out of db
		});
		console.log(nextEmployee);
		nextEmployee.save(function(err){
			if(err !== null) {
				console.log('saving error');
			}
			console.log('employee saved');
		});
	}); //end employee loop

	setTimeout(function() {

	console.log('finished for loop');

	Employee.find({}, function(err, result){
						console.log('retrieving employees: ');
						if(err) {
							console.log(err);
						}
						result.forEach(function(item){
							console.log(item);
						});
					});
	}, 500);
}; //end module export function

resetWithRandomData();
module.exports = resetWithRandomData;
process.exit(code(0));
