(function(angular){
	var module = angular.module('prelogin.login', []);
	module.controller('LoginController', ['$scope', 'SubmitLogin', '$state',
        function ($scope, loginRestService, $state) {
            var self = this;
            self.userName = "";
            self.password = "";
            self.userNameError = false;
            self.passwordError = false;

            self.submitLogin = function submitLogin() {
                var dataObject = {
                    userName: self.userName,
                    password: self.password
                };
                loginRestService.login(dataObject).then(
                    function dummySuccess(response) {
                    }, function errorFn(response) {
                        if (response.data.wrongPassword) {
                            self.passwordError = true;
                        } else if (response.data.wrongUserName) {
                            self.userNameError = true;
                        }
                    });
            };
        }]);
})(angular);