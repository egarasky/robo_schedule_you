(function(angular){
	var module = angular.module('errors', []);
	module.directive('blurError', [function(){
			return {
				restrict: 'A',
				require: '^form',
				link: function(scope, element, attrs, formCtrl){
					var fieldName = attrs.blurError || attrs.name;
					element.on('blur', function(event){
                            var action = (formCtrl[fieldName].$invalid ? 'add' : 'remove' ) + 'Class';
                            element.closest('.form-group')[action]('has-error');
					});
				}
			};
	}]);
})(angular);