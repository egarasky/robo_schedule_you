var mongoose = require('mongoose');
var Employee = require('./employee.js');
var bcrypt = require('bcrypt');
var deepPopulate = require('mongoose-deep-populate');
SALT_WORK_FACTOR = 10; //bcrypt defaults to 10 anyways
 
//password hasing from this nice tutorial
//http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

var time =  function(){
	return [{type: Number, required: true, min: 0, max: 23}, {type: Number, required: true, min: 0, max: 59}];
};


function dayHours(){
//define own object instead of schema for hours object
//trouble casting... can't be singular -- only array or objectIds -- can't cast to object Ids...

	return {
		startTime: time(),
		endTime: time()
	};
}

function deleteId(myObject){
	delete myObject._id;
	for(var prop in myObject){
		if(typeof myObject[prop] === 'object' && myObject.hasOwnProperty(prop)) deleteId(myObject[prop]);
	}
	return myObject;
}

function copySchedule(shiftSchedule){
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var nSchedule = createShiftSchedule();
	days.forEach(function(day){
		nSchedule[day] = shiftSchedule[day];
		nSchedule[day].forEach(function(shift){
			shift._id = new mongoose.Types.ObjectId();
			shift.employees = [];
		});
	});
	nSchedule._id = new mongoose.Types.ObjectId();
	return nSchedule;
}

var shift = mongoose.Schema({
		roles: [{
			name: {type: String, required: true},
			number: {type: Number, required: true},
		}],
		startTime: [Number, Number],
		endTime: [Number, Number],
		name: {type: String, required: true},
		employees: [{type: mongoose.Schema.ObjectId, ref: 'Employee'}]
});

function createShiftSchedule(){
	return  {//like availability for employee but shifts will have roles and name as well
			sunday: [shift],
			monday: [shift],
			tuesday: [shift],
			wednesday: [shift],
			thursday: [shift],
			friday: [shift],
			saturday: [shift]
		};
}

var userSchema = mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	userName: {type: String, required: true, index:{ unique: true}}, //ensures path is created for field, set index if you know you will be querying it 
	password: {type: String, required: true},
	roles: [{type: String, lowercase: true}],
	shiftSchedule: createShiftSchedule(), //eventually expand to be array, so that different generic schedules can be selected
	hours: {
			sunday: dayHours(),
			monday: dayHours(),
			tuesday: dayHours(),
			wednesday: dayHours(),
			thursday: dayHours(),
			friday: dayHours(),
			saturday: dayHours()
		},
	schedules: [{
		shiftSchedule: {type: createShiftSchedule(), required: true},
		startDate: {type: Date, required: true},
		endDate: {type: Date, required: true},
	}]
});

//hash password presave using mongoose middleware
userSchema.pre('save', function(next){
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
userSchema.methods.comparePassword = function(candidate, callback){
	//compare passed in password with password of instance, function is called with
	//err, boolean for matching parameters
	console.log('candidate: ' + candidate);
	console.log('user password' + this.password);
	bcrypt.compare(candidate, this.password, function(err, match){
		if(err) return callback(err);
		callback(null, match);
	});
};

userSchema.methods.addSchedule = function(startDate, endDate){
	// var shiftScheduleCopy = deleteId(JSON.parse(JSON.stringify(this.shiftSchedule)));

	var shiftScheduleCopy = copySchedule(this.shiftSchedule);
	console.log('deleted Ids');
	console.log(shiftScheduleCopy);
	var nSchedule = {
		shiftSchedule: shiftScheduleCopy,
		startDate: new Date(startDate),
		endDate: new Date(endDate)
	};
	this.schedules.push(nSchedule);
	// console.log('before adding schedule length: ');
	// console.log(this.schedules.length);
	// console.log('nSchedule startDate: ');
	// console.log(nSchedule.startDate);

	// if(this.schedules.length === 0) {
	// 	this.schedules.push(nSchedule);
	// } else {
	// 	this.schedules.some(function(sched, index, schedules){
	// 		console.log(sched.startDate);
	// 		if(nSchedule.startDate < sched.startDate){
	// 			schedules.splice(index - 1, 0, nSchedule);
	// 			return true;
	// 		} else if(index === schedules.length - 1){
	// 			schedules.push(nSchedule);
	// 		}
	// 	});
	// }
	// console.log('after: ' + this.schedules.length);
	this.markModified('schedules');

};



userSchema.plugin(deepPopulate);

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;

