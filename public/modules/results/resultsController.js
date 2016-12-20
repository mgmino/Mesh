angular.module("results", [])
.controller("resultsController", ["$scope", "$routeParams", "queryService", function($scope, $routeParams, queryService) {
    $scope.pageTitle = "Results Here";

    $scope.results = [];

    function init() {
        switch ($routeParams.filter) {
            case 'favorites':
                queryService.getFavorites().then(function(contacts) {
                    $scope.results = contacts;
                });
                break;
            default:
                queryService.getAllContacts().then(function(contacts) {
                    console.log(contacts);
                    $scope.results = contacts;
                });
        }
    }
    init();

}]);