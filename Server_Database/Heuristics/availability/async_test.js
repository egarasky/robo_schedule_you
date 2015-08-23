var test = {};

test.hi = function(){
	console.log('hi');
};

test.hello = function(){
	this.hi();
	console.log('hello');
};

test.hello();
