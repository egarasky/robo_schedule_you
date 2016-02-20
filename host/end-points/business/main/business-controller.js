var Employee = require(projectPath('/models/employee/employee-model.js'));
var User = require(projectPath('/models/manager/manager-model.js'));

//nifty little function found from searching about problems with querying by ObjectId
//http://stackoverflow.com/questions/7878557/cant-find-documents-searching-by-objectid-using-mongoose
String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

BusinessController = {};

BusinessController.roles = function(req, res){
	if(!req.session._id) throw err; //shouldn't have gotten through route filter if not part of session
	console.log(req.session._id);
	//use session cookie to get userId and look up manager roles
	var userId = req.session._id;
	User.findOne({_id:userId.toObjectId()}, function(err, user){
		if(err) throw err;
		if(!user) throw err;//manager with _id from cookie does not exist
		res.json(user.roles);

	});
};
BusinessController.routeAddRole = function(req, res){
	console.log('new role: ' + req.body.role);
	if(!req.session._id) throw err;
	var userId = req.session._id;
	User.findOne({_id: userId.toObjectId()}, function(err, user){
		//find and set since pushing to array instead of just resetting a value with update
		if (err) throw err;
		if (!user) throw err;
		user.roles.push(req.body.role);
		user.save();//could return all the roles instead of $.get call client side
		res.sendStatus(200);
	});

};

BusinessController.routeDeleteRole = function(req, res){
	var roleToDelete = req.body.role;
	console.log('deleting role: ' + roleToDelete); 
	if(!req.session._id) throw err;
	var userId = req.session._id;
	User.findOne({_id: userId.toObjectId()}, function(err, user){
		if(err) throw err;
		if(!user) throw err;
		var indexOfRole = user.roles.indexOf(roleToDelete);
		//args: 1st where to start deleting, second how many to delete 
		user.roles.splice(indexOfRole, 1);
		user.save(function(err, item, numModified){
			if(err){
				res.sendStatus(200);
				throw err;
			} else {
				res.sendStatus(200);
			}
		});
	});
};

BusinessController.editRole = function(req, res){
	var oldRoleName = req.body.old_role;
	
	var newRoleName = req.body.new_role;
	console.log('Change role: ' + oldRoleName + ' to ' + newRoleName);
	var userId = req.session._id;
	if(!userId) throw err;
	User.findOne({_id: userId.toObjectId()}, function(err, user){
		if (err) throw err;
		if(!user) throw err;
		var indexOfRole = user.roles.indexOf(oldRoleName);
		console.log(indexOfRole);
		user.roles[indexOfRole] = newRoleName;
		//must update employee roles as well
		user.markModified('roles');
		user.save(function(err, data){
			if (err) return res.sendStatus(500);
			res.sendStatus(200);
		});
	});

};

BusinessController.getHours = function (req, res){
	if(!req.session._id) throw err;
	var userId = req.session._id;
	User.findOne({_id: userId.toObjectId()})/*.deepPopulate('hours')*/.
		exec(function(err, user){
			if(err) throw err;
			if(!user) throw err;
			if(user.hours){
				res.send(user.hours); //may need to conver to json first
			} else {
				res.sendStatus(204); //send no content code
			}

		});
};

BusinessController.setHours = function (req, res){
	if(!req.session._id) throw new Error('no session id');
	if(!req.body.hours) throw new Error('no hours object sent over in body');
	User.update({ _id: req.session._id.toObjectId()}, {hours: req.body.hours}, function(err, numAffect){
		if(err || numAffect === 0) throw err;
		res.sendStatus(200);
	});

};



module.exports = BusinessController;