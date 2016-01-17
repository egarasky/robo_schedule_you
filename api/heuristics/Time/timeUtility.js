var timeUtility = {};
var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var shiftMap = {}; //get passed shift map inorder

//pass in current work schedule and employee_id
timeUtility.getCurrentWorkingTime = function(currentWorkSchedule, employee_id){
	var currentWorkingTime = 0;

	dayNames.forEach(function(day){
		currentWorkSchedule[day].forEach(function(shiftsInDay){
			currentWorkingTime += this.getWorkingTimeOfDay(shiftsInDay);
		});
	});
	console.log("currentWorkingTime:" + currentWorkingTime);
	return currentWorkingTime;
};

//pass in array of shifts and emp_id -- see if employee scheduled
//shifts -- get total time
timeUtility.getWorkingTimeOfDay = function(shifts, employee_id){
	var currentDayTime = 0;
	shifts.forEach(function(shift){
		if(shift.employees.indexOf(employee_id) !== -1){
			currentDayTime += shift.getDuration(shift);
		}
	});
	return currentDayTime;
};

//get [hr, mn] shift array
timeUtility.getShiftTime = function(shiftTimeArray){
	var toMinutes = Number(shiftTimeArray[0]);
	return toMinutes + Number(shiftTimeArray[1]);
};

timeUtility.getDuration = function(shiftTimeArray){
	return this.getShiftTime(shiftTimeArray.endTime) - this.getShiftTime(shiftTimeArray.startTime);
};



