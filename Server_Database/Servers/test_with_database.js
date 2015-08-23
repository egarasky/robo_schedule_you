var mongoose = require('mongoose');
var mapController = require('../controllers/MapController.js');
var User = require('../Models/user.js');

mongoose.connect('mongodb://localhost/employeescheduler');


// User.findOne({userName: 'hi'}, function(err, user){
// 	console.log('user: ' + user._id);
// 	// mapController.employeeMap(user);
// 	user.session = {};
// 	user.session._id = user._id;
// 	console.log(mapController.availabilityMap(user));

// });

console.log(JSON.stringify(User.schema.path('schedules')));
