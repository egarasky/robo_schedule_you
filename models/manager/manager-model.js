var mongoose = require('mongoose');
var Employee = require('./../employee/employee-model.js');
var TemplateSchedule = require('./../template-schedule/template-schedule-plugin');
var Role = require('./plugins/role-plugin');
var bcrypt = require('bcrypt');
var UserPlugin = require(projectPath('/models/user/user-plugin'));
//var deepPopulate = require('mongoose-deep-populate');


//password hashing from this nice tutorial
//http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

function deleteId(myObject) {
    delete myObject._id;
    for (var prop in myObject) {
        if (typeof myObject[prop] === 'object' && myObject.hasOwnProperty(prop)) deleteId(myObject[prop]);
    }
    return myObject;
}

var managerSchema = mongoose.Schema({
    organizationName: {type: String, required: true},
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
});


managerSchema.plugin(UserPlugin);

var User = mongoose.model('manager', managerSchema, 'manager');
module.exports = User;

