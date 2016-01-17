var theScheduler = {
	filters: [],
	weights: [],
	shifts: [],
	filterWeight : 2
};

theScheduler.setSchedule = function(schedule){
	//create shiftObject to iterate over
	theScheduler.shifts = [];
	var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	dayNames.forEach(function(day){
		schedule[day].forEach(function(shift){
			shift.spotsLeft = {};
			shift.roles.forEach(function(role){
				shift.spotsLeft[role.name] = role.number;
			});
			shiftArray.push(shift);
		});
	});
	shuffle(theScheduler.shiftArray);
};

theScheduler.filters = [];

theScheduler.weights = [];

theScheduler.filterWeightsForLayers = [];

theScheduler.addFilter = function(filter){
	theScheduler.filters.push(filter);
};

theScheduler.addWeight = function(weight){
	theScheduler.weights.push(weight);
};

theScheduler.setEmployees = function(employees){
	theScheduler.employees = employees;
};

theScheduler.schedule = function(callback){
	var layersOfRejection = {};
	var passedAll;
	theScheduler.shifts.forEach(function(shift){
		
		passedAll = theScheduler.filters.reduce(function(remainingEmps, currentFilter, index, filterArray){
			var filtered = currentFilter(remainingEmps, shift._id); //returns object sorted into pass, fail
			layersOfRejection[shift._id] = [].push(filtered.fail); //will end up with an array for each filter, empty or not
			return filtered.pass;
		}, theScheduler.employees);

		//check if roles are met, if not schedule each
		//weigh using last weight function
		passed.sort(theScheduler.weights[theScheduler.weights.length - 1]);
		passed.forEach(function(employee){
			if(shift.spotsLeft[employee.role] && shift.notWorking(employee._id) && 
				informationMaster.notWorkingDay(employee._id, shift.day)){//if employee role not on shift or 0 will evaluate to false
				shift.employees.push([employees._id]);
				shift.spotsLeft[employee.role] -= 1;
			}
		});
		console.log('bottom reached');

	});
	console.log('bottom reached for all');
	var layer = theScheduler.filters.length - 1;
	callback();
	setTimeout(theScheduler.collapse.bind(null, layer, layersOfRejection, callback), 500);
};

theScheduler.collapse = function(layer, layersOfRejection, callback){
	theScheduler.shifts.forEach(function(shift){
		var empsOfLayer = layersOfRejection[shift_.id][layer];
		empsOfLayer.sort(theScheduler.weights[layer]);
		//check if spots open
		empsOfLayer.forEach(function(employee){
			if(shift.spotsLeft[employee.role] && shift.notWorking(employee._id) &&
				informationMaster.notWorkingDay(employee._id, shift.day))
			{
			shift.employees.push([employees._id]);
			shift.spotsLeft[employee.role] -= 1;
			}
		});
	});
	callback();
	if(layer === 0) return;
	layer -= 1;
	setTimeout(Scheduler.collapse.bind(null, layer, layersOfRejection, callback), 500);
};

theScheduler.rolesMet = function (spotsLeft){
	rolesMet = false;
	for(var rolename in spotsLeft){
		if(spotsLeft[rolename] !== 0) rolesMet = true;
	}
	return rolesMet;
};

//Fisher-Yates shuffle from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
 }

  return array;
}