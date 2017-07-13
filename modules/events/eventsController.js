angular.module('events', [])
.controller('eventsController', ['$scope', '$routeParams', '$filter', 'queryService', 'alertService',
function($scope, $routeParams, $filter, queryService, alertService) {

	$scope.events = [];
	$scope.searchText = '';

	function init() {
		queryService.getEvents().then(
			function (events) {
				$scope.events = events;
			},
			function (error) {
				alertService.addAlert(alertService.TYPE.DANGER, 'Could not find events', 5000);
			});
	}

	$scope.firstEventAfterToday = function(eventInQuestion) {
		var displayedEvents = $filter('filterBy')($scope.events, ['fname', 'lname', 'event'], $scope.searchText);

		var firstEventPid = null;
		angular.forEach(displayedEvents, function(event) {
			if (firstEventPid !== null) return;
			if (afterOrEqualToToday(event)) {
				firstEventPid = event.pid;
			}
		});
		return eventInQuestion.pid === firstEventPid;
	};

	function getDay(event) {
		return parseInt(event.event.substr(8,2), 10);
	}

	function getMonth(event) {
		return parseInt(event.event.substr(5,2), 10);
	}

	function afterOrEqualToToday(event) {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth()+1; //January is 0
		return (getMonth(event) > month) || (getMonth(event) === month && getDay(event) >= day);
	}

	init();

}]);
