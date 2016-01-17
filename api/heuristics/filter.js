var filterCreator = {

	and: function(){
		//passed filters
		//arguments is array like, not actual array -- get length then loop over accessing arguments
		var filters = arguments;
		var length = arguments.length;
		
		return function(employees, shift_id){
			var qualifiedEmployees = employees;
			for(var i=0; i<length; i++){
				qualifiedEmployees = qualifiedEmployees.filter(function(employee){
					return filters[i](employee, shift_id); //each filter evaluate to true false for shift/employee
				}); //warning okay -- about function in for loop
			}
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
		
		return function(employees, shift_id){
			var filtered = {
				fail: [],
				pass: []
			};

			employees.forEach(function(employee){
					
				if(mapValueFunction(employee, shift_id) > thresholdValue){
					filtered.pass.push(employee);
				} else {
					filtered.fail.push(employee);
				}
				
			});
			return filtered;
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

