var main = function(){
	
	//function introduced into global domain by loading shift-schedule.js in shift-schedule.html
	var shiftCalendar;
	$.ajax({
		url: '/business/hours', 
		type: 'GET',
		}).done(function(hours){
			shiftCalendar = getScheduleCreator(hours); 
			shiftCalendar.drawWeek($('.day-names'), $('.calendar'));
			$.get('/shifts', function(shiftSchedule){ 
				shiftCalendar.drawShifts(shiftSchedule);
			});	
		});
	setUpEditShift();

	//marks with class selected in shift-schedule.js -- wanted to display selected information
	$('.calendar').on('click', '.shift', function(event){
		$('#cancel-submit').trigger('click');
		$('.shift-info').remove();
		var $shift_info = $('<div>').addClass('shift-info');
		var shift = $('.shift.selected').data('shift');
		var $shift_roles = $('<ul>');
		shift.roles.forEach(function(role){
			$('<p>').text(role.name + ' ' + role.number).appendTo($('<li>').appendTo($shift_roles));
		});
		$shift_roles.appendTo($shift_info.appendTo($('.shift-control')));
	});

	$('#add-shift').on('click', function(event){
		$('.shift-info').remove();
		$('.shift-edit').show();
	});

	$('#remove-shift').on('click', function(event){
		var shiftToRemove = $('.shift.selected').data('shift');
		console.log(shiftToRemove);
		$.ajax({
			url: '/shifts',
			type: 'DELETE',
			data: {
				dayName: shiftToRemove.day,
				shiftName: shiftToRemove.name
				}
		}).done(function(data, textStatus, jqXHR){
				$('.shift.selected').remove();
				$('.shift-info').remove();
			}).
			fail(alert.bind(null, 'Server error removing shift'));
	});


	$('#submit-shift').on('click', function(event){
		var shift = getShiftInfo();
		$.ajax({
			url: '/shifts/add',
			type: 'PUT',
			data: {new_shift: shift},
		}).done(function(data, textStatus, jqXHR){
			console.log('data: ');
			console.log(data);
			console.log('textStatus: ');
			console.log(textStatus);
			console.log('jqXHR: ');
			console.log(jqXHR);
			$.get('/shifts', function(shiftSchedule){ 
				$('.day').empty();
				shiftCalendar.drawShifts(shiftSchedule);
			});	
		}).
		fail(alert.bind(null, 'failure to add shift'));
	});

	$('#cancel-submit').on('click', function(event){
		//clear role list and inputs
		$('.working-roles > li').remove();
		$('.shift-edit > input').val("");
		$('.shift-edit').hide();
	});

}; //end main function



var setUpEditShift = function(){
	$.get('/business/roles', function(roles){
		var roleSelect = $('.roles-select').attr('size', 1);
		roles.forEach(function(role){
			var nextRole = $('<option>').text(role).val(role);
			nextRole.appendTo(roleSelect);
		});
	}).fail(function(data, testStatus, jqXHR){
		console.log('Error getting available roles');
	});

	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	dayNames.forEach(function(dayName){
		$('<option>').text(dayName).val(dayName.toLowerCase()).appendTo($('.day-select'));
	});

	$('.add-role').on('click', function(event){
			var roleToAdd = $('.roles-select option:selected').text();
			//append to working-roles class as list item -- also need quantity editor
			var alreadyAdded = false;
			$('.working-roles li .role-name').each(function(){
				if($(this).text() === roleToAdd) alreadyAdded = true;
			});
			if(!alreadyAdded){
				
				var roleListItem = $('<li>');
				roleListItem.append($('<span>').text(roleToAdd).addClass('role-name'));
				var quantitySelect = $('<select>').attr('size', 1);
				for(var i=1; i<11; i++){
					$('<option>').text(i).val(i).appendTo(quantitySelect);
				}
				roleListItem.append(quantitySelect);
				var removeBtn = $('<button>').attr('type', 'button').text('remove');
				removeBtn.on('click', function(event){
					$(this).parent().remove();
				});
				roleListItem.append(removeBtn);
				$('.working-roles').append(roleListItem);
			
			}
		});



}; //setUpEditShift

var getShiftInfo = function getShiftInfo(){
	var shift = {};
	shift.name = $('#shift-name').val();
	
	//each li has <p>name<select(quantity)><button (remove)>
	shift.roles = [];
	$('.working-roles li').each(function(){
		var role = {};
		role.name = $('.role-name', $(this)).text();
		role.number = $('option:selected', $(this)).val();
		console.log(role);
		shift.roles.push(role);
	});

	function convertTime(time){
		var timeArr = time.split(":");
		for(var i=0; i<2; i++){
			timeArr[i] = parseInt(timeArr[i], 10); //second arg radix
		}
		return timeArr;
	}

	shift.startTime = convertTime($('#start-time').val());
	shift.endTime = convertTime($('#end-time').val());
	shift.day = $('.day-select option:selected').val();

	console.log(shift);
	return shift;
};

$(document).ready(main);