var getScheduleCreator = function(hours){
	// console.log(hours);
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	// hours = dayNames.map(function(day){
	// 	return {
	// 		startTime: [Number(hours[day.toLowerCase()].startTime[0]), Number(hours[day.toLowerCase()].startTime[1])],
	// 		endTime: [Number(hours[day.toLowerCase()].endTime[0]), Number(hours[day.toLowerCase()].startTime[0])]
	// 	};
	// });
	function convertWeekObjectToNumber(weekobj){
		dayNames.forEach(function(day){

			hours[day.toLowerCase()].startTime = 
				[Number(hours[day.toLowerCase()].startTime[0]), 
					Number(hours[day.toLowerCase()].startTime[1])];
			hours[day.toLowerCase()].endTime = 
						[Number(hours[day.toLowerCase()].endTime[0]), 
							Number(hours[day.toLowerCase()].endTime[1])];
		});
	}

	convertWeekObjectToNumber(hours);

	// console.log(hours);

	var calHours = {};
	
	var convertToMinutes = function convertToMinutes(timeArray){
	return ( Number(timeArray[0]) * 60)  + Number(timeArray[1]);
	};
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

	//return position to put for css top: in relation to day container
	//and hours of business
	var shiftMapper = function shiftMapper(startTime, endTime){
		var startBoundary = convertToMinutes(startTime);
		var endBoundary = convertToMinutes(endTime);
		var timeOpen = endBoundary - startBoundary;


		return function(startShift, endShift){
			startShift = convertToMinutes(startShift);
			endShift = convertToMinutes(endShift);
			var shiftDuration = endShift - startShift;
			var heightPercentage = Math.floor(shiftDuration/timeOpen * 100);
			var topPositionPercentage = Math.floor((( startShift - startBoundary )/timeOpen) * 100);
			var cssProp = { height: (heightPercentage + '%'), top: (topPositionPercentage + '%') };
			return cssProp;
		};
	};

	function timeMapper(earliestOpen, latestOpen){
		var startBoundary = Number(convertToMinutes(earliestOpen));
		var endBoundary = Number(convertToMinutes(latestOpen));
		var timeOpen = endBoundary - startBoundary;
		// console.log('latestOpen');
		// console.log(latestOpen);
		// console.log('earliestOpen');
		// console.log(earliestOpen);
		// console.log('startBoundary');
		// console.log(startBoundary);
		// console.log('endBoundary');
		// console.log(endBoundary);
		// console.log('timeOpen');
		// console.log(timeOpen);

		return function(time){//[hr, min] array
			var minutes = Number(convertToMinutes(time));
			// console.log('minutes');
			// console.log(minutes);
			// console.log(typeof minutes);
			var topPositionPercentage = Math.floor(((minutes - Number(startBoundary))/Number(timeOpen)) * 100);
			// console.log(topPositionPercentage);
			return {top: (topPositionPercentage + '%')};
		};
	}
	
	// console.log( convertToMinutes);
	var myMapper = shiftMapper(calHours.minStart, calHours.maxEnd);
	var myTimeMapper = timeMapper(calHours.minStart, calHours.maxEnd);

	function drawCalendar(startDate, endDate, headerDiv, calDiv){
	calDiv.css('overflow', 'hidden');
	headerDiv.empty();
	calDiv.empty();
	//append dummy day to center over calendar
	headerDiv.append($('<p>').addClass('day-name').html('&nbsp'));
	//create times column
	drawTime(calDiv);
	var currentDate = new Date(startDate);
	var stopDate = incrementedDate(endDate);
	var percentWidth = Math.max(Math.floor(100/(differenceInDays(currentDate, stopDate) + 2)) - 2, 12);
	while (currentDate.getTime() !== stopDate.getTime()){
		var nextDay = $('<div>').addClass('day').addClass(dayNames[currentDate.getDay()].toLowerCase()).
							css('width', percentWidth + '%');
		
		var dayName = $('<p>').text(dayNames[currentDate.getDay()] + '\n' + prettyDateString(currentDate)).appendTo(headerDiv)
			.addClass('day-name').css('width', percentWidth + '%');

		nextDay.appendTo(calDiv);
		currentDate.setDate(currentDate.getDate() + 1);
	}
} // end draw calendar

function drawTime(calDiv){
	var timesColumn = $('<div>').addClass('times');
	timesColumn.append($('<p>').text(prettyString(calHours.minStart)).css({top: '0%'}).addClass('time'));
	timesColumn.append($('<p>').text(prettyString(calHours.maxEnd)).css({bottom: '0%'}).addClass('time'));
	timesColumn.prependTo(calDiv);
	var currentHour = calHours.minStart;
	var hoursOpen = calHours.maxEnd[0] - calHours.minStart[0];
	var interval;
	if(hoursOpen < 8){
		interval = 1;
	} else if (hoursOpen < 15){
		interval = 2;
	} else {interval = 3;}
	//check if opens close to the next hour
	if(currentHour[1] > 30){
		currentHour[0] += 1;
	}
	//set minutes to 0

	currentHour[1] = 0;
	// console.log('calHours');
	// console.log(calHours.maxEnd[0]);
	// console.log(typeof currentHour[0]);
	// console.log(Number(currentHour[0]) < Number(calHours.maxEnd[0]));
	while( Number(calHours.maxEnd[0]) - Number(currentHour[0]) > interval ){
		// console.log('appending hours');
		var height = myTimeMapper(currentHour);
		// console.log('height');
		// console.log(height);
		timesColumn.append($('<p>').text(prettyString(currentHour)).css(height).addClass('time'));
		currentHour[0] += interval;
	}

}

function drawWeek(headerDiv, calDiv){
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	headerDiv.addClass('day-names');
	calDiv.addClass('calendar');
	//append dummy day to center over calendar
	headerDiv.append($('<p>').addClass('day-name').html('&nbsp'));
	//create times column
	drawTime(calDiv);
	for(var i=0; i<7; i++){
		var nextDay = $('<div>').addClass('day').addClass(dayNames[i].toLowerCase());
		
		var dayName = $('<a>').text(dayNames[i]).appendTo(headerDiv)
			.addClass('day-name').attr('href', '#');

		nextDay.appendTo(calDiv);
	}
}

function drawShifts(shiftSchedule){
	
	//TemplateSchedule is object with a field for each day of the week and each field is an array of shifts
	//shift mapper curried function returns function that returns parameters based on start and end time of shift
	//and earliest opening and latest closing times

	
	$.each(shiftSchedule, function(day, value)
	{
		if(day === '_id') return;
		$.each(value, function(index, shift){
			shift.day = day; //allow shift to know what day it is
			var posDim = myMapper(shift.startTime, shift.endTime);
			var nextShift = $('<div>').css(posDim).
				addClass('shift').data('shift', shift).appendTo($('.' + day));

			nextShift.append($('<p>').text(prettyString(shift.startTime)));
			nextShift.append($('<p>').text(prettyString(shift.endTime)));
			nextShift.append($('<ul>'));

			nextShift.on('click', function(event){
				$('.shift').removeClass('selected');
				$(this).addClass('selected');
			});


		});// end day array $.each
	
	});//end $.each for TemplateSchedule object


} //drawshifts



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
	return (theDate.getMonth() + 1) + '-' + theDate.getDate() + '-' + theDate.getFullYear();
}


return {
	drawCalendar: drawCalendar,
	drawShifts: drawShifts,
	drawWeek: drawWeek
};

}; //end getShift calendar function
