var ShiftController = require('./shift-controller.js');
var ShiftRoutes = {};
ShiftRoutes.setRoutes = function(app){
    app.get("/shifts", ShiftController.shifts);
    app.put('/shifts/add', ShiftController.addShift);
//app.put('/shifts/change', ShiftController.changeShift);
    app.delete('/shifts', ShiftController.deleteShift);
};

module.exports = ShiftRoutes;