var availability = {};

//times are in arrays of [hr, mn]
//pass an employee day of availability intervals, and shifts of that day
availability.getTotalOverlap = function(shiftArray, availArr){
	console.log('get overlap for day');
	var availIndex = 0;
	var overlapArr = []; //will be returned full of objects {shift_id, overlap}--up to caller to map to certain employee id
	//iterate through shifts matching up against availability
for(var i=0; i<shiftArray.length; i++){
		console.log('next shift');
		var startBoundaryFound = false;
		var endBoundaryFound = false;
		var shiftStart = shiftArray[i].startTime;
		var shiftEnd = shiftArray[i].endTime;

		var availStart;
		var availEnd;
		var endBoundary;
		var startBoundary;
		while(!startBoundaryFound && availIndex < availArr.length ){
			 
			availStart = availArr[availIndex].startTime;
			availEnd = availArr[availIndex].endTime;
			startBoundaryFound = !this.greaterOrEq(shiftStart, availStart);
			startBoundaryFound = !this.greaterOrEq(shiftStart, availEnd);
			startBoundary = availIndex;
			if(!startBoundaryFound) availIndex++;
		}

			while(!endBoundaryFound && availIndex < availArr.length){

				availStart = availArr[availIndex].startTime;
				availEnd = availArr[availIndex].endTime;
				endBoundaryFound = !this.greaterOrEq(shiftEnd, availStart);
				endBoundaryFound = !this.greaterOrEq(shiftEnd, availEnd);
				endBoundary = availIndex;
				if(!endBoundaryFound) availIndex++;
			}
		if(startBoundary === availArr.length) {
			console.log('startBoundary past availability shifts');
			return overlapArr; //rest of shifts past last avail interval
		}
		if(endBoundary === availArr.length){
			endBoundary -= 1;
			console.log('set back endBoundary past end');
		}
		console.log('find overlap with shiftstart, shiftend, startboundary, endboundary, availArr');
		console.log(shiftStart);
		console.log(shiftEnd);
		console.log(startBoundary);
		console.log(endBoundary);
		console.log(availArr);
		var overlap = this.getShiftOverlap(shiftStart, shiftEnd, startBoundary, endBoundary, availArr);
	if(overlap){
			console.log('has overlap');
			console.log(overlap);
			overlapArr.push({
				shift_id: shiftArray[i]._id,
				overlap: overlap
			});
		}
	} // end shift iteration
return overlapArr;
};

//startBoundary, endBoundary
availability.getShiftOverlap = function(shiftStart, shiftEnd, startBoundary, endBoundary, availArr){
	var totalOverlap = 0;
	while(startBoundary <= endBoundary){
		totalOverlap += this.overlap(shiftStart, shiftEnd, 
									availArr[startBoundary].startTime, availArr[startBoundary].endTime);
		startBoundary++;
	}
	return totalOverlap;
};

availability.overlap = function overlap(startShift, endShift, startAvail, endAvail){
	if(this.greaterOrEq(startAvail, startShift) && this.greaterOrEq(endAvail, endShift) && 
		this.greaterOrEq(endShift, startAvail)){
		//end part of shift inbetween avail start and end
		return this.subtract(endShift, startAvail);
	}

	if(this.greaterOrEq(startShift, startAvail) && this.greaterOrEq(endAvail, endShift)){
		//shift contained in avail
		return this.totalTime(startShift, endShift);
	}

	if(this.greaterOrEq(startAvail, startShift) && this.greaterOrEq(endShift, endAvail)){
		//avail contained in shift
		var notInAvail = this.subtract(startAvail, startShift) + this.subtract(endShift, endAvail);
		return this.totalTime(startShift, endShift) - notInAvail;
	}

	if(this.greaterOrEq(startShift, startAvail) && this.greaterOrEq(endShift, endAvail)){
		//end part of avail inbetween shift start and end
		return this.subtract(endAvail, startShift);
	}

	return 0;
};

availability.totalTime = function(startShift, endShift){
	return this.convertToMinutes(endShift) - this.convertToMinutes(startShift);
};

//assume time arrays [hr, min] will return total in minutes
availability.subtract = function subtract(largerTime, smallerTime){
	if(!this.greaterOrEq(largerTime, smallerTime)) throw new Error('invalid times');
	return this.convertToMinutes(largerTime) - this.convertToMinutes(smallerTime);
};

availability.convertToMinutes = function convertToMinutes(timeArray){
	return (Number(timeArray[0]) * 60) + Number(timeArray[1]);
};

availability.orderStartTimeAsc = function(a, b){ //time array [hr, mn], sort ascending
			if(availability.greaterOrEq(a.startTime, b.startTime)) return 1; //second arg before first
			return -1; //else a before b
};	

//return false if time1 is less than time2
availability.greaterOrEq = function greaterOrEq(time1, time2){
	if(time1[0] < time2[0]) return false;
	if(time1[0] > time2[0]) return true;
	if(time1[0] === time2[0] && time1[1] >= time2[1]) return true;
	return false; //hours equal, time2 minutes greater
};

module.exports = availability;