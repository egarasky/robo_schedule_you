var AvailabilityMapController = require('./availability-map-controller.js');

var AvailablityMapRoutes = {};

AvailablityMapRoutes.mapRoutes = function(app){
    //edit-schedule retrieving map objects
    app.get('/manager/employees/map', AvailabilityMapController.employeeMap);
    app.get('/manager/availability/overlap', AvailabilityMapController.availabilityMap);
};

module.exports = AvailablityMapRoutes;