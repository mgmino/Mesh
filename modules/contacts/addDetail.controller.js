angular.module('contacts')
.controller('addDetailController', ['$scope', '$routeParams', 'contactService', 'alertService',
function($scope, $routeParams, contactService, alertService) {
	
	$scope.detail = {};

	$scope.addDetail = function() {
		contactService.createDetail($scope.detail, $routeParams.cid).then(
            function (response) {
                alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
            },
            function (error) {
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
		);
	};
	
}]);
