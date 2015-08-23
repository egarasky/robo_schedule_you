var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var employeeController = require('../controllers/EmployeeController.js');
var userController = require('../controllers/UserController.js');
var businessController = require('../controllers/BusinessController.js');
var shiftController = require('../controllers/ShiftController.js');
var scheduleController = require('../controllers/ScheduleController.js');
var mapController = require('../controllers/MapController.js');

//nifty little function found from searching about problems with querying by ObjectId
//http://stackoverflow.com/questions/7878557/cant-find-documents-searching-by-objectid-using-mongoose
String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

var app = express();

//secret is for cookie handling - what we sign cookie with -hash with bcrypt eventually
//session date stored server-side, session id stored client side
//saveUnitialized boolean either automatically creates session or waits to init
//resave, save session each call even if it doesn't change
app.use(session({secret: '1234kjsdaf;lij45sodjwl34kjahdawsd3rplsdf',
				 saveUninitialized: false,
				 resave: true,
				 expires: false})); //setting expires to false makes it expire when browser closes

//setup body parsing module, get body from request as well as
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//CONNECT TO DATABASE
//mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/employeescheduler');

var server = app.listen(3000, function(err){
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
});

var static_pages = __dirname + '/../../Client_Webpages';
app.use('/', express.static(static_pages));
//set rendering engine to create html pages for browser


//denote regex with () and then a segment to match inside another ()
app.use('/manager((*))', function(req, res, next){
	if(!req.session._id || req.session.account !== 'user'){
		console.log('not approved redirected');
		res.redirect('/');
	} else {
		next();	
	}
});

app.use('/employee((*))', function(req, res, next){
	if(!req.session._id || req.session.account != 'emp'){
		console.log('not approved redirected');
		res.redirect('/');
	} else {
		next();	
	}
});
//add static_pages after routes you want it to go behind

app.use(express.static(static_pages));

app.post("/login", userController.login);

app.post("/user", userController.create);
//middleware for user check cookie
app.use('/user((*))', function(req, res, next){
	if(!req.session._id){
		res.redirect('/');
	} else {
		next();	
	}
});
app.delete("/user", userController.logout);

app.get("/business/roles", businessController.roles);
app.put("/business/roles", businessController.addRole);
app.put("/business/roles/change", businessController.editRole);
app.delete("/business/roles", businessController.deleteRole);

app.get("/business/hours", businessController.getHours);
app.post("/business/hours", businessController.setHours);


app.get("/shifts", shiftController.shifts);
app.put('/shifts/add', shiftController.addShift);
//app.put('/shifts/change', shiftController.changeShift);
app.delete('/shifts', shiftController.deleteShift);

app.get("/schedules", scheduleController.retrieve);
app.post("/schedules", scheduleController.create);
app.delete('/manager/schedules', scheduleController.deleteSchedule);
app.put("/manager/shift/employees", scheduleController.updateShiftOfSchedule);

//controlling employees from business page add, remove, change role
app.get('/manager/employees/edit', employeeController.getEmployeesForEdit);
app.put('/manager/employee/preferences', employeeController.updateEmployeePreferences);
// app.get('/manager/employees/')
app.delete('/manager/employees', employeeController.deleteEmployee);
app.post('/manager/employees', employeeController.create);

//edit-schedule retrieving map objects
app.get('/manager/employees/map', mapController.employeeMap);
app.get('/manager/availability/overlap', mapController.availabilityMap);


app.get("/test", function(req, res){
	var myPath = path.resolve(__dirname + '/../../Client_Webpages/test.html');
	res.sendFile(myPath);
});



/*
** CONTROL FROM EMPLOYEE
*/
app.get('/employee/availability', employeeController.getAvailability);
app.get('/employee/hours', employeeController.getHours);
app.put('/employee/availability/add', employeeController.addAvailability);
app.delete('/employee/availability', employeeController.removeAvailability);

app.get('/employee/preferred/hours', employeeController.getHoursPreferences);
app.put('/employee/preferred/hours', employeeController.updateHoursPreferences);