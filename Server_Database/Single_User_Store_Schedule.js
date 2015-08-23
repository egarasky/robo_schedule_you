var express = require('express');
var mongoose = require('mongoose');
var empJSON = require('./employee.json');
var employeecontroller = require('./controllers/test.js');
var app = express();

console.log("Loaded JSON");
for (var key in empJSON){
	console.log(empJSON[key]);
}

var static_pages = __dirname + '\\..\\Client_Webpages';

console.log(static_pages);
app.use(express.static(static_pages));



var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

app.get("/employee.json", function (req, res){
	res.json(empJSON);
});

app.get('/test.json', employeecontroller.index);