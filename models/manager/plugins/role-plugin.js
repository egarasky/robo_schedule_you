var mongoose = require('mongoose');
var Promise = require('bluebird');
var noDuplicates = require(projectPath('/models/utility-hooks/check-for-duplicates'));

var RoleSchema = new mongoose.Schema({
    roleName: {type: String, required: true},
});//TODO more custom validation see schema docs and think of requirements
RoleSchema.methods.toJSON = function () {
    return {
        roleName: this.roleName,
        _id: this._id.toString()
    };
};

/**
 * Iterate roles keeping track of what roleNames have been seen and throws an error if a role is seen twice
 * @param next
 * @throws Error with object keys of role names that have duplicates with values being an array of the duplicate role names
 */
//function noDuplicateRoles(next) {
//    var seenRoles = {};
//    var duplicateRoles = {};
//    this.roles.forEach(function (role) {
//        if (seenRoles[role.roleName]) {
//            if (duplicateRoles[role.roleName]) {//if already defined then there are multiple duplicates
//                duplicateRoles[role.roleName].push(role);
//            } else {
//                duplicateRoles[role.roleName] = [role.roleName, seenRoles[role.roleName]];
//            }
//        } else {
//            seenRoles[role.roleName] = role;
//        }
//    });
//    if (Object.keys(duplicateRoles).length > 0) {
//        var error = new Error('Duplicate role names');
//        error.roles = [];
//        Object.keys(duplicateRoles).forEach(function (roleName) {
//            error.roles.push(roleName);
//        });
//        next(error);
//    } else {
//        next();
//    }
//}

function RolesPlugin(schema, options) {
    schema.add({roles: [RoleSchema]});
    schema.pre('save', noDuplicates('roles', 'roleName'));
    schema.statics.addRole = addRole;
    schema.statics.deleteRole = deleteRole;
    schema.statics.updateRole = updateRole;
    schema.statics.getRoles = getRoles;
}

function addRole(managerId, roleName) {
    var self = this;
    //validate roleName and howManyNeeded somehow
    return new Promise(function (resolve, reject) {
        self.findOne({_id: managerId}).exec(function (err, manager) {
            if (err) {
                reject(err);
            } else if (!manager) {
                reject({message: 'No user is found from provider userId'});//TODO pattern for rejecting promises
            } else if (!manager.roles) {
                reject({message: 'No roles container found for user'});
            } else { //TODO(EG) implement to make sure roleName isn't already defined?
                //var violates = violatesRoleIntegrity(manager.roles, roleName, howManyNeeded);
                //if (violates) {
                //    reject(violates);
                //}
            }

            var roleId = new mongoose.Types.ObjectId();
            manager.roles.push({
                roleName: roleName,
                _id: roleId
            });
            manager.markModified('roles');
            manager.save(function (err, manager) {
                if (err) {
                    reject(err);
                } else {
                    resolve(roleId);
                }
            });
        });
    })
}


function deleteRole(managerId, roleId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: managerId}, 'roles', function (err, manager) {
            if (err) {
                reject(err);
            } else {
                manager.roles.id(roleId).remove();
                manager.markModified('roles');
                manager.save(function (err, manager) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

/**
 * Sets the role in the manager.roles array with the matching ObjectId to the updatedRoleObj
 * @param managerId String of a mongoose.types.ObjectId
 * @param updatedRoleObj Object with roleName:String, howManyNeed: Number, _id: Mongoose.types.ObjectId properties
 * @returns {bluebird|exports|module.exports}
 */
function updateRole(managerId, updatedRoleObj) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: managerId}, 'roles', function (err, manager) {
            err = err ? err : !manager ? 'No manager found' : null;
            if (err) {
                reject(err);
            } else {
                manager.roles.id(updatedRoleObj._id).remove();
                manager.roles.push(updatedRoleObj);
                manager.markModified('roles');
                manager.save(function (err, manager) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(manager);
                    }
                })
            }
        })
    });
}

function getRoles(managerId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: managerId}, 'roles', function (err, manager) {
            if (err) {
                reject(err)
            } else {
                resolve(manager.roles.map(function (role) {
                    return role.toJSON();
                }));
            }
        });
    })
}
RolesPlugin.prototype.Schema = RoleSchema;
module.exports = RolesPlugin;
//TODO add validation/middleware like with user and password before save
