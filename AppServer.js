var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
projectPath = function(path){
    return __dirname + path;
};


var userController = require('./end-points/user/main/user-controller.js');

var BusinessRoutes = require('./end-points/business/main/business-routes.js');

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//CONNECT TO DATABASE
//mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/employeescheduler');

var server = app.listen(3000, function(err){
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
});

var static_pages = __dirname + '/../../webapp';


//denote regex with () and then a segment to match inside another ()
app.use('/manager((*))', function(req, res, next){
	if(!req.session._id || req.session.account !== 'manager'){
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


//middleware for manager check cookie
app.use('/manager((*))', function(req, res, next){
	if(!req.session._id){
		res.redirect('/');
	} else {
		next();	
	}
});

BusinessRoutes.setRoutes(app);

module.exports = app;