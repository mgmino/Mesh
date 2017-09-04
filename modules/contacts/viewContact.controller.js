angular.module('contacts')
.controller('viewContactController', ['$scope', '$routeParams', 'contactService',
function($scope, $routeParams, contactService) {

	function init() {
		contactService.getContactById($routeParams.pid)
			.then(function(contact) {
				$scope.contact = contact;
			});
	}

	init();

}]);
