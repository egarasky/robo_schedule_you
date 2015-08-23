var main = function(){
	var scheduleCalendar; //draws shifts, calendar
	var employeeMap; //object with key, value pairs of _id, employee object corresponding to _id
	var availabilityMap; 
	//object with key, value pairs of _id(of shift), array objects with emp_id and overlap fields
	//employees not included have 0 overlap of availability

	$.get('/business/hours', function(hours){
		scheduleCalendar = getScheduleCreator(hours);
		getSchedules();	
	});

	$.get('/manager/employees/map', function(sentEmployeeMap){
		employeeMap = sentEmployeeMap;
		//console.log('employee map');
		//console.log(employeeMap);
	});
	
	$.get('/manager/availability/overlap', function(sentAvailabilityMap){
		availabilityMap = sentAvailabilityMap;
		//console.log('availability map; ');
		//console.log(availabilityMap);
	});
		
	function getSchedules(){
		$.get('/schedules', function(schedules){//assume they are sent in order from earliest start date
				$('#select-schedule').empty();
				$.each(schedules, function(index, schedule){
					schedule.startDate = new Date(schedule.startDate);
					schedule.endDate = new Date(schedule.endDate);
					$('<option>').text(
						prettyDateString(schedule.startDate) + ' -- ' + prettyDateString(schedule.endDate)
					).data('schedule', schedule).appendTo($('#select-schedule'));
				});
				$('#select-schedule').trigger('change');
			});	
		}

	$('#select-schedule').change(function(event){
		var schedule = $('#select-schedule option:selected').data('schedule');
		scheduleCalendar.drawCalendar(schedule.startDate, schedule.endDate, $('.day-names'), $('.calendar'));
		scheduleCalendar.drawShifts(schedule.shiftSchedule);
	});

	$('#delete-schedule').click(function(event){
		var toRemoveId = $('#select-schedule option:selected').data('schedule')._id;
		//console.log(toRemoveId);
		$.ajax({
			url: '/manager/schedules',
			data: {schedule_id: toRemoveId},
			type: 'DELETE'
		}).done(function(data, textStatus, jqXHR){
			getSchedules();
		}).fail(alert.bind(null, 'delete schedule error'));
	});

	//sets up shift info when shift is clicked on calendar
	$('.shift-schedule').on('click', '.shift', function(event){
		$('.employee-container div').empty();
		var shift = $('.selected').data('shift');
		//console.log('shift selected');
		//console.log(shift);

		if(!shift.roles) shift.roles = [];
		if(!shift.employees) shift.employees = [];
		
		//turns into actual employees
		employeeObjs = shift.employees.map(function(employee_id){
			return employeeMap[employee_id];
		});

		//console.log('shift employees');
		//console.log(shift.employees);

		//console.log('roles');
		//console.log(shift.roles);

		//create a list of currently working employees for each role of shift
		shift.roles.forEach(function(role){
			var $roleCont = $('<div>').addClass(role.name + '-cont');
			$roleCont.append($('<h4>').text(role.name + ' ' + role.number));
			$roleCont.append($('<h4>').text('Currently Scheduled:'));		
			var $roleDisplay = $('<ul>').addClass(role.name);
			$roleCont.append($roleDisplay);
			$('.scheduled-employees').append($roleCont);
		});

		// //console.log('getting overlap of employees');

		// var getOverlap = function getOverlap(shift_id, emp_id){
		// 	var overLap;
		// 	var shiftArray = availabilityMap[shift_id];
		// 	if(!shiftArray) return 0;
		// 	shiftArray.some(function(overLapObj){
		// 		if(overLapObj.emp_id === emp_id){
					// //console.log('found employee in over lap');
		// 			overLap = overLapObj.overlap;
		// 			return overlap;
		// 		}
		// 	});
		// 	if(!overLap) overLap = 0;
		// 	return overLap;
		// };

		//iterate through employees creating list item for each and appending to proper role list
		employeeObjs.forEach(function(employee){
			//console.log('appending employees');
			//console.log(employee);
			//console.log(employee.role);
			// var percentOverlap = getOverlap();
			//console.log($('.' + employee.role));
			$('<li>').append($('<p>').text(nameRoleString(employee))).data('employee', employee).
				addClass('employee').appendTo($('.' + employee.role));
		});


		//get available employees
		//console.log('getting available employees');
		if(true){ //check if any employees are available
			//filter out employees already working shift and shifts that overlap
			//console.log('availabilityMap for shift: ');
			//console.log(availabilityMap[shift._id]);
			//console.log('filtering based on not working');
			// var notWorkingAlready = availabilityMap[shift._id].filter(function(overlapObj, index, arr){
			// 	//console.log(overlapObj.emp_id);
			// 	//console.log(shift.employees.indexOf(overlapObj.emp_id));
			// 	if(shift.employees.indexOf(overlapObj.emp_id) !== -1) return false; 
			// 	return true;
			// });
			
			// //console.log('available and not working');
			// //console.log(notWorkingAlready);
			//get shifts of that day and check for overlap if overlap remove employees working overlap shift
			var schedule = $('#select-schedule option:selected').data('schedule');
			// //console.log('schedule');
			// //console.log(schedule);
			
			//since shift knows what day of week it is can look up in schedule
			//filter for overlap

			// var notWorkingThatDay = notWorkingAlready.filter(function(overlapObj){
			// 		//console.log(overlapObj);
			// 		var notWorking = true;
			// 		var oneShiftPerDay = true;
			// 		if(oneShiftPerDay){
			// 			schedule.shiftSchedule[shift.day].forEach(function(otherShift){
			// 				//for each shift of day check if the employee is working it
			// 				if(otherShift.employees.indexOf(overlapObj.emp_id) !== -1 && 
			// 					otherShift._id !== shift._id) {
			// 					//console.log('trigger false');
			// 					notWorking = false;
			// 				}
			// 			});
			// 		} else {
			// 			schedule[shift.day].forEach(function(otherShift){
			// 				if(shift.overLaps(otherShift)){
			// 					if(otherShift._id === shift._id) return;
			// 					if(otherShift.employees.indexOf(emp._id) !== -1) notWorking = false;
			// 				} 
			// 			});
			// 		}
			// 	return notWorking;
			// });
			// //console.log(notWorkingThatDay);

			//need one more filter for overlap tolerance

			//availableEmps filtered for overlap and currently working, now display as list
			var $availDiv = $('.available-employees');

			$availDiv.append($('<h4>').text('Available Employees:'));
			var $availList = $('<ul>').appendTo($availDiv).addClass('availability-list');
			var filteredEmployees = filterEmployees(Globalemployees);
			//console.log(Globalemployees);
			//console.log(filteredEmployees);
			//if(!Array.isArray(filteredEmployees)) {filteredEmployees = [filteredEmployees]};
			//console.log('appending filtered employees');
			filteredEmployees.forEach(function(employee){
				// var empObject = employeeMap[empOverlap.emp_id];
				// var percent = percentOverlap(shift, empOverlap.overlap);
				var empString = $('<p>').text(nameRoleString(employee));
				$availList.append($('<li>').append(empString).data('employee', employee));
			});
			//console.log('availDiv');
			//console.log($availDiv);

		} else {//no employees available
			//console.log('no employees that overlap at all');
			$('.available-employees').append($('<h4>').text('no available employees'));
		}
	}); //end .shift on click


	//add click handler
	$('.available-employees').on('click', 'li', function(event){
		$('li.selected > button').remove();
		$('li.selected').removeClass('selected');
		//this is clicked list item
		$(this).addClass('selected');
		var addButton = $('<button>').addClass('add-button');
		addButton.text('Add');
		$(this).append(addButton);
		addButton.on('click', function(event){
			var empLi = $(this).parent();
			var empRole = empLi.data('employee').role;
			$(this).remove();
			$('.scheduled-employees .' + empRole).append(empLi);
			empLi.removeClass('selected');
		}); 
	});

	$('.scheduled-employees').on('click', 'li', function(event){
		$('li.selected .remove-button').remove();
		$('li.selected').removeClass('selected');
		//this is clicked list item
		$(this).addClass('selected');
		var removeButton = $('<button>').addClass('remove-button');
		removeButton.text('Remove');
		$(this).append(removeButton);
		removeButton.on('click', function(event){
			var empLi = $(this).parent();
			$(this).remove();
			//filter based on dragging bar eventually
			$('.available-employees').append(empLi);
			empLi.removeClass('selected');
		}); 
	});

//submit to server
	$('#submit-changes').on('click', function(event){
		var emp_ids = [];
		$('.scheduled-employees li').each(function(index){
			emp_ids.push($(this).data('employee')._id);
		});
		var shift = $('.shift-schedule .selected').data('shift');
		var data = {
			schedule_id: $('#select-schedule option:selected').data('schedule')._id,
			employee_ids: emp_ids,
			shift_id: shift._id,
			dayname: shift.day
		};

		//console.log('data to set');
		//console.log(data);

		$.ajax({
			url: '/manager/shift/employees',
			type: 'PUT',
			data: data
		}).done(function(){
			getSchedules();
		}).fail(alert.bind(null, 'update shift failed'));
	});

	$('.filter-select').each(function(index){
		$(this).append($('<option>').text('Priority').data('filter', mapping_object.priorityMapping));
		$(this).append($('<option>').text('Preferred Hours').data('filter', mapping_object.awayFromPreferredMapping));
		$(this).append($('<option>').text('Availability').data('filter', mapping_object.availabilityMapping));
		$(this).append($('<option>').text('underMaxMapping').data('filter'));
	});

	// $('.filter-select').on('change', function(){
	// 	//console.log('filter-select change');
	// 	$('.filter-container input').trigger('change');
	// });


	$('.filter-container input').on('change mousemove', function(){
		
		$('.selected').trigger('click');
	});

};

var filterEmployees = function(employees){
	var newFilter;
	var filtered;
		$('.filter-select option:selected').each(function(index){
			var weight = $(this).parent().siblings('input').val()/100;
			var filterFunction = $(this).data('filter');
			console.log('threshold');
			console.log(weight);
			//console.log(filterFunction);

			var theFilter = filterCreator.createThresholdFilter(filterFunction, weight);
			//console.log(theFilter);
			if(index === 0){
				newFilter = theFilter;
			} else {
				newFilter = filterCreator.and(theFilter);
			}
			//console.log('in filter employees');
			//console.log($('.selected').data('shift')._id);
			//console.log(Globalemployees);
			//console.log('returning');
			filtered = newFilter(Globalemployees, $('.selected').data('shift')._id);
			//console.log(filtered);
			//console.log('from filtered please work');
			
	});
	return filtered;
};

function percentOverlap(shift, empOverlap){
	return Math.floor((empOverlap/getShiftLength(shift)) * 100);

}

function getShiftLength(shift){
	var hours = shift.endTime[0] - shift.startTime[0];
	var minutes = shift.endTime[1] - shift.endTime[1];
	return hours * 60 + minutes;
}

function nameRoleString(empObject, percent){
	//console.log(empObject);
	var percentString = "";
	if(percent){
		percentString = " " + percent + "% Overlap";
	}
	//console.log('from namerole');
	return empObject.firstname + ' ' + empObject.lastname + 
		': ' + empObject.role + percentString;
}

function prettyDateString(theDate){
	return (theDate.getMonth() + 1) + '-' + theDate.getDate() + '-' + theDate.getFullYear();
}

$(document).ready(main);