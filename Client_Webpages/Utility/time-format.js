var timeFormatter =  function timeFormatter(){
	function convertTime(timeString){
		var timeArr = timeString.split(":");
		for(var i=0; i<2; i++){
			timeArr[i] = parseInt(timeArr[i], 10); //second arg radix
		}
		return timeArr;
	}

	function toTimeString(timeArray){
		var formatted = format(timeArray[1]);
		if(timeArray[0] > 12){
			return (timeArray[0] - 12).toString() + ':' + formatted + 'pm';
		} else if (timeArray[0] < 12){
			return timeArray[0].toString() + ':' + formatted + 'am';
		} else {
			return timeArray[0].toString() + ':' + formatted + 'pm';
		}
	}
	
	function format(num){
		return String('0' + num).slice(-2);
	}

	return {
		toTimeArray: convertTime,
		toTimeString: toTimeString
	};
};