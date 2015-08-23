(function (angular) {
    var module = angular.module('app.prelogin', ['prelogin.signup', 'prelogin.login']);

    module.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.
            state('prelogin.login', {
                url: '/login',
                templateUrl: 'prelogin/login/login.html'
            }).
            state('prelogin.signup', {
                url: '/signup',
                templateUrl: 'prelogin/signup/signup.html'
            }).
            state('prelogin.home', {
                url: '/',
                templateUrl: 'prelogin/home/home.html'
            }).
            state('prelogin.help', {
                url: '/help',
                templateUrl: 'prelogin/help/help.html'
            });
    }]);

    module.run(['$state', function($state){
        $state.transitionTo('prelogin.home');
    }]);
})(angular);