var mongoose = require('mongoose');
var Employee = require('../Models/employee.js');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/test');

var schema = new mongoose.Schema({ name: String});
schema.set('id', false); //schema is object since set can be called on it
mongoose.model('cats', schema);
//now must check model -- clearly exists since functions can be called
mongoose.model('cats').create({ name: 'Bob' }, function(err, result){
	console.log('bob created');
});

mongoose.model('cats').find({}, function(err, result){
	result.forEach(function(item){
		console.log(item.name + ' meows');
	});
});

new Employee({'username': 'Fred'}).save(function(err, result){
	console.log('fred saved');
});

Employee.find({}, {username: 1}, function(err, result){
	var that = this;
	result.forEach(function(item){
		//iterate through object properties

		console.log('employee: ' + item.username);
	});
});
