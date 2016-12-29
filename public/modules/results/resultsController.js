angular.module("results", []).controller("resultsController", ["$scope", "$routeParams", "$location", "queryService", "alertService",
    function($scope, $routeParams, $location, queryService, alertService) {

    function init() {
        switch ($routeParams.filter) {
            case 'favorites':
                queryService.getFavorites().then(
                    function (contacts) {
                        $scope.results = contacts;
                    },
                    function (error) {
                        // Without a 3rd parameter, the default alert timeout of 4 seconds in applied
                        // This is configured in alertService
                        $scope.results = [];
                        alertService.addAlert(alertService.TYPE.WARNING, error);
                    });
                break;
            case 'custom':
                var query = $routeParams.query;
                // Empty query given
                if (!query || query.length == 0) {
                    $location.path("/").search('query', null);
                    return;
                }
                queryService.getCustomResults(query).then(
                    function (contacts) {
                        $scope.results = contacts;
                    },
                    function (error) {
                        $scope.results = [];
                        $scope.nc.customSearchError = true;
                        alertService.addAlert(alertService.TYPE.WARNING, error, '');
                    }
                );
                break;
            default:
                queryService.getAllContacts().then(function(contacts) {
                    $scope.results = contacts;
                });
        }
    }
    init();

}]);