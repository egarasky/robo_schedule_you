describe.skip('integrated manager test', function () {

    /**
     * Delete previous user and added employees and create a fresh user for next employee test
     */
    //beforeEach(function(){
    //        var usersRemoved = Promise.promisify(User.remove.bind(null, {}));
    //        var employeesRemoved = Promise.promisify(Employee.remove.bind(null, {}));
    //        Promise.all([usersRemoved, employeesRemoved]).then(function(){
    //            return CreateManager();
    //        });
    //    }
    //);

    var EMPLOYEE_1 = new Employee({
        firstName: "Spongebob",
        lastName: "Squarepants",
        userName: "crustyCrabCook",
        password: "I love starfish",
        role: "cook"

    });

    /**
     * app.get('/manager/employees/edit', employeeController.getEmployeesForEdit);
     * app.put('/manager/employee/preferences', employeeController.updateEmployeePreferences);
     * app.delete('/manager/employees', employeeController.deleteEmployee);
     */


     // app.post('/manager/employees', employeeController.create);
    describe('post employee to /manager/employees', function(){
        it('should create an employee', function(done){
            done();
        });
    });

    var postEmployeePromise = function(employee){
        return new Promise(function(resolve, reject){
        });
    }
});