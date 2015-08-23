var User = require('../Models/user.js');
var Employee = require('../Models/employee.js');
var mongoose = require('mongoose');

var UserController = {};

console.log('create user called');
UserController.create = function(req, res){
	console.log(req.body.newUser.firstName);
	console.log(req.body.newUser.lastName);
	console.log(req.body.newUser.userName);
	console.log(req.body.newUser.password);
	var newUser = new User({
			firstName: req.body.newUser.firstName, //dayName from for each function
			lastName: req.body.newUser.lastName,
			userName: req.body.newUser.userName,
			password: req.body.newUser.password
		});
	newUser.save(function(err, newUser){
		if (err) 
			{
				console.log('error: ' + err);
			} else {
				//if successful
				//attaches user cookie and redirects to user page
				console.log('newUser userName: ' + newUser.userName);
				req.session._id = newUser._id;
				req.session.account = 'user';
				res.status(200).send();
			}

	});
};

UserController.login = function(req, res){
	console.log('login called');
	console.log('userName', req.body.userName);
	console.log('password', req.body.password);

	User.findOne({userName: req.body.userName}, function(err, user){
		if(err) throw err;
		if(!user){//if user not found check employee database
			Employee.findOne({userName: req.body.userName}, function(err, emp){
					if(err) throw err;
					if(!emp){
						console.log('userName not found');
						res.sendStatus(404);
					} else {
						emp.comparePassword(req.body.password, function(err, matches){
							if(err) throw err;
							console.log(matches);
							if(matches){
								//create session with this user _id tacked onto session
								//whole user? name... password?
								console.log('successful employeelogin:' + emp._id);
								req.session.account = 'emp';
								req.session._id = emp._id;
								res.status(200).send('employee/employee.html'); //redirect to get user
							} else {
								console.log('invalid password');
								res.sendStatus(401); //invalid password code
							}

						});
					}
				});

		} else {
			user.comparePassword(req.body.password, function(err, matches){
				if(err) throw err;
				console.log(matches);
				if(matches){
					//create session with this user _id tacked onto session
					//whole user? name... password?
					console.log('successful login:' + user._id);
					console.log(typeof req == 'undefined');
					req.session.account = 'user';
					req.session._id = user._id;
					res.status(200).send('manager/manager.html'); //redirect to get user
				} else {
					console.log('invalid password');
					res.sendStatus(401); //invalid password code
				}

			});
		}
	}); //end User.findOne
};

UserController.logout = function(req, res){
	req.session.destroy(function (err){
	console.log('logout called');
		if(err) {
			console.log('logout err');
			res.send('500');
		} else {
			res.status('200').send('index.html');
		}
	});
};

module.exports = UserController;