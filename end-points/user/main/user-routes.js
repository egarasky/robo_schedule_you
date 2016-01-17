var UserController = require('./user-controller.js');

var UserRoutes = {};
UserRoutes.setRoutes = function(app){
    app.post("/manager", UserController.create);
    app.put("/manager/logout", UserController.logout);
};

module.exports = UserRoutes;