var mongoose = require('mongoose');
var User = require(projectPath('/models/manager/manager-model.js'));
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10; //bcrypt defaults to 10 anyways


//var deepPopulate = require('mongoose-deep-populate');

//[hr, mn]
var time = [{type: Number, min: 0, max: 23, required: true}, {type: Number, min: 0, max: 59, required: true}];

var timeInterval = {
	startTime: time,
	endTime: time,
	preference: Number
};

function createAvailabilitySchedule(){
	return {
		sunday: [timeInterval],
		monday: [timeInterval],
		tuesday: [timeInterval],
		wednesday: [timeInterval],
		thursday: [timeInterval],
		friday: [timeInterval],
		saturday: [timeInterval]
	};
}

var employeeSchema = mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	userName: {type: String, required: true},
	password: {type: String, required: true},
	role: {type: String, required: true},
	availability: createAvailabilitySchedule(),
	business: {type: mongoose.Schema.ObjectId, ref: 'User'},
	managerPreferences: {
		priority: {type: Number, min: 0, max: 1},
		fulltime: Boolean,
		capHours: {type: Number, min: 0, max: 40},
		shouldCapHours: Boolean
	},

	preferred: {type: Number, min: 0, max: 40},
	maxHours: {type: Number, min: 0, max: 40},


	preferences: {
		available: {type: Number, min: 0, max: 1},
		meetPreferredHours: {type: Number, min: 0, max: 1},
		meetMaxHours: {type: Number, min: 0, max: 1},
		preference: {type: Number, min: 0, max: 1},
	}
});

employeeSchema.methods.formatJSON = function () {
	var that = this;
	return {
		userName: this.userName,
		role: this.role,
		availability: this.availability.map(function(day){
			return day.formatJSON();
		})
	};
};

//hash password presave using mongoose middleware
employeeSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next(); //skip rest if password isn't new or changed

	//generate salt, used for hashing algorithm
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return next(err);

		//hash password with generated salt
		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) return next(err);

			user.password = hash;//password reassigned hashed password instead of text
			next(); //call save or next middleware function
		});
	}); //end bcrypt genSalt
});

//verifying password, need to use bcrypt to compare
employeeSchema.methods.comparePassword = function(candidate, callback){
	//compare passed in password with password of instance, function is called with
	//err, boolean for matching parameters
	console.log('candidate: ' + candidate);
	console.log('manager password' + this.password);
	bcrypt.compare(candidate, this.password, function(err, match){
		if(err) return callback(err);
		callback(null, match);
	});
};

//enable deep populate with plugin install
//employeeSchema.plugin(deepPopulate);

//first Arg is model name used to refer to when nesting objects
//third arg is collection to overlay Schema on too
//schema can refer to model in instance methods this.model['ModelName']
//use for shorthand searches
var Employee = mongoose.model('Employee', employeeSchema, 'employees');

module.exports = Employee;