angular.module("results", [])
.controller("resultsController", ["$scope", "$routeParams", "$location", "$sce", "queryService", function($scope, $routeParams, $location, $sce, queryService) {

    function init() {
        $scope.searchError = null;

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
                queryService.getCustomResults(query).then(
                    function success(contacts) {
                        $scope.results = contacts;
                    },
                    function error(response) {
                        $scope.results = [];
                        $scope.searchError = $sce.trustAsHtml(response.data.substr(0, response.data.indexOf("\n")));
                        $scope.nc.customSearchError = true;
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