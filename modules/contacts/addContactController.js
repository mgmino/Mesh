angular.module('contact', [])
.controller('addContactController', ['$scope', 'queryService', 'alertService',
function($scope, queryService, alertService) {
	
	$scope.contact= {};
	
	$scope.addContact = function() {
		queryService.createContact($scope.contact).then(
            function (msg) {
                alertService.addAlert(alertService.TYPE.INFO, msg.msg, 3000);
            },
            function (error) {
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
		);
	}

}]);
