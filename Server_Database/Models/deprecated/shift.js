var mongoose = require('mongoose');

var formatTime = function(num){
	return String('0' + num).slice(-2);
};

var shiftSchema = mongoose.Schema({
	name: {type: String, lowercase: true},
	startTime: [{type: Number, min: 0, max: 23, required: true}, {type: Number, min: 0, max: 59, required: true}],
	endTime: [{type: Number, min: 0, max: 23, required: true}, {type: Number, min: 0, max: 59, required: true}],
	roles: [{
		name: {type: String, lowercase: true}, //some set enum values to roles of business
		number: {type: Number, min: 0}
	}]
});

//add nice formatting methods to send over as JSON time strings
shiftSchema.methods.getStartTime = function(){
	return formatTime(this.startTime[0]) + ':' + formatTime(this.startTime[1]);
};

shiftSchema.methods.getEndTime = function() {
	return formatTime(this.endTime[0]) + ':' + formatTime(this.endTime[1]);
};

shiftSchema.methods.formatJSON =  function() {
	return {
		startTime: this.getStartTime(),
		endTime: this.getEndTime()
	};
};

//make sure end time is after start time before creating shift
// shiftSchema.pre('init', function(next){

// 	//compare hours
// 	if (this.startTime[0] < this.endTime[0]){
// 		next();
// 	} else if (this.startTime[0] === this.endTime[0] && this.startTime[1] < this.endTime[1]){
// 		next();
// 	} else {
// 		this.invalidate('startTime', 'startTime must be before endTime in shift');
// 		next(new Error('startTime must be before endTime in shift'));
// 	}

// });

var Shift = mongoose.model("Shift", shiftSchema, "shifts");


module.exports = Shift;

