var Employee = require(projectPath('/models/employee/employee-model'));
var ManagerController = {};
//create new employee
//request body will have passed json data properties
ManagerController.create = function(req, res) {
    var newEmployee = new Employee({
        firstName: req.body.newEmployee.firstName,
        lastName: req.body.newEmployee.lastName,
        userName: req.body.newEmployee.userName,
        password: req.body.newEmployee.password,
        role: req.body.newEmployee.role,
        business: req.session._id

    });
    newEmployee.save(function(err, nemEmployee){
        if (err)
        {
            console.log('error: ' + err);
        } else {
            //if successful
            //attaches manager cookie and redirects to manager page
            console.log('newUser username: ' + newEmployee.userName);
            res.send(200);
        }

    });
};

ManagerController.getEmployeesForEdit = function(req, res){
    console.log('get employee');
    if(!req.session._id) throw new Error('invalid session id');
    console.log('session id: ' + req.session._id);
    Employee.find({business: req.session._id}).
        lean().exec(function(err, employees){
            if(err) throw err;
            console.log('number of employees:' + employees.length);
            res.json(employees);
        });
};

//update employee
ManagerController.businessUpdate = function(req, res) {
    var emp_id = req.body.employee._id;
    Employee.update({_id: emp_id}, {$set: req.body.employee}, function(err, numAffected){
        if(err || numAffected){
            throw new Error('error updating employee');
        } else {
            res.sendStatus(200);
        }
    });
};

ManagerController.deleteEmployee = function(req, res) {
    var emp_id = req.body.employee._id;
    Employee.remove({_id: emp_id}, function(err, removedUser){
        if(err){
            throw err;
            res.sendStatus(500);
        } else {
            console.log('removed manager: ');
            console.log(removedUser);
            res.sendStatus(200);
        }
    });
};


ManagerController.updateEmployeePreferences = function(req, res) {
    var emp_id = req.body.emp_id;
    var dataToSet = {
        priority: req.body.priority,
        fullTime: req.body.fullTime,
        capHours: req.body.capHours,
        shouldCapHours: req.body.shouldCapHours
    };

    Employee.findOne({_id: emp_id}, function(err, employee){
        if(err) throw err;
        employee.managerPreferences = dataToSet;
        employee.save(function(err, updatedUser){
            res.send(200);
        });
    });
};

ManagerController.updateHoursPreferences = function(req, res){
    var emp_id = req.session._id;
    console.log(emp_id);
    Employee.findOne({_id: emp_id}, function(err, employee){
        if(err) throw err;
        console.log(employee);
        employee.preferred = req.body.preferred;
        employee.maxHours = req.body.maxHours;
        employee.save(function(err, updateUser){
            if(err) throw err;
            res.send(200);
        });
    });
};

ManagerController.getHoursPreferences = function(req, res){
    var emp_id = req.session._id;
    console.log(emp_id);
    Employee.findOne({_id: emp_id}, function(err, employee){
        if(err) throw err;
        var data = {
            preferred: employee.preferred,
            maxHours: employee.maxHours
        };
        res.send(data);
    });
};

module.exports = ManagerController;