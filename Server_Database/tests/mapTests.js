var myArr = [];
var i;
for(i=0;i<9;i++){
	myArr.push({ myProp: i});
}

console.log(myArr);

var blark = myArr.map(function(currentValue){
	return currentValue.myProp + 1;
	
});

console.log(blark);

//to apply to pairing mongoose ids with objects

myArr.map(function(currentValue, index){
	console.log('value: ' + currentValue);
	console.log('index' + index);
});

module.exports = myArr;

//will get executed when imported