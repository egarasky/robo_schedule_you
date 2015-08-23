var mapping_functions_object = function(timeUtility, gettingAvailability, getCurrentlyScheduled){
	
	this.timeUtility = timeUtility;
	//returns amount currently scheduled in minutes when passed employee_id
	
	this.currentlyScheduledTime = getCurrentlyScheduled; 
	

	//returns availability overlap in minutes when passed employee_id, shift_id
	this.availabilityTime = gettingAvailability; 
	
	//returns totalTimeOfShift when passed shift_id
	this.shiftTotalTime = getShiftTotalTime;

	/*
	**mapping functions, must be passed employee object, shift_id in that order
	*each must return value between 0 and 1, or true, false if checking for boolean properties
	*/ 
	this.availabilityMapping = function(employee, shift_id){
		var availOverlap = this.availabilityTime(employee._id, shift_id);
		var shiftTotalMinutes = this.timeUtility.getDuration(shift_id);
		return availOverlap/shiftTotalMinutes;
	};

	this.underCapMapping = function(employee, shift_id){
		if(employee.managerpreferences.shouldCapHours){
			var currentHours = getCurrentlyScheduled(employee_id);
			var cap = employee.managerpreferences.capHours;
			var shiftMinutes = this.timeUtility.getDuration(shift_id);
			var amountUnder = cap - (currentHours + shiftMinutes); //want to know if would be over if scheduled
			if(amountUnder < 0){
				return 0;
			} else {
				return amountUnder/cap;
			}
		} else {
			return 1;
		}
	};

	this.priorityMapping = function(employee, shift_id){
		return employee.managerpreferences.priority;
	};

	this.underMaxMapping = function(employee, shift_id){
		var max = Number(employee.maxHours) * 60;
		var currentHours = getCurrentlyScheduled(employee._id); //returned as minutes
		var shiftMinutes = timeUtility.getDuration(shift_id);
		var amountUnder = cap - (currentHours + shiftMinutes);
		if(amountUnder < 0){
			return 0;
		} else {
			return amountUnder/max;
		}
	};

	this.awayFromPreferredMapping = function(employee, shift_id){
		var preferredHours = Number(employee.preferred) * 60;
		var currentHours = getCurrentlyScheduled(employee._id);
		var shiftMinutes = timeUtility.getDuration(shift_id);
		var amountDif = Math.abs(preferredHours - currentHours + shiftMinutes);
		return amountDif/preferredHours;
	};

};