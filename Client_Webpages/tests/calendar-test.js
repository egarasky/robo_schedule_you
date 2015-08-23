var main = function(){
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var startTime = [9, 0];
	var endTime = [18, 0];

	//append dummy day to center over calendar
	$('.day-names').append($('<p>').addClass('day-name').html('&nbsp'));
	//create times column
	var timesColumn = $('<div>').addClass('times');
	timesColumn.append($('<p>').text('times'));
	timesColumn.appendTo($('.calendar'));
	for(var i=0; i<7; i++){
		var nextDay = $('<div>').addClass('day').addClass(dayNames[i].toLowerCase());
		
		var dayName = $('<p>').text(dayNames[i]).appendTo($('.day-names'))
			.addClass('day-name');

		nextDay.appendTo($('.calendar'));
	}

	//test shift for shift mapper curried function
	var myMapper = shiftMapper(startTime, endTime);
	var testShift = [[10, 30], [11, 30]];
	var posDim = myMapper(testShift[0], testShift[1]);
	$('<div>').css(posDim).appendTo($('.Monday')).css('background-color', 'red')
		.addClass('shift');
};

var convertToMinutes = function(timeArray){
	return timeArray[0] * 60 + timeArray[1];
};

prettyString = function(timeArray){
	if(timeArray[0] > 12){
		return (timeArray[0] - 12).toString() + ':' + timeArray[2] + 'pm';
	} else if (timeArray[0] < 12){
		return timeArray[0].toString() + ':' + timeArray[2] + 'am';
	} else {
		return timeArray[0].toString() + ':' + timeArray[2] + 'pm';
	}
};
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
		var coor = { height: heightPercentage + '%', top: topPositionPercentage + '%' };
		console.log(coor);
		return coor;
	};


}

$(document).ready(main);