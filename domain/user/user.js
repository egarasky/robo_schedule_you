var userRepo = require('./user-repo');
module.exports = function(userData, fields){
  return Object.create(User, initializeProperties({}, userData, fields));
};

//fields passed in as single concatenated string separated by spaces
function initializeProperties(initialProperties, userData, fields){
    fields.split(' ').forEach(function(fieldName){
       initialProperties[fieldName] = userData[fieldName];
    });
}

function User(){
    this.createNewUser = createNewUser;
}

function createNewUser(userData){

}
