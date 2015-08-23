var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myTest');
var mySchema = new mongoose.Schema({
	bar: String,
	tin: Number
});

var myModel = mongoose.model("bartins", mySchema);
var myBarTin = new myModel({
	"bar": "hi",
	"tin": 11
});

myBarTin.save(function(err){
	console.log('saved bartin');
	readDB();
});

var readDB = function readDB(){
	myModel.find({}, function(err, result){
		result.forEach(function(item){
			console.log('BarTin! ' + item.bar);
		});
	});
};