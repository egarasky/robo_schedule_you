var User = require(projectPath('/models/manager/manager-model.js'));
var Employee = require(projectPath('/models/employee/employee-model.js'));

var UserController = {};

UserController.create = function(req, res){
	var newUser = new User({
			firstName: req.body.newUser.firstName, //dayName from for each function
			lastName: req.body.newUser.lastName,
			userName: req.body.newUser.userName,
			password: req.body.newUser.password,
            createdAt: new Date()
		});
	newUser.save(function(err, newUser){
		if (err) {
            console.log('error: ' + err);
        } else {
            req.session = req.session ? req.session: {};
            if (req.session) {
                //if successful
                //attaches manager cookie and redirects to manager page
                console.log('newUser userName: ' + newUser.userName);
                req.session._id = newUser._id;
                req.session.account = 'manager';
            }
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
		if(!user){//if manager not found check employee database
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
								//create session with this manager _id tacked onto session
								//whole manager? name... password?
								console.log('successful employeelogin:' + emp._id);
								req.session.account = 'emp';
								req.session._id = emp._id;
								res.status(200).send('employee/employee.html'); //redirect to get manager
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
					//create session with this manager _id tacked onto session
					//whole manager? name... password?
					console.log('successful login:' + user._id);
					console.log(typeof req == 'undefined');
					req.session.account = 'manager';
					req.session._id = user._id;
					res.status(200).send('manager/manager.html'); //redirect to get manager
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