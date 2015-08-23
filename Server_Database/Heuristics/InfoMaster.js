var infoMaster = {};

infoMaster.setAvailabilityMap = function(availabilityMap){
	this.availabilityMap = availabilityMap;	 //{} of prop shift_id and array of {} with prop overlap(minutes), emp_id:
};

infoMaster.setSchedule = function(currentSchedule){
	this.schedule = currentSchedule;
};

infoMaster.setTimeUtility = function(timeUtility){
	this.timeUtility = timeUtility;
};

infoMaster.getAvailability = function(shift_id, emp_id){
	var shiftOfOverlapObj = infoMaster.availabilityMap[shift_id];
	var overlap;
	if(!shiftOfOverlapObj){
		return 0; //no one available;
	} else {
		
		shiftOfOverlapObj.some(function(overLapObj){
				if(overLapObj.emp_id === emp_id){
					console.log('found employee in over lap');
					console.log('emp' + emp_id);
					console.log('overlap emp' + emp_id);
					overLap = overLapObj.overlap;
					return overlap;
				}
			});
		if(!overLap) overLap = 0; //emp not in shift array
		return overLap;
	}
};

infoMaster.getCurrentlyScheduled = function(employee_id){
	return infoMaster.timeUtility.getCurrentWorkingTime(infoMaster.schedule);
};

infoMaster.setEmployees = function(employees){
	infoMaster.employees = employees;
	infoMaster.availablePreferences = {};
	infoMaster.meetpreferredPrefences = {};
	infoMaster.meetMaxHoursPreferences = {};

	employees.forEach(function(employee){
		infoMaster.availablePreferences[employee._id] = employee.preferences.available;
		infoMaster.meetpreferredPrefences[employee._id] = employee.preferences.meetpreferredhours;
		infoMaster.meetMaxHoursPreferences[employee._id] = employee.preferences.meetmaxhours;
	});
};



