var myArray = [1, 2, 3, 4, 5];
myArray.forEach(function(val, myIndex, myArray){
	myArray[myIndex] = val * 2;

});

console.log(myArray);