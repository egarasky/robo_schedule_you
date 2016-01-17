var ScheduleController = require('./schedule-controller.js');

var ScheduleRoutes = {};
ScheduleRoutes.setRoutes = function (app) {
    app.get("/schedules", ScheduleController.retrieve);
    app.post("/schedules", ScheduleController.create);
    app.delete('/manager/schedules', ScheduleController.deleteSchedule);
    app.put("/manager/shift/employees", ScheduleController.updateShiftOfSchedule);

};
module.exports = ScheduleRoutes;