angular.module("events", [])
.controller("eventsController", ["$scope", "$routeParams", "queryService", "alertService",
	function($scope, $routeParams, queryService, alertService) {

    queryService.getEvents().then(
        function (events) {
            $scope.events= events;
        },
        function (error) {
            $scope.events= [];
            alertService.addAlert(alertService.TYPE.DANGER, 'Could not find events', 5000);
        });

}]);
