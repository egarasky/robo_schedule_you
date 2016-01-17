var User = require(projectPath('/domain/user/user'));
module.exports = function(managerData, fields){
    //expect fields to be string of fieldnames separated by spaces
    return Object.create(Manager, initializeProperties({}, managerData, fields));
};

function initializeProperties(initalizationObj, managerData, fields){
    fields.split(' ').forEach(function(fieldName){
        initalizationObj[fieldName] = managerData[fieldName];
    });
    return initalizationObj;
}
function Manager(){

}

Manager.prototype = Object.create(User.prototype);

