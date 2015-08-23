var availability = require('./availability_for_test.js');

//testing convert to minutes
//takes time array [hr, mn] returns minutes from midnight [0, 0]

function message(should, result){
	console.log('Should be: ' + should + ' result: ' + result);
}


console.log('Should be 0: ' + availability.convertToMinutes([0, 0]));
console.log('Should be 90: ' + availability.convertToMinutes([1, 30]));

var hour = 12, min= 35, total= hour * 60 + min;
console.log('Should be ' + total + ': ' + availability.convertToMinutes([hour, min]));

hour=17; min=56; total= hour * 60 + min;
console.log('Should be ' + total + ': ' + availability.convertToMinutes([hour, min]));

//test subtract
console.log('\nTESTING SUBTRACT');
message(0, availability.subtract([8, 59], [8, 59]));
message(60, availability.subtract([9, 42], [9, 42]));
message(52, availability.subtract([22, 54], [22, 2]));

console.log('\nTESTING GREATEROREQ');
message(true, availability.greaterOrEq([9, 0], [9, 0]));
message(false, availability.greaterOrEq([14, 35], [14, 40]));
message(false, availability.greaterOrEq([12, 22], [13, 10]));
message(true, availability.greaterOrEq([16, 33], [12, 11]));

console.log('\nTESTING OVERLAP');
var startShift = [0, 0], endShift = [8, 0], startAvail = [4, 0], endAvail = [12, 0];
message(240, availability.overlap(startShift, endShift, startAvail, endAvail)); //end of shift between avail

startShift = [6, 0];
message(120, availability.overlap(startShift, endShift, startAvail, endAvail)); //shift in avail

startAvail = [10, 30];
message(0, availability.overlap(startShift, endShift, startAvail, endAvail)); //no overlap

//avail in shift
startShift = [12, 30]; endShift = [22, 42]; startAvail = [15, 15]; endAvail = [20, 15];
message(300, availability.overlap(startShift, endShift, startAvail, endAvail));

//end of avail in shift
startAvail = [10, 30];
message(465, availability.overlap(startShift, endShift, startAvail, endAvail));

console.log('\nTESTING TOTALOVERLAP');
//assume availability ordered and no overlap
var avail1 = {startTime: [4, 0], endTime: [8, 0]};
var avail2 = {startTime: [9, 0], endTime: [12, 0]};
var avail3 = {startTime: [13, 30], endTime: [16, 30]};
availabilityIntervals = [avail1, avail2, avail3];
//parameter order(startShift, endShift, startBoundary, endBoundary, availArray);
var startShift = [2, 30], endShift = [8, 30];
message(240, availability.getShiftOverlap(startShift, endShift, 0, 1, availabilityIntervals));

message(0, availability.getShiftOverlap(startShift, endShift, 1, 2, availabilityIntervals));

endShift = [13, 0];
message(420, availability.getShiftOverlap(startShift, endShift, 0, 1, availabilityIntervals));
message(180, availability.getShiftOverlap(startShift, endShift, 1, 1, availabilityIntervals));

console.log('\nTESTING SHIFTOVERLAP');
var shift1 = {startTime: [2, 30], endTime: [7, 0]};
var shift2 = {startTime: [7, 0], endTime: [12, 30]};
var shift3 = {startTime: [14, 30], endTime: [20, 30]};

var shifts = [shift1, shift2, shift3];
availability.getTotalOverlap(shifts, availabilityIntervals);
message(180, shifts[0].overlap); //end of shift1 in 1st avail
message(240, shifts[1].overlap); //last hour of 1st avail and entirety of second avail in shift 2
message(120, shifts[2].overlap); //end of 3rd avail in 3rd shift

availabilityIntervals = [{startTime: [0, 0], endTime: [23, 59]}];
availability.getTotalOverlap(shifts, availabilityIntervals);
message(270, shifts[0].overlap);
message(330, shifts[1].overlap);
message(360, shifts[2].overlap);
