/**
 * Created by eric on 9/25/15.
 */
var AdminController = require('./admin-controller');

var AdminRoutes = {};

AdminRoutes.setRoutes = function(app){
    app.get('/admin/lastUser', AdminController.getLastUser);
};

module.exports = AdminRoutes;