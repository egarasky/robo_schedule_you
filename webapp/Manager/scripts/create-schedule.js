

var main = function(){
	$('#start-date').datepicker({
		minDate: 0,
		showOtherMonths: true,
		selectOtherMonths: true,
		onClose: function (selectedDate){
			$('#end-date').datepicker('option', 'minDate', selectedDate);
			var endBoundary = new Date(selectedDate);
			endBoundary.setDate(endBoundary.getDate() + 6);
			$('#end-date').datepicker('option', 'maxDate', endBoundary);

			$('#end-date').focus();
		}
	});
	$('#end-date').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		minDate: 0
	});

	$('#create-schedule-button').on('click', function(event){
		//text of date pickers is in format of mm/dd/yyyy
		//can also use .datepicker('getDate') method to get actual date object -- easier to
		//send over as string and then convert
		var startDate = $('#start-date').val();
		var endDate = $('#end-date').val();
		if (startDate && endDate){
			$.ajax({
				url: '/schedules',
				type: 'POST',
				data: {
					startDate: startDate,
					endDate: endDate
				}
			}).done(function(data, textStatus, jqXHR){
				console.log(textStatus);
				$('#start-date').val("");
				$('#end-date').val("");
			}).fail(alert.bind(null, 'error creating schedule'));
		}

	});
};

$(document).ready(main);