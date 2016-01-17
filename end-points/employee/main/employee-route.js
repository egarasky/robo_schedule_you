var EmployeeController = require('./employee-controller.js');

var EmployeeRoutes = {};
EmployeeRoutes = function (app) {
    app.get('/employee/availability', employeeController.getAvailability);
    app.get('/employee/hours', employeeController.getHours);
    app.put('/employee/availability/add', employeeController.addAvailability);
    app.delete('/employee/availability', employeeController.removeAvailability);

    app.get('/employee/preferred/hours', employeeController.getHoursPreferences);
    app.put('/employee/preferred/hours', employeeController.updateHoursPreferences);
}

module.exports = EmployeeRoutes;