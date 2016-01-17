(function(angular) {
    var module = angular.module('RoboScheduleYou', ['ui.router', 'ngRoute', 'ngResource', 'app.prelogin', 'errors',
        'app.manager']);


    module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        console.log('reached config login');
        $stateProvider.
            state('prelogin', {
                url: '',
                templateUrl: 'prelogin/prelogin.html'
            }).state('manager', {
                url: '/manager',
                templateUrl: '/manager/manager.html'
            }).state('employee', {
                url: '/employee',
                templateUrl: 'employee/employee.html'
            });
    }]);
})(angular);