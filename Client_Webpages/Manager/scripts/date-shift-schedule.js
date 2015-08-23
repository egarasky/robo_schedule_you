var getScheduleCalendar = function(hours){
	var calHours = {};
	
		//hours returned as object with field for each day name and _id field
		//get earliest start and latest end in order to draw schedule that encompasses all shifts
		calHours.maxEnd = [0, 0];
		calHours.minStart = [23, 59];
		$.each(hours, function(day, hours){
			if(day === '_id') return true;
			calHours[day] = hours;
			if(hours.endTime[0] > calHours.maxEnd[0] || 
				(hours.endTime[0] === calHours.maxEnd[0] && hours.endTime[1] > calHours.maxEnd[1]))
			{
				calHours.maxEnd = hours.endTime;
			}

			if(hours.startTime[0] < calHours.minStart[0] ||
				(hours.startTime[0] === calHours.minStart[0] && hours.startTime[1] < calHours.minStart[1]))
			{
				calHours.minStart = hours.startTime;
			}
		});


	function drawCalendar(startDate, endDate){
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$('.day-names').empty();
	$('.calendar').empty();
	//append dummy day to center over calendar
	$('.day-names').append($('<p>').addClass('day-name').html('&nbsp'));
	//create times column
	var timesColumn = $('<div>').addClass('times');
	timesColumn.append($('<p>').text('times'));
	timesColumn.appendTo($('.calendar'));
	var currentDate = new Date(startDate);
	var stopDate = incrementedDate(endDate);
	while (currentDate.getTime() !== stopDate.getTime()){
		var nextDay = $('<div>').addClass('day').addClass(dayNames[currentDate.getDay()].toLowerCase());
		
		var dayName = $('<p>').text(dayNames[currentDate.getDay()] + ' ' + prettyDateString(currentDate)).appendTo($('.day-names'))
			.addClass('day-name');

		nextDay.appendTo($('.calendar'));
		currentDate.setDate(currentDate.getDate() + 1);
	}
} // end draw calendar

function drawShifts(shiftSchedule){
	
	//shiftSchedule is object with a field for each day of the week and each field is an array of shifts
	console.log(shiftSchedule);
	//shift mapper curried function returns function that returns parameters based on start and end time of shift
	//and earliest opening and latest closing times
	var myMapper = shiftMapper(calHours.minStart, calHours.maxEnd);
	
	$.each(shiftSchedule, function(key, value)
	{
		console.log('day name: ' + key);
		$.each(value, function(index, shift){
			
			var posDim = myMapper(shift.startTime, shift.endTime);
			var nextShift = $('<div>').css(posDim).
				addClass('shift').data('shift', shift).appendTo($('.' + key));

			nextShift.append($('<p>').text(shift.name));
			nextShift.append($('<p>').text(prettyString(shift.startTime)));
			nextShift.append($('<p>').text(prettyString(shift.endTime)));
			nextShift.append($('<ul>'));

			nextShift.on('click', function(event){
				$('.shift').removeClass('selected');
				$(this).addClass('selected');
			});


		});// end day array $.each
	
	});//end $.each for shiftSchedule object


} //drawshifts

var convertToMinutes = function(timeArray){
	return (timeArray[0] * 60) + Number(timeArray[1]);
};

var prettyString = function(timeArray){
	var formatted = formatTime(timeArray[1]);
	if(timeArray[0] > 12){
		return (timeArray[0] - 12).toString() + ':' + formatted + 'pm';
	} else if (timeArray[0] < 12){
		return timeArray[0].toString() + ':' + formatted + 'am';
	} else {
		return timeArray[0].toString() + ':' + formatted + 'pm';
	}
};

var differenceInDays = function(startDate, endDate){
	var milliseconds_in_day = 1000 * 60 * 60 * 24; 
	var days = (endDate.getTime() - startDate.getTime())/ milliseconds_in_day;
	return Math.abs(Math.floor(days));
};

var incrementedDate = function(dateToInc){
	var incDate = new Date(dateToInc);
	incDate.setDate(incDate.getDate() + 1);
	return incDate;
};

var formatTime = function(num){
	return String('0' + num).slice(-2);
};

function prettyDateString(theDate){
	return (theDate.getMonth() + 1) + '-' + theDate.getDay() + '-' + theDate.getFullYear();
}
//return position to put for css top: in relation to day container
//and hours of business
function shiftMapper(startTime, endTime){
	var startBoundary = convertToMinutes(startTime);
	var endBoundary = convertToMinutes(endTime);
	var timeOpen = endBoundary - startBoundary;
	console.log('startBoundary: ' + startBoundary);
	console.log('endBoundary: ' + endBoundary);
	console.log('timeOpen: ' + timeOpen);


	return function(startShift, endShift){
		startShift = convertToMinutes(startShift);
		console.log('startShift: ' + startShift);
		endShift = convertToMinutes(endShift);
		console.log('endShift: ' + endShift);
		var shiftDuration = endShift - startShift;
		var heightPercentage = Math.floor(shiftDuration/timeOpen * 100);
		var topPositionPercentage = Math.floor((startShift - startBoundary)/timeOpen * 100);
		var cssProp = { height: heightPercentage + '%', top: topPositionPercentage + '%' };
		console.log(cssProp);
		return cssProp;
	};
}

return {
	drawCalendar: drawCalendar,
	drawShifts: drawShifts
};

}; //end getShift calendar function
