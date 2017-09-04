angular.module('contacts')
.controller('resultsController', ['$scope', '$routeParams', '$location', 'contactService', 'alertService',
function($scope, $routeParams, $location, contactService, alertService) {

    function init() {
        switch ($routeParams.filter) {
            case 'favorites':
                contactService.getFavorites().then(
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
                contactService.getView($routeParams.filter).then(
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
                if (!query || query.length === 0) {
                    $location.path('/').search('query', null);
                    return;
                }
                contactService.getCustomResults(query).then(
                    function (contacts) {
                        if (contacts.length === 0) {
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
                contactService.getAllContacts().then(function(contacts) {
                    $scope.results = contacts;
                });
        }
    }
    init();

}]);
