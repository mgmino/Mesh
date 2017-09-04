angular.module('contacts')
.controller('addContactController', ['$scope', 'contactService', 'alertService',
function($scope, contactService, alertService) {
	
	$scope.contact = {};
	
	$scope.addContact = function() {
		contactService.createContact($scope.contact).then(
            function (response) {
                alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
            },
            function (error) {
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
		);
	};

}]);
