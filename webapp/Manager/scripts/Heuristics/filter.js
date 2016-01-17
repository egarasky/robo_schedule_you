var filterCreator = {

	and: function(){
		//passed filters
		//arguments is array like, not actual array -- get length then loop over accessing arguments
		var filters = arguments;
		var length = arguments.length;
		
		return function(employees, shift_id){
			var qualifiedEmployees = employees;
			console.log('from and');
			console.log(qualifiedEmployees);
			for(var i=0; i<length; i++){
				console.log('next iteration qualified employees');
				console.log(qualifiedEmployees);
				qualifiedEmployees = qualifiedEmployees.filter(function(employee){
					console.log(employee);
					return filters[i](employee, shift_id); //each filter evaluate to true false for shift/employee
				}); //warning okay -- about function in for loop
			}
			console.log('done returning');
			console.log(qualifiedEmployees);
			return qualifiedEmployees;
		};
	},

	or: function(){
		var filters = arguments;
		var length = filters.length;
		return function(employees, shift_id){
			var qualifiedEmployees = {};
			var filteredEmployees = [];
			for(var i=0; i<length; i++){
				filteredEmployees = employees.filter(function(employee){
					return filters[i](employees, shift_id);
				});
				
				for(var employee in filteredEmployees){
					qualifiedEmployees[employee._id] = employee;
				}
			}

			for(var emp_id in qualifiedEmployees){
				filteredEmployees.push(qualifiedEmployees[emp_id]);
			}

			return filteredEmployees;
		};
	},

	createThresholdFilter: function(mapValueFunction, threshold){
		var filteringFunction = mapValueFunction;
		var thresholdValue = threshold;

		console.log('map value function');
		console.log(mapValueFunction);
		
		return function(employees, shift_id){
			var filtered = {
				fail: [],
				pass: []
			};
			console.log('threshold filter before forEach');
			console.log(employees);
			console.log(shift_id);
			if(!Array.isArray(employees)){
				if(mapValueFunction(employees, shift_id) >= thresholdValue){
					return filtered.pass.push(employees);
				} else {return filtered;}
			}
			employees.forEach(function(employee){
				console.log('from threshold filter');
				console.log(employee);
				if(mapValueFunction(employee, shift_id) >= thresholdValue){
					filtered.pass.push(employee);
				} else {
					filtered.fail.push(employee);
				}
				
			});
			return filtered.pass;
		};
	},

	// createEmployeePreferenceFilter: function(mapValueFunction, employeePreferences){
	// 	//passed employee preference object is object with emp_id : preferenceVal fields
	// 	var filteringFunction = mapValueFunction;
	// 	var empPref = employeePreferences;
	// 	return function(employees, shift_id){
			
	// 		return employees.filter(function(employees, shift_id){
	// 			return mapValueFunction(employee, shift_id) > empPref[employee_id];
	// 		});
		
	// 	};
	// },

	createBooleanFilter: function(mapValueFunction, boolean){
		var filteringFunction = mapValueFunction;
		var thresholdValue = threshold;
		
		return function(employees, shift_id){
			var filtered = {
				fail: [],
				pass: []
			};

			employees.forEach(function(employee){
					
				if(mapValueFunction(employee, shift_id) === boolean){
					filtered.pass.push(employee);
				} else {
					filtered.fail.push(employee);
				}
				
			});
		return filtered;
		};
	},

	createWeightedSort: function(mapValueFunction, weight){
		var mapper = mapValueFunction;
		var weightvalue = weight;
		return function(shift_id){
			var id = shift_id;
			return function(employeeA, employeeB){
				//A before B return -1 otherwise return 1
				if(mapper(employeeA, shift_id) > mapper(employeeB, shift_id)){
					return -1;
				} else {
					return 1;
				}
			}; 
		};
	}
};

