var User = require(projectPath('/models/manager/manager-model.js'));
var Employee = require(projectPath('/models/employee/employee-model.js'));

var AdminController = {};

AdminController.getLastUser = function(req, res) {
    User.findOne({}, {}, {sorted: {'createdAt': -1}}, function(err, lastUser){
        if(err) throw err;
        return res.send(lastUser);
    });

};

module.exports = AdminController;