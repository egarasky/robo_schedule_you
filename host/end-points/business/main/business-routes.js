var BusinessController = require('./business-controller.js');

var BusinessRoutes = {};
BusinessRoutes.setRoutes = function(app){
    app.get("/business/roles", BusinessController.roles);
    app.put("/business/roles", BusinessController.addRole);
    app.put("/business/roles/change", BusinessController.editRole);
    app.delete("/business/roles", BusinessController.deleteRole);

    app.get("/business/hours", BusinessController.getHours);
    app.post("/business/hours", BusinessController.setHours);
};

module.exports = BusinessRoutes;