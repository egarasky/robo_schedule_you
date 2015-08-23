var myObject = {
	number: 0,
	incrementer: function(incrementValue){
		var val = incrementValue;
		var that = this;
		return function(){
			console.log('before increment: ' + that.number);
			that.number += val;
			console.log('after: ' + that.number);
		};
	},
	subtractor: function(subtractValue){
		var that = this;
		return function(){
			console.log('before subtraction: ' + that.number);
			that.number -= subtractValue;
			console.log('after: ' + that.number);
		};
	}
};

var j = myObject.incrementer(3);
var i = myObject.incrementer(2);
var x = myObject.subtractor(1);
console.log('from i' );
i();

console.log('from j' );
j();

console.log('from x');
x();

//test mutation of object from function
var getPrinter = function(x){
	
	return {
		myVar: x,
		myprinter : function(){
			console.log(this.myVar + ' from printer');
		}
	};
};

var p = getPrinter(myObject.number);
p.myprinter();
x();
p.myprinter();

var y = {};
y.message = 'bye';
y.bye = function(){
	console.log(y.message);
};

y.bye();

var f1 = function(numberArray){
	return numberArray.filter(function(num){
		return num > 6;
	});
};

var f2 = function(numberArray){
	return numberArray.filter(function(num){
		return num < 10;
	});
};

var a = [f1, f2].reduce(function(prevValue, currentValue, index, array){
	return currentValue(prevValue);
}, [1, 4, 9, 11, 14, 7]);

console.log(a);



