angular.module('events', [])
.controller('eventsController', ['$scope', '$routeParams', 'queryService', 'alertService',
function($scope, $routeParams, queryService, alertService) {

	function init() {
		queryService.getEvents().then(
			function (events) {
				$scope.events= events;
			},
			function (error) {
				$scope.events= [];
				alertService.addAlert(alertService.TYPE.DANGER, 'Could not find events', 5000);
			});
	}

	$scope.dateline= function (event) {
		if (looking && mm <= event.substr(5,2) && dd <= event.substr(8,2)) {
			looking= false
			console.log(event);
			return true
		}
		return false
	}

	init();
	var today= new Date();
	var dd= today.getDate();
	var mm= today.getMonth()+1; //January is 0
	var looking= true
}]);
