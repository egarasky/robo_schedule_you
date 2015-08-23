
var availabilityMap;
var Globalemployees;
var schedules;
var bob_id = "54f812576dfc5eec2300001c";
var linda_id = "54f812606dfc5eec2300001d";
var shift_one = "54f811186dfc5eec23000016";
var shift_two = "54f811186dfc5eec23000017";
var mapping_object;



$.getScript('/manager/scripts/Heuristics/InfoMaster.js', function()
{//get employees array
	$.getScript('/manager/scripts/Heuristics/time/timeutility.js', function(){
	$.get('/manager/employees/edit', function(theEmployees){
		Globalemployees = theEmployees;

		infoMaster.setEmployees(theEmployees);
	

	//returns map of shift_ids to array of {emp_id, overlap} objects
	$.get('/manager/availability/overlap', function(data){
		infoMaster.setAvailabilityMap(data);
	

//	array of schedules in order of startDate
	$.get('/schedules', function(data){
		schedules = data;
		infoMaster.setSchedule(schedules[0].shiftSchedule);

		infoMaster.setTimeUtility(timeUtility);
		console.log('infoMaster.getAvailability');
		console.log(infoMaster.getAvailability);
		$.getScript('/manager/scripts/heuristics/mapping_functions_object.js', function(){
			console.log('creating mapping object');
			console.log(infoMaster.getShiftMap());
			mapping_object = new mapping_functions_object(infoMaster.timeUtility,
				infoMaster.getAvailability, infoMaster.getCurrentlyScheduled, infoMaster.getShiftMap());
			$.getScript('/manager/scripts/heuristics/filter.js', function(){
				
			});
		});
	});
	});
	});

});

// console.log(infoMaster.getAvailability(shift_two, bob_id));
// console.log(infoMaster.getAvailability(shift_two, linda));
// console.log(infoMaster.getAvailability(shift_one, linda));





});





