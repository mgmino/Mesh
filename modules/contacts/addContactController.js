angular.module('contact', [])
.controller('addContactController', ['$scope', 'queryService', 
function($scope, queryService) {
	
	$scope.contact= {};
	
	$scope.addContact = function() {
		queryService.createContact($scope.contact).then(
            function (msg) {
                alertService.addAlert(alertService.TYPE.INFO, msg, 2000);
            },
            function (error) {
                alertService.addAlert(alertService.TYPE.WARNING, error);
            }
		);
	}

}]);
