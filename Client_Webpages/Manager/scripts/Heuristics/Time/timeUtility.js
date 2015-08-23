var timeUtility = {};
var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//pass in current work schedule and employee_id
timeUtility.getCurrentWorkingTime = function(employee_id, currentWorkSchedule){
	var currentWorkingTime = 0;

	dayNames.forEach(function(day){
			currentWorkingTime += timeUtility.getWorkingTimeOfDay(employee_id, currentWorkSchedule[day]);
		});
	console.log("currentWorkingTime:" + currentWorkingTime);
	return currentWorkingTime;
};

//pass in array of shifts and emp_id -- see if employee scheduled
//shifts -- get total time
timeUtility.getWorkingTimeOfDay = function(employee_id, shifts){
	var currentDayTime = 0;
	console.log(shifts);
	shifts.forEach(function(shift){
		if(shift.employees){
			if(shift.employees.indexOf(employee_id) !== -1){
				currentDayTime += timeUtility.getDuration(shift);
			}
		}
	});
	return currentDayTime;
};

//get [hr, mn] shift array
timeUtility.getShiftTime = function(shiftTimeArray){
	var toMinutes = Number(shiftTimeArray[0]) * 60;
	return toMinutes + Number(shiftTimeArray[1]);
};

timeUtility.getDuration = function(shift){
	console.log(shift);
	return timeUtility.getShiftTime(shift.endTime) - timeUtility.getShiftTime(shift.startTime);
};



