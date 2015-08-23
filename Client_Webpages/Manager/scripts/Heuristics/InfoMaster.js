var infoMaster = {};

infoMaster.setAvailabilityMap = function(availabilityMap){
	infoMaster.availabilityMap = availabilityMap;	 //{} of prop shift_id and array of {} with prop overlap(minutes), emp_id:
};

infoMaster.setSchedule = function(currentSchedule){
	this.schedule = currentSchedule;

};

infoMaster.getShiftMap = function(){
	infoMaster.shiftMap = {};
	for(var day in this.schedule){
		if(this.schedule.hasOwnProperty(day) && day !== '_id')
		{
			this.schedule[day].forEach(function(shift){
				console.log(shift);
				infoMaster.shiftMap[shift._id] = shift;
			});
		}	
	}
	console.log(this.shiftMap);
	return this.shiftMap;
};

infoMaster.setTimeUtility = function(timeUtility){
	this.timeUtility = timeUtility;
};

infoMaster.getAvailability = function(shift_id, emp_id){
	console.log('in infomaster');
	var shiftOverlapObj = infoMaster.availabilityMap[shift_id];
	console.log(shiftOverlapObj);
	var overLap;
	if(!shiftOverlapObj){
		return 0; //no one available;
	} else {

		shiftOverlapObj.some(function(overlapObj){
				if(overlapObj.emp_id === emp_id){
					console.log('found employee in over lap');
					overLap = overlapObj.overlap;
					return overLap;
				}
			});
		if(!overLap) overLap = 0; //emp not in shift array
		return overLap;
	}
};

infoMaster.getCurrentlyScheduled = function(employee_id){
	return this.timeUtility.getCurrentWorkingTime(employee_id, this.schedule);
};

infoMaster.setEmployees = function(employees){
	this.employees = employees;
	//not implemented yet
	// infoMaster.availablePreferences = {};
	// infoMaster.meetpreferredPrefences = {};
	// infoMaster.meetMaxHoursPreferences = {};

	// employees.forEach(function(employee){
	// 	infoMaster.availablePreferences[employee._id] = employee.preferences.available;
	// 	infoMaster.meetpreferredPrefences[employee._id] = employee.preferences.meetpreferredhours;
	// 	infoMaster.meetMaxHoursPreferences[employee._id] = employee.preferences.meetmaxhours;
	// });
};


