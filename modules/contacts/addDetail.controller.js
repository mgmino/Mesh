angular.module('contacts')
.controller('addDetailController', ['$scope', 'contactService', 'alertService',
function($scope, contactService, alertService) {
	
	$scope.detail = {};
	
    function init() {
        $scope.cid = $routeParams.cid;
    }

	$scope.addContact = function() {
		contactService.createDetail($scope.detail, $scope.cid).then(
            function (response) {
                alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
            },
            function (error) {
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
		);
	};

}]);
