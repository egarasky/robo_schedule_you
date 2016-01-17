(function (angular) {
    var module = angular.module('prelogin.login');
    module.factory('SubmitLogin', ['$http', '$state', function ($http, $state) {
        function login(userName, password) {
            return $http.post('/login', {
                userName: userName,
                password: password
            }).then(function (response) {
                if (response.data.role = 'employee') {
                    $state.transitionTo('employee.home');
                } else if (response.data.role = 'manager') {
                    $state.transitionTo('manager.home');
                }
                return response;
            }, function dummyError(reponse){
                return response;
            });
        }


        return {
            login: login
        };
    }]);
})(angular);