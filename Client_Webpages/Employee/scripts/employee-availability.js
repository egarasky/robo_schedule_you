var main = function (employee) {
	"use strict";
	var addTimeInput;

	

	//function parameters for forEach callback: value, index, array, thisArg 
	/*
	**new-time-input
	*/

	//get business hours for employee
	var getPreferredHours = function(){
		$.get('/employee/preferred/hours', function(data){
			//data has max and preferred fields
			$('#preferred-hours').val(data.preferred);
			$('#max-hours').val(data.maxhours);
		});
	};

	getPreferredHours();

	var drawSchedule;
	$.get('/employee/hours', function(hours){
		drawSchedule = getScheduleCreator(hours);
		drawSchedule.drawWeek($('.day-names'), $('.calendar'));
		$.get('/employee/availability', function(shifts){
			drawSchedule.drawShifts(shifts);
		});
	}).fail(alert.bind(null, 'error drawing availability'));

	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	dayNames.forEach(function(value){
		var nextDay = $('<option>').text(value).val(value.toLowerCase());
		$('.day-select').append(nextDay);
	});

	$('#add-availability').on('click', function(event){
		$('.availability-edit').show();
	});

	$('#remove-availability').on('click', function(event){
		var shiftToRemove = $('.shift.selected').data('shift');
		console.log(shiftToRemove);
		if(!shiftToRemove) return;
		$.ajax({
			url: '/employee/availability',
			type: 'DELETE',
			data: {
					dayName: shiftToRemove.day,
					_id: shiftToRemove._id
				}
		}).done(function(data, textStatus, jqXHR){
			
			$('.shift.selected').remove();
		});
	});

	/*
	**HOURS
	*/
	var keyupSpinnerHandler = function(event){
		var value = $(this).spinner("value");
		if(value > $(this).spinner("max")){
			$(this).spinner("value", $(this).spinner("max"));
		} else if ( value < $(this).spinner("min")){
			$(this).spinner("value", $(this).spinner("min"));
		}
	};

	$('#preferred-hours').spinner({
		max: 40,
		min: 0,
		spin: function(event, ui){
			if($('#max-hours').spinner("value")<ui.value){
				$('#max-hours').spinner("value", ui.value);
			}
		}
	}).keyup(keyupSpinnerHandler);

	$('#max-hours').spinner({
		max: 40,
		min: 0,
		spin: function(event, ui){
			if($('#preferred-hours').spinner("value") > ui.value){
				$('#max-hours').spinner("value", $('#preferred-hours').spinner("value"));
			}
		}
	}).keyup(keyupSpinnerHandler);

	$('#update-hours').on('click', function(){
		var preferredHours = Number($('#preferred-hours').val());
		var maxHours = Number($('#max-hours').val());
		console.log(maxHours);
		$.ajax({
			url: '/employee/preferred/hours',
			data: {
				preferred: preferredHours,
				maxhours: maxHours
			},
			type: 'PUT'
		}).done(function(status){
			getPreferredHours();
		}).fail(alert.bind(null, 'preferred hours update failed'));

	});


	$('#submit').on('click', function(event){
		var timeHelper = timeFormatter();
		var timeInterval = {
			day: $('.day-select option:selected').val(),
			startTime: timeHelper.toTimeArray($('#start-time').val()),
			endTime: timeHelper.toTimeArray($('#end-time').val())
		};

		$.ajax({
			type: 'PUT',
			url: '/employee/availability/add',
			data: {newAvailability: timeInterval}
		}).done(function(data, textStatus, jqXHR){
			$.get('/employee/availability', function(shifts){
			drawSchedule.drawShifts(shifts);
			});
		}).fail(alert.bind(null, 'adding availability error'));
	});


	$(".new-time-input .clear").on("click", function (event){
		$('.start-time').val("");
		$('.end-time').val("");
	});

	//returns null if one of time inputs is not filled out completely
	//otherwise returns time interval as string hh:mm - hh:mm
	//not sure why am or pm selection is not returned in the value
	var getTimeInterval = function(){
		var startTime, endTime, timeInterval;
		startTime = $('.start-time').val();
		endTime = $('.end-time').val();
		console.log('start-time: ' + startTime);
		console.log('end-time: ' + endTime);
		$('.time-interval p').remove();
		if(startTime && endTime){
			var startTimeArr = startTime.split(":");
			var endTimeArr = endTime.split(":");
			for(var i=0; i<2; i++){
				startTimeArr[i] = parseInt(startTimeArr[i], 10); //second arg radix
				endTimeArr[i] = parseInt(endTimeArr[i], 10);
			}
			timeInterval = {
				startTime: startTimeArr,
				endTime: endTimeArr
			};
		} else {
			$('.time-interval').append($('<p>').text('Enter valid time interval').addClass('temp'));
			setTimeout(function(){
					$('.temp').remove();
				}, 1000);
		}
		return timeInterval;
	};


	$(".edit-time").click(function (event){
		var $selected = $('.selected');
		$selected.hide();
		//insert after selected hidden input
		var $divEdit = $('<div>').html(' - ').attr('id', 'div-edit');
		var $editStart = $('<input>').attr('type', 'time').
								val($selected.data('startTime')).addClass('.start-time');
		
		var $editEnd = $('<input>').attr('type', 'time').
					val($selected.data('endTime')).addClass('.end-time');
		$divEdit.prepend($editStart).append($editEnd);
		$selected.after($divEdit);
		$editStart.focus();
		//insertAfter() only works if inserting element
		//is already in DOM, append adds element as child
		//after inserts element after as wanted
		//want to set time input to default old text, needs to be
		//parsed, but want to first split into start and end time
		//$tempEdit.val($selected.text);
	});

	//time-input enter handler
	$(".new-time-input .end-time").on("keypress", function (event) {
		var timeInterval;
		if (event.keyCode === 13) {
			timeInterval = getTimeInterval(); 
			if(timeInterval){
				addTimeInput(timeInterval);
			}
		}
	});

	$(".start-time").on("keypress", function (event){
		if (event.keyCode === 13) {
			$(this).next().focus();
		}

	});


	$(".times-control .delete-time").on("click", function(){

	});



};

$(document).ready(main);