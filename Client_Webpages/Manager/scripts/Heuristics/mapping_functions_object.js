var mapping_functions_object = function(timeUtility, gettingAvailability, getCurrentlyScheduled, shiftMap){
	
	this.timeUtility = timeUtility;
	//returns amount currently scheduled in minutes when passed employee_id
	
	this.currentlyScheduledTime = getCurrentlyScheduled; 
	


	//returns availability overlap in minutes when passed employee_id, shift_id
	this.availabilityTime = gettingAvailability; 

	console.log('availabilityTime');
	console.log(this.availabilityTime);
	console.log(shiftMap);
	this.shiftMap = shiftMap;
	console.log(this.shiftMap);
	/*
	**mapping functions, must be passed employee object, shift_id in that order
	*each must return value between 0 and 1, or true, false if checking for boolean properties
	*/ 
	this.availabilityMapping = function(employee, shift_id){
		console.log('availmapping');
		console.log(employee);
		if(!employee) return 0;
		console.log(shiftMap[shift_id]);
		var availOverlap = gettingAvailability(shift_id, employee._id);
		console.log('avail overlap');
		console.log(availOverlap);
		console.log(shiftMap[shift_id]);
		var shiftTotalMinutes = this.timeUtility.getDuration(shiftMap[shift_id]);
		console.log('shift duration');
		console.log(shiftTotalMinutes);
		console.log('mapping');
		console.log(availOverlap/shiftTotalMinutes);
		return availOverlap/shiftTotalMinutes;
	};

	this.underCapMapping = function(employee, shift_id){
		console.log('underCapMapping');
		console.log(underCapMapping);
		if(employee.managerpreferences.shouldCapHours){
			var currentHours = getCurrentlyScheduled(employee._id);
			var cap = employee.managerpreferences.capHours;
			var shiftMinutes = this.timeUtility.getDuration(shiftMap[shift_id]);
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
		console.log('priority mapping');
		console.log(employee);
		if(!employee) return 0;
		return employee.managerpreferences.priority;
	};

	this.underMaxMapping = function(employee, shift_id){
		console.log('underMaxMapping');
		console.log(employee);
		if(!employee) return 0;
		var max = Number(employee.maxHours) * 60;
		var currentHours = getCurrentlyScheduled(employee._id); //returned as minutes
		var shiftMinutes = timeUtility.getDuration(shiftMap[shift_id]);
		var amountUnder = cap - (currentHours + shiftMinutes);
		if(amountUnder < 0){
			return 0;
		} else {
			return amountUnder/max;
		}
	};

	this.awayFromPreferredMapping = function(employee, shift_id){
		console.log('awayFromPreferredMapping');
		console.log(employee);
		var preferredHours = Number(employee.preferred) * 60;
		var currentHours = getCurrentlyScheduled(employee._id);
		var shiftMinutes = timeUtility.getDuration(shiftMap[shift_id]);
		var amountDif = Math.abs(preferredHours - currentHours + shiftMinutes);
		return amountDif/preferredHours;
	};

};