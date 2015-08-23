var main = function(){
	
	//function takes array of [hour, minute] and converts it into 24 hour format string
	var prettyShiftTime = function(shiftArray){
		function formatTime(num){
			return String('0' + num).slice(-2);
		}
		var time = formatTime(shiftArray[0]) + ':' + formatTime(shiftArray[1]);
		console.log(time);
		return time;

	};

	var createShiftInterval = function(startTime, endTime){
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
		return timeInterval;
	};

	var initHours = function() {
		$.get('/business/hours', function(hours){
		//passed from server as object with fields of daynames
			console.log(hours);
			$.each(hours, function(key, value){
				console.log('key: ');
				console.log(key);
				console.log('value: ');
				console.log(value);
				if(key==='_id') return true; //same as continue
				//use key of day name as selector -- value is a shift object with a startTime, endTime properties
				if(value.startTime && value.endTime){
					var startSelector = '.' + key + ' .start-time';
					var endSelector = '.' + key + ' .end-time';
					var startTimeString = prettyShiftTime(value.startTime);
					var endTimeString = prettyShiftTime(value.endTime);
					$(startSelector).val(startTimeString);
					$(endSelector).val(endTimeString);
				}
				});
			});
		};

	initHours();

	$('#submit-hours').on('click', function(event){
		//create new hours object to send to server
		//has sunday -saturday property names and startTime, endTime for day
		var hours = getHours();
		console.log(hours);
		if(hours){
			$.ajax({
				url: '/business/hours',
				type: 'POST',
				data: {hours: hours}
			}).done(alert.bind(null, 'hours successfully submitted')).
			fail(alert.bind(null, 'hours submission failed'));
		} else {
			alert('times incomplete');
		}
	});

	$('#cancel-hours').on('click', initHours);

	var getHours = function (){
		var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		var hours = {};
		//take advantage of a day name being property name for hours object to store and class name to select correct times
		var filledOut = true;
		dayNames.forEach(function(day){
			var startSelector = '.' + day + ' .start-time';
			var endSelector = '.' + day + ' .end-time';
			var startTime = $(startSelector).val();
			var endTime = $(endSelector).val();
			//empty string will evaluate to false and function will then return if
			//inputs aren't filled out
			if(startTime && endTime){
				console.log('added day to hours now: ');
				hours[day] = createShiftInterval(startTime, endTime);

				console.log(hours);
			} else {
				console.log('returning false');
				filledOut = false; //invalid submission -- hours incomplete
			}	
		});
		if (filledOut){
			return hours;
		} else {
			return false;
		}
	};//end get hours function
};

$(document).ready(main);