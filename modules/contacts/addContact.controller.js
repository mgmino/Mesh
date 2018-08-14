angular
	.module('contacts')
	.controller('addContactController', addContactController);

addContactController.$inject = ['$scope', 'contactService', 'alertService'];

function addContactController($scope, contactService, alertService) {
	
	$scope.contact = {};
	
	$scope.addContact = function() {
		contactService.createPeople($scope.contact).then(
            function (response) {
                alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
            },
            function (error) {
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
		);
	};

}
