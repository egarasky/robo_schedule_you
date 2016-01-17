var User = require(projectPath("/models/manager/manager-model.js"));
var Promise = require('bluebird');
var Manager = require('./manager');

var managerRepo = {};

//can specify optional field to populate in findOne query
//call back function populates manager instance with specified fields or all fields if none specified
//manager instance is initialized with call back to save mongoose instance with the fields specified changed
managerRepo.loadManager = function loadManager(managerId, fields) {
    if (!managerId) {
        return; //throw error?
    }
    var query = User.findOne({_id: managerId});

    if (Array.isArray(fields)) {
        fields = fields.join(" ");
    } else if (!fields && arguments.length > 2) {//strings specified as arguments
        fields += arguments.slice(1, arguments.length);
    }
    if (fields) {
        query.select(fields);
    }

    User.then(function (user) {
        return Manager(user, fields);
    });//TODO EG errors, mark modified call back before saving
};
