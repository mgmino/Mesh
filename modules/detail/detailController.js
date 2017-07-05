angular.module('detail', [])
.controller('detailController', ['$scope', '$routeParams', 'queryService', 'alertService',
function($scope, $routeParams, queryService, alertService) {

	function init() {
		var cid = $routeParams.cid;
		queryService.getContactById(cid)
			.then(success, error);
	}

	function success(contactObj) {
		// console.log(contactObj);
		$scope.contact = contactObj.person;
		$scope.details = contactObj.details;
	}

	function error(response) {
		alertService.addAlert(alertService.TYPE.DANGER, 'Could not load contact', 5000);
	}

	init();

}]);
