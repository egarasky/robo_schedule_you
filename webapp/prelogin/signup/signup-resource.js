/**
 * Created by Eric on 8/15/2015.
 */
(function(angular){
    var module = angular.module('prelogin.signup');

    module.factory('SubmitUserSignUp', ['$http', '$state', function($http, $state){
        function submitUserSignUp(newUserInfo){
            return $http.post('/manager', {
                newUser: newUserInfo
            }).then(function successSignUp(response){
                $state.transitionTo('manager.home');
                return response;
            }, function dummyError(response){
                return response;
            });
        }
        return {
            submit: submitUserSignUp
        };
    }]);
})(angular);