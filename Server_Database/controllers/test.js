var Employee = require('../models/employee.js'),
	mongoose = require('mongoose');
var db;
var TestController = {};

mongoose.connect('mongodb://localhost:27017/test');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connecion error'));
db.once('open', console.log.bind(console, 'connected to test database'));



TestController.index = function (req, res){
	console.log('index called on test');
	res.send(200); //200 hundred is code indicating success/received and f

};

module.exports = TestController;