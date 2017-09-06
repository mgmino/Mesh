angular.module('contacts')
.controller('contactsController', ['$scope', '$routeParams', '$location', 'contactService', 'alertService',
function($scope, $routeParams, $location, contactService, alertService) {

    function init() {
        switch ($routeParams.filter) {
            case 'favorites':
                contactService.getFavorites().then(
                    function (contacts) {
                        $scope.contacts = contacts;
                    },
                    function (error) {
                        $scope.contacts = [];
                        alertService.addAlert(alertService.TYPE.WARNING, error);
                    });
                break;
            case 'recent-adds':
            case 'recent-mods':
                contactService.getView($routeParams.filter).then(
                    function (contacts) {
                        $scope.contacts = contacts;
                    },
                    function (error) {
                        $scope.contacts = [];
                        alertService.addAlert(alertService.TYPE.WARNING, error);
                    });
                break;
            case 'custom':
                var query = $routeParams.query;
				console.log('custom query2: >' +query +'<');
                if (!query || query.length === 0) {  // Empty query
                    $location.path('/').search('query', null);
                    return;
                }
                contactService.getCustomContacts(query).then(
                    function (contacts) {
                        if (contacts.length === 0) {
                            alertService.addAlert(alertService.TYPE.INFO, 'No contacts matched this query.', 1000);
                        }
                        $scope.contacts = contacts;
                    },
                    function (error) {
                        $scope.contacts = [];
                        $scope.nc.customSearchError = true;
                        alertService.addAlert(alertService.TYPE.WARNING, error, '');
                    }
                );
                break;
            default:
                contactService.getAllContacts().then(function(contacts) {
                    $scope.contacts = contacts;
                });
        }
    }
    init();

}]);
