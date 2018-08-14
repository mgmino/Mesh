angular
	.module('contacts')
	.controller('viewContactController', viewContactController);

viewContactController.$inject = ['$scope', '$routeParams', 'contactService'];

function viewContactController($scope, $routeParams, contactService) {

	function init() {
		contactService.getContactById($routeParams.pid)
			.then(function(contact) {
				$scope.contact = contact;
			});
	}

	init();

}
