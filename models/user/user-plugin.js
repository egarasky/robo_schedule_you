var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10; //bcrypt defaults to 10 anyways

var UserPlugin = function (schema, options) {
    schema.methods.comparePassword = comparePassword;
    schema.methods.hashPassword = hashPassword;
    schema.statics.loadUser = loadUser;
    //add fields userName, password, firstName, lastName
    var fields = {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        userName: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        }, //ensures path is created for field, set index if you know you will be querying it
        password: {type: String, required: true},
        createdAt: {type: Date}
    };
    schema.add(fields);
    //hash password presave using mongoose middleware
    schema.pre('save', function (next) {
        var user = this;
        if (!user.isModified('password')) return next(); //skip rest if password isn't new or changed
        hashPassword(user.password).then(function (hashedPassword) {
            user.password = hashedPassword;
            next();
        }).error(function (err) {
            reject(err);
        });
    });
};

//verifying password, need to use bcrypt to compare
function comparePassword(candidate, password, callback) {
    var self = this;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidate, self.password, function (err, match) {
            if (err) return reject(err);
            resolve(match);
        });
    });
}


//generate salt, used for hashing algorithm
function hashPassword(password) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) reject(err);

            //hash password with generated salt
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) reject(err);
                resolve(hash);//password reassigned hashed password instead of text
            });
        });
    });
}

function loadUser(userId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: userId}).exec(function (err, user) {
            if (err) {
                reject(err)
            } else {
                resolve(user)
            }
        });
    });
}

module.exports = UserPlugin;



