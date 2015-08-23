var mongoose = require('mongoose');
var Shift = require('./shift.js');

var daySchema = mongoose.Schema({
	dayName: String,
	times: [{type: mongoose.Schema.ObjectId, ref: 'Shift'}],
});

daySchema.methods.formatJSON = function () {
	return {
		dayName: this.dayName,
		times: this.times.map(function(value){
			return value.formatJSON();
		}).sort(function (timeObject1, timeObject2){
			return timeObject1.startTime > timeObject2.startTime;
		})
	};
};

var Day = mongoose.model("Day", daySchema, "days");
module.exports = Day;