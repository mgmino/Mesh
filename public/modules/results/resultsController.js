angular.module("results", [])
.controller("resultsController", ["$scope", "$routeParams", "$location", "queryService", function($scope, $routeParams, $location, queryService) {

    function init() {
        switch ($routeParams.filter) {
            case 'favorites':
                queryService.getFavorites().then(function(contacts) {
                    $scope.results = contacts;
                });
                break;
            case 'custom':
                var query = $routeParams.query;
                // Empty query given
                if (!query || query.length == 0) {
                    $location.path("/").search('query', null);
                    return;
                }
                queryService.getCustomResults(query).then(function(contacts) {
                    $scope.results = contacts;
                });
                break;
            default:
                queryService.getAllContacts().then(function(contacts) {
                    $scope.results = contacts;
                });
        }
    }
    init();

}]);