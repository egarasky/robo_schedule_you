(function(angular){
    var module = angular.module('app.manager', []);
    debugger;
    module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        debugger;
        $stateProvider.state('manager.home', {
            url: '/home',
            urlTemplate: '/manager/home/manager-home.html'
        });

    }]);
})(angular);