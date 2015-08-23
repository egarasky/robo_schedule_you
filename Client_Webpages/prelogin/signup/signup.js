(function(angular){
	var module = angular.module('prelogin.signup', []);

	module.controller('SignUpController', ['$scope', '$http', 'SubmitUserSignUp',
		function($scope, $http, SubmitUserSignUp){
		var self = this;
		self.submitUserSignUp = function(){
			var newUserInfo = {
                firstName: self.firstName,
                lastName: self.lastName,
                userName: self.userName,
                password: self.password
            };
            SubmitUserSignUp.submit(newUserInfo).then(null,
                function errorFn(response){
                    alert('error signing in');
            });
		};
	}]);
})(angular);