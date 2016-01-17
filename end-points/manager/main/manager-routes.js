var ManagerController = require('./manager-controller.js');

var ManagerRoutes = {};
ManagerRoutes.setRoutes = function (app) {
    app.get('/manager/employees/edit', ManagerController.getEmployeesForEdit);
    app.put('/manager/employee/preferences', ManagerController.updateEmployeePreferences);
    app.delete('/manager/employees', ManagerController.deleteEmployee);
    app.post('/manager/employees', ManagerController.create);
};

module.exports = ManagerRoutes;
