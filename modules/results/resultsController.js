angular.module('results', [])
.controller('resultsController', ['$scope', '$routeParams', '$location', 'queryService', 'alertService',
function($scope, $routeParams, $location, queryService, alertService) {

    function init() {
        switch ($routeParams.filter) {
            case 'favorites':
                queryService.getFavorites().then(
                    function (contacts) {
                        $scope.results = contacts;
                    },
                    function (error) {
                        $scope.results = [];
                        alertService.addAlert(alertService.TYPE.WARNING, error);
                    });
                break;
            case 'recent-adds':
            case 'recent-mods':
                queryService.getView($routeParams.filter).then(
                    function (contacts) {
                        $scope.results = contacts;
                    },
                    function (error) {
                        $scope.results = [];
                        alertService.addAlert(alertService.TYPE.WARNING, error);
                    });
                break;
            case 'custom':
                var query = $routeParams.query;
                // Empty query given
                if (!query || query.length == 0) {
                    $location.path('/').search('query', null);
                    return;
                }
                queryService.getCustomResults(query).then(
                    function (contacts) {
                        if (contacts.length == 0) {
                            alertService.addAlert(alertService.TYPE.INFO, 'No contacts matched this query.', 1000);
                        }
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
