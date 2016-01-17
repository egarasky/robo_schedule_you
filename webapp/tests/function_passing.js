var objectWithMethods = {

	m: function(){
		console.log('hi this is the m method');
	}


};


var constructorFunction = function(method){

	this.passedMethod = method;
	this.callPassedMethod = function(){
		this.passedMethod();
	};
};

var myObject = new constructorFunction(objectWithMethods.m);

myObject.callPassedMethod();

var functionThatReturnsFunctionCaller = function(func){
	this.myFunction = func;
	this.callFunc = function(){
		this.myFunction();
	};
};

var f = new functionThatReturnsFunctionCaller(objectWithMethods.m);

f.callFunc();

var functionmaker = function(method){
	return function(){
		method();
	};
};

var anotherNestedFunction =  functionmaker(f.callFunc);

anotherNestedFunction();
