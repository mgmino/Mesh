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

	$scope.dateline= function (first, index) {
		if (first) {
			var today= new Date();
			var dd= today.getDate();
			var mm= today.getMonth()+1; //January is 0
			var looking= true;
			$scope.events.forEach(function(onevent, index, looking) {
				if (looking && mm >= onevent.event.substr(5,2) && dd >= onevent.event.substr(8,2)) {
					$scope.eventNum= index;
					looking= false;
//					console.log(onevent.event+': '+index);
				}
			});
		}
		return $scope.eventNum == index;
	};
	init();
}]);
