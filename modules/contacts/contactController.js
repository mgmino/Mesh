angular.module('contact', [])
.controller('contactController', ['$scope', '$routeParams', 'queryService', 
function($scope, $routeParams, queryService) {

	function init() {
		queryService.getContactById($routeParams.pid)
			.then(function(contact) {
				$scope.contact = contact;
			});
	}

	init();

}]);
